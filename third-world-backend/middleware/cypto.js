import crypto from 'crypto';
const algorithm = 'aes192';

export function encrypt(text) {
    const cipher = crypto.createCipher(algorithm,'a password');
    var encrypted = cipher.update(text,'utf8','hex');
    encrypted = encrypted + cipher.final('hex');
    return encrypted;
}
   
export function decrypt(text) {
    const decipher = crypto.createDecipher(algorithm,'a password');
    var decrypted = decipher.update(text,'hex','utf8');
    decrypted = decrypted + decipher.final('utf8');
    return decrypted;
}


// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);


// export function encrypt(text) {
//     let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//     let encrypted = cipher.update(text);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }
   
// export function decrypt(text) {
//     let iv = Buffer.from(text.iv, 'hex');
//     let encryptedText = Buffer.from(text.encryptedData, 'hex');
//     let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//     let decrypted = decipher.update(encryptedText);
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     return decrypted.toString();
// }


