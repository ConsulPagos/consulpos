import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';

@Component({
  selector: 'app-admin-change-pwd',
  templateUrl: './admin-change-pwd.component.html',
  styleUrls: ['./admin-change-pwd.component.scss']
})
export class AdminChangePwdComponent implements OnInit {

  psw: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    private toaster: ToasterService,
    private title: Title,
    private modal: ModalService,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
  ) { }

  createForm() {
    this.psw = new FormGroup({
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
    // {
    //   validator: ConfirmPasswordValidator("new_password", "confirmPassword")
    // }
  }

  ngOnInit(): void {
    this.createForm();
  }


  submit() {
    
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      
      currentPsw: this.crypto.encryptJson(this.psw.get('password').value),
      newPsw: this.crypto.encryptJson(this.psw.get('newPassword').value),

    }))
    console.log("verify")
    this.rol.doSaveRoll(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.permisos = JSON.parse(this.crypto.decryptJson(json.permisos))
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS);
    })

    switch (this.defaultResponse.R) {
      case constant.R0:
        this.router.navigateByUrl('/admin/app/(adr:dashboard)')
        this.toaster.success(this.defaultResponse.M)
        break;
      case constant.R1:
        this.toaster.error(this.defaultResponse.M)
        break;
      default:
        this.toaster.default_error()
        break;
    }
  }

}
