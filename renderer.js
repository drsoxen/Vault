// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const {
	ipcRenderer
} = require('electron')

const encryption = require('./encryption.js');
const keyManager = require('./keyManager.js');

window.onload = function() {

	document.getElementById('CreateKeysBtn').addEventListener('click', (event) => {
		console.log('CreateKeyPair')
		keyManager.CreateKeyPair('password');
	})

	document.getElementById('EncryptionTestBtn').addEventListener('click', (event) => {
		encryption.EncryptTestMessage('password', 'Test Message');
	})

	document.getElementById('select-directory').addEventListener('click', (event) => {
		console.log('test')
		ipcRenderer.send('open-file-dialog')
	})

	ipcRenderer.on('selected-directory', (event, path) => {
		keyManager.SetKeyPath(path)
	})

}