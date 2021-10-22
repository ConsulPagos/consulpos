import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/models/auth_response';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ConfirmPasswordValidator } from 'src/app/shared/validators/confirm-password.validator';
import { UserInterface } from '../../../../models/user';
import { AuthService } from '../../../../shared/services/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


  constructor(private auth: AuthService, private fb: FormBuilder, private route: Router) { }
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
    this.auth.error.subscribe(e => {
      this.error = e;
      this.loading = false;
    })
  }

  login() {
    //eliminar esto
    this.error = {};

    if (this.authForm.valid) {
      this.loading = true;
      this.auth.auth(this.authForm.value);
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
