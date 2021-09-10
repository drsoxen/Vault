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

    document.getElementById('ReadPasswordFile').addEventListener('click', (event) => {
        ipcRenderer.send('ReadPasswordFile')
    })

    document.getElementById('CreateEntry').addEventListener('click', (event) => {
        ipcRenderer.send('CreateEntry')
    })

    document.getElementById('FindEntry').addEventListener('click', (event) => {
        ipcRenderer.send('FindEntry')
    })
}