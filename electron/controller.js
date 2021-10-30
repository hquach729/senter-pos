const { app, ipcMain } = require('electron');
const { dialog } = require('electron');
const Channel = require('../src/shared/constants');
const { db, dbFile } = require('./database');
const fs = require('fs');

const escpos = require('escpos');
escpos.USB = require('escpos-usb');

ipcMain.handle(Channel.APP_INFO, (event, args) => {
	console.log('get-appInfo');
	return {
		version: app.getVersion(),
		name: app.getName(),
	};
});
ipcMain.handle(Channel.TEST_PRINT, async () => {
	if (escpos.USB.findPrinter().length !== 0) {
		const device = new escpos.USB();
		const options = { encoding: 'GB18030' };
		const printer = new escpos.Printer(device, options);

		device.open(function () {
			printer
				.font('a')
				.align('lt')
				.text('V&J Senter Pure Water')
				.text(`Daily Report`)
				.text(``)
				.text(``)
				.cut()
				.close();
		});
		return { status: 'success' };
	} else {
		return { status: 'printer not available' };
	}
});
ipcMain.handle(Channel.PRINT, async (event, data) => {
	if (escpos.USB.findPrinter().length !== 0) {
		const device = new escpos.USB();
		const options = { encoding: 'GB18030' };
		const printer = new escpos.Printer(device, options);

		if (data.type === 'BUY') {
			device.open(function (error) {
				if (error) return console.log(error.message);
				printer
					.font('a')
					.align('lt')
					.text(data.fullname.trim())
					.text(data.prevGallon)
					.text(data.gallonBuy)
					.text(data.gallonLeft)
					.text(data.date + ' ' + data.time)
					.text(data.blank)
					.text(data.message)
					.text(data.store)
					.text(data.phone)
					.text(data.blank)
					.cut()
					.close();
			});
		} else if (data.type === 'RENEW') {
			device.open(function (error) {
				if (error) return console.log(error.message);
				printer
					.font('a')
					.text(data.fullname.trim())
					.text(data.renewFee)
					.text(data.renewGallon)
					.text(`Gallon Prev : ${data.previous}`)
					.text(data.totalGallon)
					.text(data.date + ' ' + data.time)
					.text(data.blank)
					.text(data.message)
					.text(data.store)
					.text(data.phone)
					.text(data.blank)
					.cut()
					.close();
			});
		} else if (data.type === 'NEW') {
			device.open(function (error) {
				if (error) return console.log(error.message);
				printer
					.font('a')
					.align('lt')
					.text(data.fullname)
					.text(`NEW MEMBERSHIP`)
					.text(data.renewFee)
					.text(data.gallonLeft)
					.text(data.time)
					.text(data.blank)
					.text(data.message)
					.text(data.store)
					.text(data.phone)
					.text(data.blank)
					.cut()
					.close();
			});
		} else {
			device.open(function () {
				printer
					.font('a')
					.align('lt')
					.text('V&J Senter Pure Water')
					.text(`Daily Report`)
					.text(``)
					.text(``)
					.cut()
					.close();
			});
		}

		return { status: 'success' };
	} else {
		return { status: 'printer not available' };
	}
});
ipcMain.on(Channel.LOGIN, (event, { username, password }) => {
	db.get(
		'SELECT * FROM users WHERE username = ? AND password= ?',
		[username, password],
		(_, row) => {
			event.sender.send(
				'login',
				row ? { authenticated: true } : { authenticated: false }
			);
		}
	);
});
ipcMain.on(Channel.BACKUP, (event, data) => {
	dialog
		.showSaveDialog({
			properties: ['openFile', 'multiSelections'],
			defaultPath: `senter.sqlite3`,
			filters: [{ name: 'Sqlite3', extensions: ['sqlite3'] }],
		})
		.then(({ filePath }) => {
			if (filePath) {
				fs.copyFile(dbFile, filePath, () => {
					event.sender.send(Channel.BACKUP, {
						status: true,
						date: `${new Date().toLocaleDateString().trim()}`,
					});
				});
			} else {
				event.sender.send(Channel.BACKUP, { status: false, date: '' });
			}
		});
});
ipcMain.handle(Channel.QUIT, (event, args) => {
	db.close((err) => {
		if (err) return console.error(err.message);
		app.quit();
	});
});
ipcMain.on(Channel.FIND_MEMBERSHIP, (event, data) => {
	console.log('find:membership', { data });

	const keys = Object.keys(data).map((key, index, array) => {
		if (array.length === 1) {
			return key + ' = ?';
		} else {
			if (index !== array.length - 1 && array.length !== 1) {
				return key + ' = ? AND';
			} else {
				return key + ' = ?';
			}
		}
	});
	const values = Object.values(data);

	const query = `SELECT
	DISTINCT
		account,
		phone,
		since,
		first,
		last
	FROM
		memberships
	WHERE
		 ${keys.toString().replace(/,/g, ' ')}
	ORDER BY rowid`;

	db.all(query, [...values], (err, rows) => {
		if (err) return console.log(err);
		console.log(rows);

		// Membership not found
		if (rows.length === 0) {
			event.sender.send(Channel.FIND_MEMBERSHIP, { memberships: undefined });
		}

		// Find one member
		if (rows.length === 1) {
			const account = rows[0].account;
			db.get(
				`SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
				account,
				(err, row) => {
					if (err) throw err;
					event.sender.send(Channel.FIND_MEMBERSHIP, { membership: row });
				}
			);
		} else {
			// Get multiply account that match the search query
			const memberships = [];
			rows.forEach((row) => {
				db.get(
					`SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
					row.account,
					(err, row) => {
						if (err) throw err;
						memberships.push(row);
						if (memberships.length === rows.length) {
							event.sender.send(Channel.FIND_MEMBERSHIP, { memberships });
						}
					}
				);
			});
		}
	});
});
ipcMain.on(Channel.CHECK_DUPLICATE_ACCOUNT, (event, account) => {
	console.log('ipcMain:check:duplicate:account', account);
	db.get(
		`SELECT account FROM memberships WHERE account = ?`,
		[account],
		(err, duplicate) => {
			if (err) {
				return console.error(err.message);
				// TODO: handle if there is error with database
			}
			console.log({ duplicate });
			duplicate
				? event.sender.send(Channel.CHECK_DUPLICATE_ACCOUNT, {
						duplicate: true,
				  })
				: event.sender.send(Channel.CHECK_DUPLICATE_ACCOUNT, {
						duplicate: false,
				  });
		}
	);
});
ipcMain.on(Channel.ADD_MEMBERSHIP, (event, membership) => {
	console.log('ipcMain:add:membership', membership);

	const keys = Object.keys(membership);
	const values = keys.map((column) => membership[column]);

	const sql = `INSERT INTO memberships(${keys.toString()}) VALUES(${keys.map(
		() => '?'
	)})`;

	db.run(sql, [...values], function (err) {
		if (err) return console.log(err.message);

		console.log(`A row has been inserted with rowid ${this.lastID}`);
		event.sender.send(Channel.ADD_MEMBERSHIP, { membership });
	});
});
ipcMain.on(Channel.LATEST_MEMBERSHIP_RECORD, (event, account) => {
	console.log('ipcMain:latest:record', account);
	db.get(
		`SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
		account,
		(err, row) => {
			if (err) throw err;
			event.sender.send(Channel.LATEST_MEMBERSHIP_RECORD, row);
		}
	);
});
ipcMain.on(
	Channel.EDIT_MEMBERSHIP,
	(event, { updateValues, initialValues }) => {
		console.log('edit:membership', { updateValues, initialValues });
		const { first, last, phone, note, account } = updateValues;

		// If account number does not need to be change
		if (updateValues.account === initialValues.account) {
			db.run(
				`UPDATE memberships SET first = ?, last = ?, phone = ?, note = ? WHERE account = ?`,
				[first, last, phone, note, initialValues.account],
				function (err) {
					if (err) throw err;

					db.get(
						`SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
						initialValues.account,
						(err, row) => {
							if (err) throw err;
							console.log(row);
							event.sender.send(Channel.EDIT_MEMBERSHIP, row);
						}
					);
				}
			);
		} else {
			// If account number need to be change
			db.run(
				`UPDATE memberships SET first = ?, last = ?, phone = ?, account = ?, note = ? WHERE account = ?`,
				[first, last, phone, updateValues.account, note, initialValues.account],
				function (err) {
					if (err) throw err;
					db.get(
						`SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC LIMIT 1`,
						account,
						(err, row) => {
							if (err) throw err;
							event.sender.send(Channel.EDIT_MEMBERSHIP, row);
						}
					);
				}
			);
		}
	}
);
ipcMain.on(Channel.DELETE_MEMBERSHIP, (event, { account, password }) => {
	console.log('Delete Membership', { account, password });

	if (password !== '911') {
		event.sender.send(Channel.DELETE_MEMBERSHIP, { status: false });
	} else {
		db.run(
			`DELETE FROM memberships WHERE account = ?`,
			account,
			function (err) {
				if (err) throw err;
				console.log('delete', this.changes);
				event.sender.send(Channel.DELETE_MEMBERSHIP, { status: true });
			}
		);
	}
});
ipcMain.on(Channel.BUY_MEMBERSHIP, (event, membership) => {
	console.log('buy:membership', membership);

	const keys = Object.keys(membership);
	const values = keys.map((column) => membership[column]);

	const sql = `INSERT INTO memberships(${keys.toString()}) VALUES(${keys.map(
		() => '?'
	)})`;

	db.run(sql, [...values], function (err) {
		if (err) return console.log(err.message);
		console.log(`A row has been inserted with rowid ${this.lastID}`);
		db.get(
			`SELECT * FROM memberships WHERE rowid = ?`,
			this.lastID,
			(err, row) => {
				event.sender.send(Channel.BUY_MEMBERSHIP, row);
			}
		);
		// event.sender.send(Channel.BUY_MEMBERSHIP, membership);
	});
	// event.sender.send(Channel.BUY_MEMBERSHIP, membership);
});
ipcMain.on(Channel.RENEW_MEMBERSHIP, (event, membership) => {
	console.log('renew:membership', membership);

	const keys = Object.keys(membership);
	const values = keys.map((column) => membership[column]);

	const sql = `INSERT INTO memberships(${keys.toString()}) VALUES(${keys.map(
		() => '?'
	)})`;

	db.run(sql, [...values], function (err) {
		if (err) return console.log(err.message);

		console.log(`A row has been inserted with rowid ${this.lastID}`);
		event.sender.send(Channel.RENEW_MEMBERSHIP, membership);
	});
});
ipcMain.on(Channel.MEMBERSHIP_HISTORY, (event, account) => {
	console.log('get:history', account);
	const sql = `SELECT * FROM memberships WHERE account = ? ORDER BY rowid DESC`;
	db.all(sql, [account], (err, rows) => {
		if (err) return console.log(err.message);
		event.sender.send(Channel.MEMBERSHIP_HISTORY, rows);
	});
});
ipcMain.on(Channel.DELETE_RECORD, (event, record) => {
	console.log('delete:record', record);
	const sql = `DELETE FROM memberships WHERE record = ?`;
	db.run(sql, record, (err) => {
		if (err) throw err;
		console.log(`Row(s) deleted `, this);
		event.sender.send(Channel.DELETE_RECORD, { status: true });
	});
});
ipcMain.handle(Channel.PRINT_REPORT, (event, { date, time }) => {
	return new Promise((resolve) => {
		db.get(
			`SELECT SUM(gallon) totalNewGallon, SUM(fee) totalNewFee FROM memberships WHERE type= ? AND date= ?`,
			['NEW', date],
			(err, { totalNewGallon, totalNewFee }) => {
				db.get(
					`SELECT SUM(gallon) totalRenewGallon, SUM(fee) totalRenewFee FROM memberships WHERE type= ? AND date= ?`,
					['RENEW', date],
					(err, { totalRenewGallon, totalRenewFee }) => {
						db.get(
							`SELECT SUM(buy) totalBuy FROM memberships WHERE type= ? and date = ?`,
							['BUY', date],
							(err, { totalBuy }) => {
								const data = {
									totalNewFee: totalNewFee || 0,
									totalNewGallon: totalNewGallon || 0,
									totalRenewFee: totalRenewFee || 0,
									totalRenewGallon: totalRenewGallon || 0,
									totalBuy: totalBuy || 0,
									date,
									time,
								};
								if (escpos.USB.findPrinter().length !== 0) {
									const device = new escpos.USB();
									const options = { encoding: 'GB18030' };
									const printer = new escpos.Printer(device, options);

									const {
										totalNewFee,
										totalNewGallon,
										totalRenewFee,
										totalRenewGallon,
										totalBuy,
										date,
										time,
									} = data;
									// NEW MEMBERSHIP REPORT
									const totalNew = `Membership Fee: $${totalNewFee}`;
									const totalGallon = `Membership Gallon: ${totalNewGallon}`;

									// RENEW REPORT
									const totalFee = `Renewal Fee:    $${totalRenewFee}`;
									const totalRenew = `Renew Gallon:      ${totalRenewGallon}`;

									// TOTAL BUY GALLON
									const totalBuyGallon = `Buy Gallon:        ${totalBuy}`;

									// TOTAL SALES
									const totalSales = `Total Sales:    $${
										totalRenewFee + totalNewFee
									}`;

									const report = {
										totalNew,
										totalGallon,
										totalFee,
										totalRenewGallon,
										totalBuyGallon,
										totalSales,
									};

									console.log(report);

									device.open(function (error) {
										if (error) return console.log(error.message);
										printer
											.font('a')
											.align('lt')
											.text('V&J Senter Pure Water')
											.text(`Daily Report`)
											.text(`${date} - ${time}`)
											.text('')
											.text(totalGallon)
											.text(totalRenew)
											.text(totalBuyGallon)
											.text('')
											.text(totalNew)
											.text(totalFee)
											.text(totalSales)
											.text('')
											.text('')
											.cut()
											.close();
									});

									// return { status: 'success' };
									resolve({ status: 'success' });
								} else {
									// console.log('unable to find printer');
									// return { status: 'printer not available' };
									resolve({ status: 'printer not available' });
								}
							}
						);
					}
				);
			}
		);
	});
});
