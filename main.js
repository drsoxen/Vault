// Modules to control application life and create native browser window
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
    // Create the browser window.
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

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


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

ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(result => {
        keyManager.SetKeyPath(result.filePaths)
    })
})

ipcMain.on('readJson', (event) => {
    fileManager.ReadPasswordFile();
})

ipcMain.on('testJson', (event) => {
    //fileManager.FindEntry('RBC');
    fileManager.CreateEntry('Facebook','FBUsername','FBPassword');
    
})





















