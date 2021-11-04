import { Injectable } from '@angular/core';
import AesEncryption from '../utils/aesEncryption'
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private keyString: string = null
  private vectorString: string = null

  private keyJson: string = null
  private vectorJson: string = null


  private keyStringFixed: string = null
  private vectorStringFixed: string = null

  private keyJsonFixed: string = null
  private vectorJsonFixed: string = null


  setKeys(keyString: string, vectorJson: string, keyJson: string, vectorString: string, keyStringFixed: string, vectorJsonFixed: string, keyJsonFixed: string, vectorStringFixed: string) {
    this.keyStringFixed = keyString
    this.vectorStringFixed = vectorString
    this.vectorJsonFixed = vectorJson
    this.keyJsonFixed = keyJson

    this.keyString = keyString
    this.vectorString = vectorString
    this.vectorJson = vectorJson
    this.keyJson = keyJson

  }

  constructor() {

  }

  encryptString(text: string): string {
    if (this.keyString == null || this.vectorString == null) {
      return null
    }
    return AesEncryption.encrypt(this.keyString, this.vectorString, text)
  }


  decryptString(text: string): string {
    if (this.keyString == null || this.vectorString == null) {
      return null
    }
    return AesEncryption.decrypt(this.keyString, this.vectorString, text)
  }

  encryptJson(text: string): string {
    if (this.keyJson == null || this.vectorJson == null) {
      return null
    }
    return AesEncryption.encrypt(this.keyJson, this.vectorJson, text)
  }

  decryptJson(text: string): string {
    if (this.keyJson == null || this.vectorJson == null) {
      return null
    }
    return AesEncryption.decrypt(this.keyJson, this.vectorJson, text)
  }

  ////////////////////////////////////////////////////////////////////

  encryptStringFixed(text: string): string {
    if (this.keyStringFixed == null || this.vectorStringFixed == null) {
      return null
    }
    return AesEncryption.encrypt(this.keyStringFixed, this.vectorStringFixed, text)
  }


  decryptStringFixed(text: string): string {
    if (this.keyStringFixed == null || this.vectorStringFixed == null) {
      return null
    }
    return AesEncryption.decrypt(this.keyStringFixed, this.vectorStringFixed, text)
  }

  encryptJsonFixed(text: string): string {
    if (this.keyJsonFixed == null || this.vectorJsonFixed == null) {
      return null
    }
    return AesEncryption.encrypt(this.keyJsonFixed, this.vectorJsonFixed, text)
  }

  decryptJsonFixed(text: string): string {
    if (this.keyJsonFixed == null || this.vectorJsonFixed == null) {
      return null
    }
    return AesEncryption.decrypt(this.keyJsonFixed, this.vectorJsonFixed, text)
  }

  hash(text: string): string {
    return Md5.hashStr(text)
  }

}
