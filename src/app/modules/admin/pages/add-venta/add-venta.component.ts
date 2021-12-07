import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ModeloInterface } from '../../../../models/modelos'
import { PlataformaInterface } from '../../../../models/plataforma'
import { BancoInterface } from '../../../../models/banco'
import { ComunicacionInterface } from '../../../../models/tipo_comunicacion'
import { OperadoraInterface } from '../../../../models/operadora'
import { TipoCobroInterface } from '../../../../models/tipo_cobro'
import { PlanInterface } from '../../../../models/plan'
import { TipoventaInterface } from '../../../../models/tipo_venta'
import { TipoclienteInterface } from 'src/app/models/tipo_cliente';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { constant } from 'src/app/shared/utils/constant';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ValidacionclienteDecrypter, ValidacionclienteResponse } from '../../../../models/validacioncliente_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { FraccionPagoInterface } from 'src/app/models/fraccion_pago';
import { SesionService } from 'src/app/shared/services/sesion.service';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.scss']
})

export class AddVentaComponent implements OnInit {

  loading = false;
  search_client: boolean = true;
  modelos: ModeloInterface[];
  fraccion_pagos: FraccionPagoInterface[];
  
  validacionresponse: ValidacionclienteResponse;

  tipos_clientes: TipoclienteInterface[];

  plataformas: PlataformaInterface[];
  bancos: BancoInterface[];
  comunicaciones: ComunicacionInterface[];
  operadoras: OperadoraInterface[];
  tipocobros: TipoCobroInterface[];
  planes: PlanInterface[];

  tipo_documentos: TipodocumentoInterface[];

  constructor(
    private title: Title, 
    private crypto: CryptoService, 
    private cliente: ClientesService,
    private storage: StorageService,
    private session: SesionService) { }

  buy = new FormGroup({
    modelo: new FormControl('', [Validators.required]),
    plataforma: new FormControl('', [Validators.required]),
    banco: new FormControl('', [Validators.required]),
    Numero_cuenta_pos: new FormControl('', [Validators.required]),
    precio_usd: new FormControl('', [Validators.required]),
    lugar_entrega: new FormControl('', [Validators.required]),
    comunicacion: new FormControl('', [Validators.required]),
    operadora: new FormControl('', [Validators.required]),
    tipocobro: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
    cod_afiliado: new FormControl('', [Validators.required]),
  
  });

  venta = new FormGroup({
    tipo_venta: new FormControl('', [Validators.required]),
  });

  model = new FormGroup({

  });

  tipos_ventas: TipoventaInterface[];

  file = new FormGroup({
    id: new FormControl('', [Validators.required]),
  });

  client_type = new FormGroup({
    rif: new FormControl('', [Validators.required]),
    tipo_doc: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Venta')

    this.fraccion_pagos = JSON.parse(this.storage.get(constant.FRACCIONES_PAGO)).fracciones_pago
    this.operadoras = JSON.parse(this.storage.get(constant.OPERADORAS)).operadoras
    this.modelos= JSON.parse(this.storage.get(constant.MODELOS)).modelos
    this.planes = JSON.parse(this.storage.get(constant.PLANES)).planes
    this.plataformas = JSON.parse(this.storage.get(constant.PLATAFORMAS)).plataformas
    this.tipocobros = JSON.parse(this.storage.get(constant.T_COBROS)).t_cobros
    this.tipo_documentos = JSON.parse(this.storage.get(constant.T_DOCS)).t_docs
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
  }

  verificar_usuario() {
    this.search_client = true;
    var rif = this.client_type.get('tipo_doc').value + this.client_type.get('rif').value
    // console.log(rif)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.client_type.get('tipo_doc').value + this.client_type.get('rif').value),
    }))
    this.loading = true;
    // console.log("verify")
    this.cliente.doVerificaicon(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(res)
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionresponse = new ValidacionclienteDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionresponse)
      this.search_client = this.validacionresponse.value_exists === "true" ? true : false;
      if (this.search_client) {
        this.client_type.controls['rif'].setErrors({ 'existe': true });
      } else {
        this.client_type.controls['rif'].setErrors({ 'existe': null });
        this.client_type.controls['rif'].updateValueAndValidity()
      }
      this.loading = false
      this.crypto.setKeys(this.validacionresponse.keyS, this.validacionresponse.ivJ, this.validacionresponse.keyJ, this.validacionresponse.ivS)
    })
  }

  submit() {

    var rif = this.client_type.get('tipo_doc').value + this.client_type.get('rif').value
    console.log(rif)

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.client_type.get('tipo_doc').value + this.client_type.get('rif').value),
    }))


    this.loading = true;

    console.log("verify")

    this.cliente.doVerificaicon(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionresponse = new ValidacionclienteDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionresponse)
      this.loading = false
      this.crypto.setKeys(this.validacionresponse.keyS, this.validacionresponse.ivJ, this.validacionresponse.keyJ, this.validacionresponse.ivS)
    })
  }

  getError() {
    return this.client_type.errors?.['existe']
  }

  resetStatus() {
    this.search_client = true;
  }

  onlyNumberKey(event) {
    this.resetStatus()
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  price_model(){
    var precio;
    if(this.buy.get("modelo") != null){
      if(this.modelos.filter(it => it.id == this.buy.get("modelo").value).length > 0){
        precio = this.modelos.filter(it => it.id == this.buy.get("modelo").value)[0].precio
      }
    }
    return precio
  }

}
