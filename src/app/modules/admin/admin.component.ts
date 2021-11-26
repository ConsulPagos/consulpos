import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorResponse } from 'src/app/models/auth_response';
import { UserInterface } from 'src/app/models/user';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

import { VerifyDecrypter, VerifyResponse } from '../../models/verify_response';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  opened = true
  authForm: FormGroup;
  user: UserInterface = {};
  error: ErrorResponse = {};
  loading: Boolean = false;
  submitted: boolean = false;

  constructor(private sesion: SesionService, private crypto: CryptoService, private storage: StorageService) { }

  ngOnInit(): void {
    this.verify()
  }

  loggout() {
    localStorage.clear()
  }

  verify() {

    const data = this.crypto.encryptString(JSON.stringify({ u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid), correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email), scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod) }))
    const IMEI = '13256848646454643'

    this.loading = true;

    console.log("verify")

    this.sesion.doVerify(`${IMEI};${data}`).subscribe(res => {
      var verifyResponse = new VerifyDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(verifyResponse)
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false
      this.storage.store(constant.BANCOS, JSON.stringify(verifyResponse.bancos))
      this.crypto.setKeys(verifyResponse.keyS, verifyResponse.ivJ, verifyResponse.keyJ, verifyResponse.ivS)
    })
  }
  
}
