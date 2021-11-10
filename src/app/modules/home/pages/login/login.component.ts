import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/models/auth_response';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { UserInterface } from '../../../../models/user';


import { SesionService } from '../../../../shared/services/sesion.service'
import { CryptoService } from '../../../../shared/services/crypto.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


  constructor(private sesion: SesionService, private crypto: CryptoService, private fb: FormBuilder, private route: Router) { }
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
    //eliminar esto
    this.error = {};
    this.user.correo = this.crypto.encryptJsonFixed(this.authForm.get('email').value)
    this.user.psw = this.crypto.encryptJsonFixed(this.crypto.hash(this.authForm.get('password').value))
    this.user.lat = this.crypto.encryptJsonFixed('0')
    this.user.long = this.crypto.encryptJsonFixed('0')
    this.user.sist_op = this.crypto.encryptJsonFixed('0')
    this.user.modelo_disp = this.crypto.encryptJsonFixed('0')
    
    const data = this.crypto.encryptStringFixed(JSON.stringify(this.user))
    const IMEI = '13256848646454643'

    console.log(`${IMEI}:${data}`)
    console.log(JSON.stringify(this.user))
    console.log(this.authForm.value)

    if (this.authForm.valid) {
      this.loading = true;
      this.route.navigateByUrl('/admin/app/(adr:dashboard)');
      localStorage.setItem('user_id', "1");
      localStorage.setItem('access_token', "");
      localStorage.setItem('refresh_token', "");
      localStorage.setItem('identity', "john@gmail.com");
      localStorage.setItem('access_level', "99");
      localStorage.setItem('state', "1");
      console.log("login")
      this.sesion.doLogin(`${IMEI};${data}`).subscribe(res => {
        console.log("res")
        console.log(res)
        this.loading = false
      })
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
          this.error.msg = 'Contraseña es requerida'
          this.error.field = 'password'
        } else if (this.authForm.get('password').errors.minlength) {
          this.error.msg = 'La contraseña debe tener una longitud mínima de 5 caracteres'
          this.error.field = 'password'
        }
      }
    }
  }
  calculateClasses(field) {
    if (field == this.error.field) {
      return {
        'input-error': true
      }
    }
    return {
      'input-error': false
    };
  }

}
