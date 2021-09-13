const {
    ipcRenderer
} = require('electron')
const fs = require('fs')

window.onload = function() {

    LandingPage();
}

let LandingPage = () => {

    document.getElementById('main-div').innerHTML = fs.readFileSync('landingPage.html')

    document.getElementById('Setup').addEventListener('click', (event) => {
        SetupPage();
    })

    document.getElementById('NewSetup').addEventListener('click', (event) => {
        NewSetupPage();
    })

    document.getElementById('Unlock').addEventListener('click', (event) => {
        HomePage();
    })
}

let HomePage = () => {
    document.getElementById('main-div').innerHTML = fs.readFileSync('homePage.html')

    document.getElementById('Back').addEventListener('click', (event) => {
        LandingPage();
    })

}

let NewSetupPage = () => {
    document.getElementById('main-div').innerHTML = fs.readFileSync('newSetupPage.html')


    document.getElementById('CreateKeysBtn').addEventListener('click', (event) => {
        ipcRenderer.send('CreateKeys')
    })

    document.getElementById('CreateVaultBtn').addEventListener('click', (event) => {
        ipcRenderer.send('CreateVault')
    })

    document.getElementById('SetMasterPassword').addEventListener('click', (event) => {
        MasterPasswordPage(true);
    })

    document.getElementById('Back').addEventListener('click', (event) => {
        LandingPage();
    })

}

let SetupPage = () => {
    document.getElementById('main-div').innerHTML = fs.readFileSync('setupPage.html')


    document.getElementById('select-directory-key').addEventListener('click', (event) => {
        ipcRenderer.send('open-file-dialog-key')
    })

    document.getElementById('select-directory-vault').addEventListener('click', (event) => {
        ipcRenderer.send('open-file-dialog-vault')
    })

    document.getElementById('SetMasterPassword').addEventListener('click', (event) => {
        MasterPasswordPage(false);
    })

    document.getElementById('Back').addEventListener('click', (event) => {
        LandingPage();
    })

}

let MasterPasswordPage = (create) => {
    document.getElementById('main-div').innerHTML = fs.readFileSync('masterPasswordPage.html')

    if (create) {
        document.getElementById('Title').innerHTML = "Create Master Password";
    } else {
        document.getElementById('Title').innerHTML = "Enter Master Password";
    }

    document.getElementById('PassphraseSubmitBtn').addEventListener('click', (event) => {
        ipcRenderer.send('passphrase', document.getElementById('Passphrase').value)
    })

    document.getElementById('Back').addEventListener('click', (event) => {
        if (create) {
            NewSetupPage();
        } else {
            SetupPage();
        }
    })

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