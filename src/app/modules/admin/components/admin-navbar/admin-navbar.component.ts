import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoutResponse, SesionObject } from 'src/app/models/sesion_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  identity = '';
  state = '';
  response: LogoutResponse;
  authForm: FormGroup;

  constructor(
    private storage: StorageService,
    private sesion: SesionService,
    private crypto: CryptoService,
    private router: Router,
    private toaster: ToasterService,
    private route: Router) {
    this.identity = this.storage.getJson(constant.USER).email;
  }

  ngOnInit(): void {
  }

  loggout() {
/*     localStorage.clear()
    this.route.navigateByUrl('') */
    
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      
    }))

    const IMEI = '13256848646454643'
    console.log("logout")

    this.sesion.doLogout(`${IMEI};${data}`).subscribe(res => {
      this.response = new SesionObject(this.crypto).logOutDecrypter(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.response)
      switch (this.response.R) {
        case constant.R0:
          localStorage.clear()
          this.route.navigateByUrl('')
          break;
        case constant.R1:
          this.toaster.error(this.response.M)
          this.crypto.setKeys(this.response.keyJ, this.response.ivJ, this.response.keyJ, this.response.keyS)
          break;
        default:
          this.toaster.default_error()
          this.crypto.setKeys(this.response.keyJ, this.response.ivJ, this.response.keyJ, this.response.keyS)
          break;
      }
    })
  }
}

