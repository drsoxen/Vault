const crypto = require('crypto')
const fs = require('fs')
const keyManager = require('./keyManager.js')

module.exports.encryptData = (data) => {

    console.log('In data: ' + data + '\n')

    const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');

    const buf = Buffer.from(hash + data, 'utf8');

    const pubK = keyManager.createPublicKey();

    const secretData = crypto.publicEncrypt(pubK, buf);

    console.log('Encrypted Data: ' + secretData.toString('hex') + '\n');

    return secretData;

}

module.exports.decryptData = (data) => {

    const origData = crypto.privateDecrypt(keyManager.dectyptPrivateKey(), data);

    //console.log('Out data: ' + origData.toString('utf8').substring(64));

    return origData.toString('utf8').substring(64)
}