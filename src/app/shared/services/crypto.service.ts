import { Injectable } from '@angular/core';
import { MD5 } from 'crypto-js';
import { environment } from 'src/environments/environment';
import AesEncryption from '../utils/aesEncryption';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private keyString: string = null
  private vectorString: string = null

  private keyJson: string = null
  private vectorJson: string = null

  setKeys(keyString: string, vectorJson: string, keyJson: string, vectorString: string) {
    this.keyString = keyString
    this.vectorString = vectorString
    this.vectorJson = vectorJson
    this.keyJson = keyJson
  }

  constructor() {}

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

  encryptStringFixed(text: string): string {
    return AesEncryption.encrypt(environment.S_KEY, environment.S_VEC, text)
  }


  decryptStringFixed(text: string): string {
    return AesEncryption.decrypt(environment.S_KEY, environment.S_VEC, text)
  }

  encryptJsonFixed(text: string): string {
    return AesEncryption.encrypt(environment.J_KEY, environment.J_VEC, text)
  }

  decryptJsonFixed(text: string): string {
    return AesEncryption.decrypt(environment.J_KEY, environment.J_VEC, text)
  }

  hash(value: string): string {
    return MD5(value).toString()
  } 


}
