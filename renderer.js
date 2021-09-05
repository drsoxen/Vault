// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const {
	ipcRenderer
} = require('electron')

window.onload = function() {

	document.getElementById('CreateKeysBtn').addEventListener('click', (event) => {
		ipcRenderer.send('CreateKeys')
	})

	document.getElementById('EncryptionTestBtn').addEventListener('click', (event) => {
		ipcRenderer.send('EncryptionTest')
	})

	document.getElementById('select-directory').addEventListener('click', (event) => {
		ipcRenderer.send('open-file-dialog')
	})
}