import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorResponse } from 'src/app/models/auth_response';
import { UserInterface } from 'src/app/models/user';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { LoaderService } from 'src/app/shared/services/loader.service';
import * as pdfMaker from "../../shared/utils/pdf";

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



  constructor(
    private cdr: ChangeDetectorRef, 
    private sesion: SesionService, 
    private crypto: CryptoService, 
    private storage: StorageService, 
    private loader: LoaderService) { }


  ngOnInit(): void {

    if (this.storage.get(constant.BANCOS) == null) {
      this.verify()
    }

    this.loader.changes.subscribe(loading => {
      this.loading = loading;
      this.cdr.detectChanges()
    })
  }

  loggout() {
    localStorage.clear()
  }

  verify() {

    const data = this.crypto.encryptString(JSON.stringify({ u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid), correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email), scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod) }))

    this.loading = true;

    this.sesion.doVerify(`${this.sesion.getDeviceId()};${data}`).subscribe(res => {
      var verifyResponse = new VerifyDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(verifyResponse)
      //console.log(JSON.parse(this.crypto.decryptString(res)))
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
      this.storage.store(constant.T_DOCS_REPRESENTANTES, JSON.stringify(verifyResponse.t_docs_representantes))
      this.storage.store(constant.ACTIVIDAD_COMERCIAL, JSON.stringify(verifyResponse.actividades_comerciales))

      this.storage.store(constant.PROFESIONES, JSON.stringify(verifyResponse.profesiones))

      //this.storage.store(constant.OPERADORAS, JSON.stringify(verifyResponse.operadoras))
      this.storage.store(constant.MODELOS, JSON.stringify(verifyResponse.modelos))
      this.storage.store(constant.MARCAS, JSON.stringify(verifyResponse.marcas))
      this.storage.store(constant.PLANES, JSON.stringify(verifyResponse.planes))
      this.storage.store(constant.PLATAFORMAS, JSON.stringify(verifyResponse.plataformas))
      this.storage.store(constant.T_COBROS, JSON.stringify(verifyResponse.t_cobros))
      this.storage.store(constant.FRACCIONES_PAGO, JSON.stringify(verifyResponse.fracciones_pago))
      this.storage.store(constant.GENEROS, JSON.stringify(verifyResponse.generos))
      this.storage.store(constant.MONEDAS, JSON.stringify(verifyResponse.monedas))
      this.storage.store(constant.TIPO_TASAS, JSON.stringify(verifyResponse.tipo_tasas))
      this.storage.store(constant.TIPOS_DIFERIDO, JSON.stringify(verifyResponse.tipos_diferido))
      this.storage.store(constant.T_SOLICITUDES, JSON.stringify(verifyResponse.t_solicitudes))
      this.storage.store(constant.OCCS, JSON.stringify(verifyResponse.occs))
      this.storage.store(constant.T_PAGOS, JSON.stringify(verifyResponse.t_pagos))
      this.storage.store(constant.ROLES, JSON.stringify(verifyResponse.roles))

      this.storage.store(constant.BANCOS_FRACCION, JSON.stringify(verifyResponse.bancos_fraccion))
      this.storage.store(constant.ALMACENES, JSON.stringify(verifyResponse.almacenes))
      this.storage.store(constant.PROVEEDORES, JSON.stringify(verifyResponse.proveedores))

      // //this.crypto.setKeys(verifyResponse.keyS, verifyResponse.ivJ, verifyResponse.keyJ, verifyResponse.ivS)
    })
  }

}
