import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorResponse } from 'src/app/models/auth_response';
import { UserInterface } from 'src/app/models/user';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';


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

  constructor(private sesion: SesionService, private crypto: CryptoService) { }

  ngOnInit(): void {
  }

  loggout(){
    localStorage.clear()
  }

  login() {
    this.error = {};

    
    const data = this.crypto.encryptString(JSON.stringify({correo:this.crypto.encryptJson(this.authForm.get('email').value)}))
    const IMEI = '13256848646454643'

    if (this.authForm.valid) {
      this.loading = true;

      console.log("verify")

      
      this.sesion.doVerify(`${IMEI};${data}`).subscribe(res => {
        console.log("res")
        console.log(res)
        this.loading = false
      })
    
    }
  }




}
