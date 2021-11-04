import * as crypto from 'crypto';

const encryptionType = 'aes-256-cbc';
const encryptionEncoding = 'base64';
const bufferEncryption = 'utf-8';
class AesEncryption {

  encrypt(secretKey: string, initVector: string, text: string): string {
    const val = text;
    const key = Buffer.from(secretKey, bufferEncryption);
    const iv = Buffer.from(initVector, bufferEncryption);
    const cipher = crypto.createCipheriv(encryptionType, key, iv);
    let encrypted = cipher.update(val, 'utf8', encryptionEncoding);
    encrypted += cipher.final(encryptionEncoding);
    return encrypted;
  }

  decrypt(secretKey: string, initVector: string, base64String: string): any {
    const buff = Buffer.from(base64String, encryptionEncoding);
    const key = Buffer.from(secretKey, bufferEncryption);
    const iv = Buffer.from(initVector, bufferEncryption);
    const decipher = crypto.createDecipheriv(encryptionType, key, iv);
    const deciphered = Buffer.concat([decipher.update(buff), decipher.final()]) ;
    return deciphered;
  }
}

export default new AesEncryption;