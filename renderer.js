const {
    ipcRenderer
} = require('electron')
const fs = require('fs')

let loaded = true;

window.onload = function() {

    LandingPage();
}

let LandingPage = () => {

    document.getElementById('main-div').innerHTML = fs.readFileSync('landingPage.html')

    document.getElementById('Setup').addEventListener('click', (event) => {
        Setup();
    })

    document.getElementById('NewSetup').addEventListener('click', (event) => {
        NewSetup();
    })

    document.getElementById('Unlock').addEventListener('click', (event) => {
        HomePage();
    })
}

let HomePage = () => {
    document.getElementById('main-div').innerHTML = fs.readFileSync('homePage.html')

}

let Setup = () => {
    document.getElementById('main-div').innerHTML = fs.readFileSync('setupPage.html')


    document.getElementById('select-directory-key').addEventListener('click', (event) => {
        ipcRenderer.send('open-file-dialog-key')
    })

    document.getElementById('select-directory-vault').addEventListener('click', (event) => {
        ipcRenderer.send('open-file-dialog-vault')
    })

    document.getElementById('PassphraseSubmitBtn').addEventListener('click', (event) => {
        ipcRenderer.send('passphrase', document.getElementById('Passphrase').value)
    })
}

let NewSetup = () => {
    document.getElementById('main-div').innerHTML = fs.readFileSync('NewSetupPage.html')

}




// document.getElementById('PassphraseSubmitBtn').addEventListener('click', (event) => {
//     ipcRenderer.send('passphrase', document.getElementById('Passphrase').value)
// })

// document.getElementById('CreateKeysBtn').addEventListener('click', (event) => {
//     ipcRenderer.send('CreateKeys')
// })

// document.getElementById('EncryptionTestBtn').addEventListener('click', (event) => {
//     ipcRenderer.send('EncryptionTest')
// })

// document.getElementById('select-directory').addEventListener('click', (event) => {
//     ipcRenderer.send('open-file-dialog-key')
// })

// document.getElementById('ReadPasswordFile').addEventListener('click', (event) => {
//     ipcRenderer.send('ReadPasswordFile')
// })

// document.getElementById('CreateEntry').addEventListener('click', (event) => {
//     ipcRenderer.send('CreateEntry')
// })

// document.getElementById('FindEntry').addEventListener('click', (event) => {
//     ipcRenderer.send('FindEntry')
// })