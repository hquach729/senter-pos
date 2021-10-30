const { ipcRenderer, contextBridge } = require('electron');
const Channel = require('../src/shared/constants');

const validChannels = Object.values(Channel);

contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => {
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	invoke: async (channel, data) => {
		if (validChannels.includes(channel)) {
			return await ipcRenderer.invoke(channel, data);
		}
	},
	on: (channel, callback) => {
		if (validChannels.includes(channel)) {
			const newCallback = (_, data) => callback(data);
			ipcRenderer.on(channel, newCallback);
		}
	},
	once: (channel, callback) => {
		if (validChannels.includes(channel)) {
			const newCallback = (_, data) => callback(data);
			ipcRenderer.once(channel, newCallback);
		}
	},
	// Removes the specified listener from the listener array for
	// the specified channel.
	removeListener: (channel) => {
		if (validChannels.includes(channel)) {
			ipcRenderer.removeListener(channel);
		}
	},

	// Removes all listeners, or those of the specified channel.
	removeAllListeners: (channel) => {
		if (validChannels.includes(channel)) {
			ipcRenderer.removeAllListeners(channel);
		}
	},
});
