import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/models/auth_response';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserInterface } from '../../../../models/user';
import { SesionObject } from '../../../../models/sesion_response';

import { SesionService } from '../../../../shared/services/sesion.service'
import { CryptoService } from '../../../../shared/services/crypto.service'
import { ToasterService } from 'src/app/shared/services/toaster.service';

import { constant } from "../../../../shared/utils/constant";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


  constructor(private session: SesionService, private crypto: CryptoService, private fb: FormBuilder, private route: Router, private toaster: ToasterService, private storage: StorageService) { }
  authForm: FormGroup;
  user: UserInterface = {};
  error: ErrorResponse = {};
  loading: Boolean = false;
  submitted: boolean = false;

  ngOnInit(): void {

    this.authForm = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(5)]],
        email: ["", [Validators.required, Validators.email]]
      }
    );

    this.error = {};
    // this.auth.error.subscribe(e => {
    //   this.error = e;
    //   this.loading = false;
    // })
  }

  login() {
    this.error = {};
    this.user.correo = this.crypto.encryptJson(this.authForm.get('email').value)
    this.user.psw = this.crypto.encryptJson(this.crypto.hash(this.authForm.get('password').value))
    this.user.lat = this.crypto.encryptJson('0')
    this.user.long = this.crypto.encryptJson('0')
    this.user.sist_op = this.crypto.encryptJson('0')
    this.user.modelo_disp = this.crypto.encryptJson('0')

    const data = this.crypto.encryptString(JSON.stringify(this.user))

    if (this.authForm.valid) {

      this.loading = true;

      this.session.doLogin(`${this.session.getDeviceId()};${data}`).toPromise().then(res => {
        var sesionResponse = new SesionObject(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
        // //this.crypto.setKeys(sesionResponse.keyS, sesionResponse.ivJ, sesionResponse.keyJ, sesionResponse.ivS)
        console.log(sesionResponse)
        switch (sesionResponse.R) {
          case constant.R0:
            this.storage.store(constant.PERMISOS, JSON.stringify(sesionResponse.permisos))
            this.storage.storeJson(constant.USER, { email: this.authForm.get('email').value, scod: sesionResponse.scod, uid: sesionResponse.u_id })
            this.route.navigateByUrl('/admin/app/(adr:dashboard)')
            break;
          case constant.R1 || constant.R4:
            this.toaster.error(sesionResponse.M)
            this.loading = false
            break;
          default:
            this.loading = false
            this.toaster.default_error()
            break;
        }



      });

    } else {
      if (this.authForm.get('email').errors) {
        if (this.authForm.get('email').errors.required) {
          this.error.msg = 'Correo electronico es requerido'
          this.error.field = 'email'
        } else if (this.authForm.get('email').errors.email) {
          this.error.msg = 'Introduzca un correo electronico valido'
          this.error.field = 'email'
        }
      } else if (this.authForm.get('password').errors) {
        if (this.authForm.get('password').errors.required) {
          this.error.msg = 'Contraseña es requerida';
          this.error.field = 'password';
        } else if (this.authForm.get('password').errors.minlength) {
          this.error.msg = 'La contraseña debe tener una longitud mínima de 5 caracteres';
          this.error.field = 'password';
        }
      }
    }
  }
  calculateClasses(field) {
    if (field == this.error.field) {
      return {
        'input-error': true
      };
    }
    return {
      'input-error': false
    };
  }

  example() {
    var data = [{ id_rol: 1, rol: "a" }]
  }

}
