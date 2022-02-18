import { Injectable } from '@angular/core';
import { RefreshDecrypter } from 'src/app/models/refresh_response';
import { constant } from '../utils/constant';
import { LoaderService } from './loader.service';
import AesEncryption from '../utils/aesEncryption';
import { environment } from 'src/environments/environment';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshKeysService {

  constructor(private loader:LoaderService, private session:SesionService) { }

  refreshKeys(data){

    this.loader.loading()
    //const data = this.encryptStringFixed(JSON.stringify({ u_id: this.encryptJsonFixed(this.getJson(constant.USER).uid), correo: this.encryptJsonFixed(this.getJson(constant.USER).email), scod: this.encryptJsonFixed(this.getJson(constant.USER).scod) }))

    this.session.doRefresh(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      
      this.loader.stop()
      //var response = new RefreshDecrypter(this).deserialize(JSON.parse(this.decryptString(res)))

      return res
  
  })

}


public getJson(key: string): any {
  var data = JSON.parse(this.decryptStringStorage(localStorage.getItem(key)))
  for (var clave in data) {
      data[clave] = this.decryptJsonStorage(data[clave])
  }
  return data
}

decryptStringStorage(text: string): string {
  return AesEncryption.decrypt(environment.ST_KEY, environment.ST_VEC, text)
}

decryptJsonStorage(text: string): string {
  return AesEncryption.decrypt(environment.ST_KEY, environment.ST_VEC, text)
}


}
