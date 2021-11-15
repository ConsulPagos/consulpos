import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  identity = '';
  state = '';

  constructor(private storage:StorageService,private sesion: SesionService, private crypto: CryptoService, private router: Router) {
    this.identity = this.storage.getJson(constant.USER).email;
  }

  ngOnInit(): void {
  }

  loggout() {
    const data = this.crypto.encryptString(JSON.stringify({ u_id: this.crypto.encryptJson("1"), scod: this.sesion.getSCod() }))
    const IMEI = '13256848646454643'
    console.log("logout")
    this.sesion.doLogout(`${IMEI};${data}`).toPromise().then(res => {
      localStorage.clear()
      this.router.navigateByUrl('')
    });
  }
}

