const encryption = require('./encryption.js');
const buffer = require('buffer')
const fs = require('fs')

let vault;
let vaultPath = './vault.json';

module.exports.ReadPasswordFile = () => {
    vault = JSON.parse(fs.readFileSync(getVaultPath(), 'utf-8'))
    console.log(JSON.stringify(vault))
}

module.exports.CreateEntry = (name, username, password) => {
    let newEntry = {};
    newEntry.name = encryption.encryptData(name);
    newEntry.username = encryption.encryptData(username);
    newEntry.password = encryption.encryptData(password);
    vault.accounts.push(newEntry);

    fs.writeFileSync('./vault.json', JSON.stringify(vault));
}

module.exports.FindEntry = (name) => {
    let obj = vault.accounts.find((o, i) => {
        if (encryption.decryptData(Buffer.from(o.name)) === name) {
            console.log('Name: ' + encryption.decryptData(Buffer.from(vault.accounts[i].name)))
            console.log('Username: ' + encryption.decryptData(Buffer.from(vault.accounts[i].username)))
            console.log('Password: ' + encryption.decryptData(Buffer.from(vault.accounts[i].password)))
            return true;
        }
    });
}

module.exports.setVaultPath = (value) => {
    vaultPath = value;
    console.log(vaultPath)
}

getVaultPath = () => {
    return vaultPath;
}