import { AES } from 'crypto-js';
import * as CryptoJS from 'crypto-js';

class AesEncryption {

  encrypt(secretKey: string, initVector: string, value: string): string {

    var key = CryptoJS.enc.Utf8.parse(secretKey);
    var iv = CryptoJS.enc.Utf8.parse(initVector);
    var padmsg = CryptoJS.enc.Utf8.parse(value);

    var encrypted = CryptoJS.AES.encrypt(padmsg, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  padString(source) {
    var paddingChar = ' ';
    var size = 32;
    var x = source.length % size;
    var padLength = size - x;

    for (var i = 0; i < padLength; i++) source += paddingChar;

    return source;
  }

  decrypt(secretKey: string, initVector: string, value: string): any {
    var key = CryptoJS.enc.Utf8.parse(secretKey);
    var iv = CryptoJS.enc.Utf8.parse(initVector);

    // var ciphertext = CryptoJS.enc.Base64.parse(JSON.stringify(value));
    // var encryptedCP = CryptoJS.lib.CipherParams.create({
    //   ciphertext: ciphertext,
    //   formatter: CryptoJS.format.OpenSSL
    // });

    // var decrypted = AES.decrypt(JSON.stringify(value), key, {
    //   iv: iv,
    //   mode: CryptoJS.mode.CBC,
    //   padding: CryptoJS.pad.Pkcs7,
    // });

    var vaina = CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8)


    return JSON.parse( CryptoJS.AES.decrypt(vaina,secretKey, {iv:iv}).toString(CryptoJS.enc.Utf8))

  }
}


export default new AesEncryption;