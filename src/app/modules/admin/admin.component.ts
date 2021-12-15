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
    console.log(this.storage.get(constant.USER))
    if(this.storage.get(constant.BANCOS) == null){
      this.verify()
    }
  }

  loggout() {
    localStorage.clear()
  }

  verify() {

    const data = this.crypto.encryptString(JSON.stringify({ u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid), correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email), scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod) }))

    this.loading = true;

    console.log("verify")

    this.sesion.doVerify(`${this.sesion.getDeviceId()};${data}`).subscribe(res => {
      var verifyResponse = new VerifyDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(verifyResponse)
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false
      this.storage.store(constant.BANCOS, JSON.stringify(verifyResponse.bancos))
      this.storage.store(constant.ESTADOS, JSON.stringify(verifyResponse.estados))
      this.storage.store(constant.CIUDADES, JSON.stringify(verifyResponse.ciudades))
      this.storage.store(constant.CONTRIBUYENTES, JSON.stringify(verifyResponse.contribuyentes))
      this.storage.store(constant.M_CONTACTO, JSON.stringify(verifyResponse.m_contactos))
      this.storage.store(constant.MUNICIPIOS, JSON.stringify(verifyResponse.municipios))
      this.storage.store(constant.PARROQUIAS, JSON.stringify(verifyResponse.parroquias))
      this.storage.store(constant.T_CLIENTES, JSON.stringify(verifyResponse.t_clientes))
      this.storage.store(constant.T_DOCS, JSON.stringify(verifyResponse.t_docs))
      this.storage.store(constant.ACTIVIDAD_COMERCIAL, JSON.stringify(verifyResponse.actividades_comerciales))

      this.storage.store(constant.OPERADORAS, JSON.stringify(verifyResponse.operadoras))
      this.storage.store(constant.MODELOS, JSON.stringify(verifyResponse.modelos))
      this.storage.store(constant.PLANES, JSON.stringify(verifyResponse.planes))
      this.storage.store(constant.PLATAFORMAS, JSON.stringify(verifyResponse.plataformas))
      this.storage.store(constant.T_COBROS, JSON.stringify(verifyResponse.t_cobros))
      this.storage.store(constant.FRACCIONES_PAGO, JSON.stringify(verifyResponse.fracciones_pago))
      this.storage.store(constant.GENEROS, JSON.stringify(verifyResponse.generos))

      
      this.crypto.setKeys(verifyResponse.keyS, verifyResponse.ivJ, verifyResponse.keyJ, verifyResponse.ivS)
    })
  }
  
}
