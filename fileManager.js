const encryption = require('./encryption.js');
const fs = require('fs')

let vault;

module.exports.ReadPasswordFile = () => {
    vault = JSON.parse(fs.readFileSync('./vault.json', 'utf-8'))
    console.log(JSON.stringify(vault))
}

module.exports.CreateEntry = (name, username, password) => {
    let newEntry = {};
    newEntry.name = name;
    newEntry.username = username;
    newEntry.password = password;
    vault.accounts.push(newEntry);

    fs.writeFileSync('./vault.json', JSON.stringify(vault));
}

module.exports.FindEntry = (name) => {
    let obj = vault.accounts.find((o, i) => {
        if (o.name === name) {
            console.log('username: ' + vault.accounts[i].username)
            console.log('password: ' + vault.accounts[i].password)
            return true;
        }
    });
}

module.exports.WritePasswordFile = () => {

    let user = {
        name: 'John Doe',
        emai: 'john.doe@example.com',
        age: 27,
        gender: 'Male',
        profession: 'Software Developer'
    };

    // convert JSON object to a string
    const data = JSON.stringify(user);

    // write file to disk
    fs.writeFile('./user.json', data, 'utf8', (err) => {

        if (err) {
            console.log(`Error writing file: ${err}`);
        } else {
            console.log(`File is written successfully!`);
        }

    });

}