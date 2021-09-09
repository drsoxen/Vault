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

    document.getElementById('PassphraseSubmitBtn').addEventListener('click', (event) => {
        ipcRenderer.send('passphrase', document.getElementById('Passphrase').value)
    })

    document.getElementById('CreateKeysBtn').addEventListener('click', (event) => {
        ipcRenderer.send('CreateKeys')
    })

    document.getElementById('EncryptionTestBtn').addEventListener('click', (event) => {
        ipcRenderer.send('EncryptionTest')
    })

    document.getElementById('select-directory').addEventListener('click', (event) => {
        ipcRenderer.send('open-file-dialog')
    })

    document.getElementById('readJson').addEventListener('click', (event) => {
        ipcRenderer.send('readJson')
    })

    document.getElementById('testJson').addEventListener('click', (event) => {
        ipcRenderer.send('testJson')
    })
}