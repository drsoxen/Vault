// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const encryption = require('./encryption.js');

window.onload = function() {

	const CreateKeysBtn = document.getElementById('CreateKeysBtn')
	const EncryptionTestBtn = document.getElementById('EncryptionTestBtn')


	CreateKeysBtn.addEventListener('click', (event) => {
		console.log('CreateKeyPair')
		encryption.CreateKeyPair('password');
	})

	EncryptionTestBtn.addEventListener('click', (event) => {
		encryption.EncryptTestMessage('password', 'Test Message');
	})

}