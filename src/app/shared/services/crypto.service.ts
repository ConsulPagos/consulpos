import { Injectable } from '@angular/core';
import { MD5 } from 'crypto-js';
import { RefreshDecrypter } from 'src/app/models/refresh_response';
import { environment } from 'src/environments/environment';
import AesEncryption from '../utils/aesEncryption';
import { constant } from '../utils/constant';
import { LoaderService } from './loader.service';
import { SesionService } from './sesion.service';
import { StorageService } from './storage.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

/*   private keyString: string
  private vectorString: string
  private keyJson: string
  private vectorJson: string */

  /* setKeys(keyString: string, vectorJson: string, keyJson: string, vectorString: string) {
    this.keyString = keyString
    this.keyJson = keyJson
    this.vectorString = vectorString
    this.vectorJson = vectorJson
    console.log("keyS: " + this.keyString)
    console.log("keyj: " + this.keyJson)
  } */

/*   hasKeys(): boolean {
    return this.vectorJson != undefined && this.keyJson != undefined && this.vectorString != undefined && this.keyString != undefined;
  }

  constructor(private session: SesionService,
    private loader: LoaderService,
    private toaster:ToasterService
  ) { }

  encryptString(text: string): string {
    if (this.keyString == null || this.vectorString == null) {
      return null
    }
    return AesEncryption.encrypt(this.keyString, this.vectorString, text)
  }


  decryptString(text: string): string {

    console.log("text: " + text)

    if (this.keyString == null || this.vectorString == null) {
      this.refreshKeys()
      return null
    }

    var decrypt:string;

    try {
      decrypt = AesEncryption.decrypt(this.keyString, this.vectorString, text)
      if(decrypt.length == 0) this.refreshKeys()

    } catch (error) {
      console.log("ERRORRRRRRR")
      decrypt = null
      this.refreshKeys()
    }

    console.log("decrypt: " + decrypt)


    return decrypt
  }

  encryptJson(text: string): string {
    
    if (this.keyJson == null || this.vectorJson == null) {
      this.refreshKeys()
      return null
    }

    var decrypt;

    try {
      decrypt = AesEncryption.encrypt(this.keyJson, this.vectorJson, text)
    } catch (error) {
      decrypt = null
      this.refreshKeys()
    }

    return decrypt
  }

  decryptJson(text: string): string {

    if (this.keyJson == null || this.vectorJson == null) {
      this.refreshKeys()
      return null
    }

    var decrypt;

    try {
      decrypt = AesEncryption.decrypt(this.keyJson, this.vectorJson, text)
      if(decrypt.length == 0) this.refreshKeys()

    } catch (error) {
      decrypt = null
      this.refreshKeys()
    }

    return decrypt

  }
 */
  encryptString(text: string): string {
    return AesEncryption.encrypt(environment.S_KEY, environment.S_VEC, text)
  }


  decryptString(text: string): string {
    return AesEncryption.decrypt(environment.S_KEY, environment.S_VEC, text)
  }

  encryptJson(text: string): string {
    return AesEncryption.encrypt(environment.J_KEY, environment.J_VEC, text)
  }

  decryptJson(text: string): string {
    return AesEncryption.decrypt(environment.J_KEY, environment.J_VEC, text)
  }

  hash(value: string): string {
    return MD5(value).toString()
  }

  encryptStringStorage(text: string): string {
    return AesEncryption.encrypt(environment.ST_KEY, environment.ST_VEC, text)
  }


  decryptStringStorage(text: string): string {
    return AesEncryption.decrypt(environment.ST_KEY, environment.ST_VEC, text)
  }

  encryptJsonStorage(text: string): string {
    return AesEncryption.encrypt(environment.ST_KEY, environment.ST_VEC, text)
  }


  decryptJsonStorage(text: string): string {
    return AesEncryption.decrypt(environment.ST_KEY, environment.ST_VEC, text)
  }


/*   refreshKeys() {

    this.toaster.error("Error inesperado, por favor intentelo nuevamente.")

    this.loader.loading()
    const data = this.encryptString(JSON.stringify({ u_id: this.encryptJson(this.getJson(constant.USER).uid), correo: this.encryptJson(this.getJson(constant.USER).email), scod: this.encryptJson(this.getJson(constant.USER).scod) }))

    this.session.doRefresh(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.loader.stop()
      var response = new RefreshDecrypter(this).deserialize(JSON.parse(this.decryptString(res)))
      this.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
    })

  } */

  getJson(key: string): any {
    var data = JSON.parse(this.decryptStringStorage(localStorage.getItem(key)))
    for (var clave in data) {
      data[clave] = this.decryptJsonStorage(data[clave])
    }
    return data
  }


}
