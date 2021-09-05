const crypto = require('crypto')
const fs = require('fs')
const keyManager = require('./keyManager.js')

module.exports.encryptData = (data) => {

  console.log('In data: ' + data + '\n')

  const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');

  var buf = Buffer.from(hash + data, 'utf8');

  pubK = keyManager.createPublicKey();

  secretData = crypto.publicEncrypt(pubK, buf);

  console.log('Encrypted Data: ' + secretData.toString('hex') + '\n');

  return secretData;

}

module.exports.decryptData = (data) => {

  origData = crypto.privateDecrypt(keyManager.dectyptPrivateKey(), data);

  console.log('Out data: ' + origData.toString('utf8').substring(64));
}
