const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET || '123';
const iv = crypto.randomBytes(16);

function encrypt(string) {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(string), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    }

};

function decrypt(string) {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(string.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(string.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};