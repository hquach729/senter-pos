const escpos = require('escpos');
escpos.USB = require('escpos-usb');

exports.connectUSBPrinter = () => {
	const device = new escpos.USB();
	const options = { encoding: 'GB18030' /* default */ };
	const printer = new escpos.Printer(device, options);

	return {
		device,
		printer,
	};
};
