const encryption = require('./encryption.js');
const fs = require('fs')

let vault;

module.exports.ReadPasswordFile = () => {
    vault = JSON.parse(fs.readFileSync('./vault.json', 'utf-8'))
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
        if (encryption.decryptData(o.name) === name) {
            console.log('Name: ' + encryption.decryptData(vault.accounts[i].name))
            console.log('Username: ' + encryption.decryptData(vault.accounts[i].username))
            console.log('Password: ' + encryption.decryptData(vault.accounts[i].password))
            return true;
        }
    });
}