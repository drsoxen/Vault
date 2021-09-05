const crypto = require('crypto')
const fs = require('fs')

let keyPath = './creds/';
let passphrase = '';

module.exports.CreateKeyPair = () => {
    crypto.generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: getPassphrase()
        }
    }, (err, publicKey, privateKey) => {
        if (!fs.existsSync('creds')) {
            fs.mkdirSync('creds');
        }

        keyPath = './creds/';

        fs.writeFileSync(keyPath + 'priv.key', privateKey);
    });
}

module.exports.dectyptPrivateKey = () => {

    privK = fs.readFileSync(getKeyPath() + 'priv.key').toString();

    decryptedKey = crypto.createPrivateKey({
        key: privK,
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: getPassphrase()
    })

    return decryptedKey;
}

module.exports.createPublicKey = () => {
    return crypto.createPublicKey(module.exports.dectyptPrivateKey());
}

module.exports.setPassphrase = (value) => {
    passphrase = value;
    console.log('passphrase: ' + passphrase)
}

getPassphrase = () => {
    return passphrase;
}

setKeyPath = (value) => {
    keyPath = value + '/';
    console.log(keyPath)
}

getKeyPath = () => {
    return keyPath;
}