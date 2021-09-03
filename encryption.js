const crypto = require('crypto')
const fs = require('fs')

module.exports.CreateKeyPair = (passphrase) => {
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
      passphrase: passphrase
    }
  }, (err, publicKey, privateKey) => {
    if (!fs.existsSync('creds')) {
      fs.mkdirSync('creds');
    }

    fs.writeFileSync('creds/pub.key', publicKey);
    fs.writeFileSync('creds/priv.key', privateKey);
  });
}

module.exports.EncryptTestMessage = (passphrase, message) => {

  console.log('In Message: ' + message + '\n')

  const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');

  var buf = Buffer.from(hash + message, 'utf8');

  pubK = fs.readFileSync('creds/pub.key').toString();

  secretData = crypto.publicEncrypt(pubK, buf);

  console.log('Encrypted Data: ' + secretData.toString('hex') + '\n');

  privK = fs.readFileSync('creds/priv.key').toString();

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