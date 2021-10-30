const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');

// Database Setting
const sqlite3 = require('sqlite3');
// const userData = app.getPath('userData');
// const senterDbFile = path.resolve(userData, 'senter.sqlite3');

// const db = new sqlite3.Database(senterDbFile);

/**
 *
 * There are three opening modes:
 *
 * sqlite3.OPEN_READONLY: open the database for read-only.
 * sqlite3.OPEN_READWRITE : open the database for reading and writing.
 * sqlite3.OPEN_CREATE: open the database, if the database does not exist, create a new database.
 */

const dbFile = isDev
	? path.join(__dirname, '../db/senter.sqlite3') // my root folder if in dev mode
	: path.join(process.resourcesPath, 'db/senter.sqlite3'); // the resources path if in production build

const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.log(`Database Error: ${err}`);
	} else {
		console.log('Database Loaded', dbFile);
		db.get(`SELECT * FROM users`, (err, data) => {
			if (err) {
				return console.log(err);
			}
			console.log({ data });
		});
	}
});

module.exports = {
	dbFile,
	db,
};
