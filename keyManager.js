const crypto = require('crypto')
const fs = require('fs')

let keyPath = './creds/';

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

		keyPath = './creds/';

		fs.writeFileSync(keyPath + 'pub.key', publicKey);
		fs.writeFileSync(keyPath + 'priv.key', privateKey);
	});
}

module.exports.SetKeyPath = (value) => {
	keyPath = value + '/';
	console.log(keyPath)
}

module.exports.GetKeyPath = () => {
	return keyPath;
}