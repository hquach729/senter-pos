// const { app, BrowserWindow, Menu, MenuItem } = require('electron');
// const { app, BrowserWindow, Menu } = require('electron');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
require('./controller');

let mainWindow;

// Initializing the Main Electron Window
function createWindow() {
	// Location of preload.js in development and production
	const preloadDev = path.join(app.getAppPath(), './electron/preload.js');
	const preloadProd = path.join(
		app.getAppPath(),
		'./build/electron/preload.js'
	);

	// Location of index.html in development and production
	const devServer = 'http://localhost:3000';
	const htmlFile = `file://${path.join(__dirname, '../index.html')}`;

	// Debugger Dev Tool
	// const loadDevTool = (window) => {
	// 	window.webContents.on('did-frame-finish-load', () => {
	// 		window.webContents.openDevTools({ mode: 'right' });
	// 	});
	// };

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		// fullscreen: true,
		backgroundColor: '#0a2e4c',
		webPreferences: {
			preload: isDev ? preloadDev : preloadProd,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
		},
	});

	if (process.platform !== 'darwin') {
		// Remove menu for windows os
		mainWindow.removeMenu();
	}

	mainWindow.loadURL(isDev ? devServer : htmlFile);
	mainWindow.maximize();
	mainWindow.show();

	// if (isDev) loadDevTool(mainWindow);
}

// const template = [
// 	{
// 		label: 'Main',
// 		submenu: [
// 			{
// 				role: 'quit',
// 			},
// 		],
// 	},
// ];

// const menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
	'userData',
	isDev
		? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
		: path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

// When the app is ready to load
app.whenReady().then(async () => {
	await createWindow(); // Create the mainWindow
});

// Exiting the app
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// Activating the app
app.on('activate', () => {
	if (mainWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// Logging any exceptions
process.on('uncaughtException', (error) => {
	console.log(`Exception: ${error}`);
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
