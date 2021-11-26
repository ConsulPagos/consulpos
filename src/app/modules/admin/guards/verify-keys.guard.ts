import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class VerifyKeysGuard implements CanActivate {
  constructor(private crypto: CryptoService, private session: SesionService, private storage: StorageService) {

  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    // console.log("SE EJECUTA GUARD")
    // const data = this.crypto.encryptStringFixed(JSON.stringify({ u_id: this.crypto.encryptJsonFixed("1"), correo: this.crypto.encryptJsonFixed(this.storage.getJson(constant.USER).email), scod: this.crypto.encryptJsonFixed(this.storage.getJson(constant.USER).scod) }))
    // const IMEI = '13256848646454643';
    // var result = false;
    // await this.session.doRefresh(`${IMEI};${data}`).toPromise().then(res => {
    //   console.log(res);
    //   console.log(JSON.parse(this.crypto.decryptStringFixed(res)))
    //   result = true;
    //   //var verifyResponse = new VerifyDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
    //   /*  console.log(verifyResponse)
    //   console.log(JSON.parse(this.crypto.decryptString(res)))
    //   this.loading = false
    //   this.storage.store(constant.BANCOS, JSON.stringify(verifyResponse.bancos))
    //   this.crypto.setKeys(verifyResponse.keyS, verifyResponse.ivJ, verifyResponse.keyJ, verifyResponse.ivS) */
    // })
    return true;

  }

}
