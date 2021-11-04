 import {AES} from 'crypto-js';
 import * as CryptoJS from 'crypto-js';

class AesEncryption {

  encrypt(secretKey: string, initVector: string, value: string): string {
    var key = CryptoJS.enc.Utf8.parse(secretKey);
    var iv = CryptoJS.enc.Utf8.parse(initVector);
    var encrypted = AES.encrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    
    return encrypted.toString();
  }

  decrypt(secretKey: string, initVector: string, value: string): any {
    var key = CryptoJS.enc.Utf8.parse(secretKey);
      var iv = CryptoJS.enc.Utf8.parse(initVector);
      var decrypted = AES.decrypt(value, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      
      return decrypted.toString(CryptoJS.enc.Utf8);
  }
}


export default new AesEncryption;