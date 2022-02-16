import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
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

  constructor(
    private router: Router,
    private toaster: ToasterService,
    private title: Title,
    private modal: ModalService,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private fb: FormBuilder,
    private loader: LoaderService,
  ) { }

  defaultResponse: DefaultResponse;
  hide = true;

  psw = this.fb.group({
    password: ["", [Validators.required, Validators.minLength(6)]],
    newPassword: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
  },
    {
      validator: ConfirmPasswordValidator("newPassword", "confirmPassword")
    });

  ngOnInit(): void {
  }


  submit() {

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      currentPsw: this.crypto.encryptJson(this.crypto.hash(this.psw.get('password').value)),
      newPsw: this.crypto.encryptJson(this.crypto.hash(this.psw.get('newPassword').value)),

    }))
    this.loader.loading()
    console.log("verify")
    this.session.doChangePsw(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS);
      this.loader.stop()
          switch (this.defaultResponse.R) {
      case constant.R0:
        this.toaster.success(this.defaultResponse.M)
        this.router.navigateByUrl('/admin/app/(adr:dashboard)')
        break;
      case constant.R1:
        this.toaster.error(this.defaultResponse.M)
        break;
      default:
        this.toaster.default_error()
        break;
    }
    }


    )


  }

}
