import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user';
import { RefreshDecrypter } from 'src/app/models/refresh_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyKeysGuard implements CanActivate {
  constructor(private loader:LoaderService,private crypto: CryptoService, private session: SesionService, private storage: StorageService, private route: Router, private toaster: ToasterService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const data = this.crypto.encryptStringFixed(JSON.stringify({ u_id: this.crypto.encryptJsonFixed(this.storage.getJson(constant.USER).uid), correo: this.crypto.encryptJsonFixed(this.storage.getJson(constant.USER).email), scod: this.crypto.encryptJsonFixed(this.storage.getJson(constant.USER).scod) }))
    var result = false;
    this.loader.loading()
    await this.session.doRefresh(`${this.session.getDeviceId()};${data}`).toPromise().then(res => {
      var response = new RefreshDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptStringFixed(res)))
      this.loader.stop()

      if (response.R == "0") {
        result = true
      } else {
        this.toaster.error(response.M)
        this.route.navigateByUrl("")
      }
      this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
    })
    return result;

  }

}
