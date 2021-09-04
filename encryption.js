const crypto = require('crypto')
const fs = require('fs')
const keyManager = require('./keyManager.js')

module.exports.EncryptTestMessage = (passphrase, message) => {

  console.log('In Message: ' + message + '\n')

  const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');

  var buf = Buffer.from(hash + message, 'utf8');

  pubK = fs.readFileSync(keyManager.GetKeyPath() + 'pub.key').toString();

  secretData = crypto.publicEncrypt(pubK, buf);

  console.log('Encrypted Data: ' + secretData.toString('hex') + '\n');

  privK = fs.readFileSync(keyManager.GetKeyPath() + 'priv.key').toString();

  decryptedKey = crypto.createPrivateKey({
    key: privK,
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: passphrase
  })

  origData = crypto.privateDecrypt(decryptedKey, secretData);
  outMessage = origData.toString('utf8').substring(64);

  console.log('Out Message: ' + outMessage);

  return outMessage;
}