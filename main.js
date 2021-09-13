const {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} = require('electron')
const path = require('path')
const encryption = require('./encryption.js');
const keyManager = require('./keyManager.js');
const fileManager = require('./fileManager.js');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 700,
        height: 400,
        //frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})


//IPC
ipcMain.on('passphrase', (event, data) => {
    keyManager.setPassphrase(data);
})

ipcMain.on('CreateKeys', (event) => {
    keyManager.CreateKeyPair();
})

ipcMain.on('EncryptionTest', (event) => {
    let data = encryption.encryptData('Test Message');
    encryption.decryptData(data);
})

ipcMain.on('open-file-dialog-key', (event) => {
    dialog.showOpenDialog({
    }).then(result => {
        keyManager.setKeyPath(result.filePaths)
    })
})

ipcMain.on('open-file-dialog-vault', (event) => {
    dialog.showOpenDialog({
    }).then(result => {
        fileManager.setVaultPath(result.filePaths)
    })
})

ipcMain.on('ReadPasswordFile', (event) => {
    fileManager.ReadPasswordFile();
})

ipcMain.on('CreateEntry', (event) => {
    fileManager.CreateEntry('Facebook', 'FBUsername', 'FBPassword');

})

ipcMain.on('FindEntry', (event) => {
    fileManager.FindEntry('Facebook');
})

ipcMain.on('test', (event) => {
    
})
