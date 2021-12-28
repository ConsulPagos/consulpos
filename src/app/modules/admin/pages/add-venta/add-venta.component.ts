// *** IMPORTACIONES DE GENERALES *** \\
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
// *** IMPORTACIONES DE MODELOS *** \\
import { ModeloInterface } from '../../../../models/modelos';
import { PlataformaInterface } from '../../../../models/plataforma';
import { BancoInterface } from '../../../../models/banco';
import { ComunicacionInterface } from '../../../../models/tipo_comunicacion';
import { OperadoraInterface } from '../../../../models/operadora';
import { TipoCobroInterface } from '../../../../models/tipo_cobro';
import { PlanInterface } from '../../../../models/plan';
import { TipoventaInterface } from '../../../../models/tipo_venta';
import { TipoclienteInterface } from 'src/app/models/tipo_cliente';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { ValidacionclienteDecrypter, ValidacionclienteResponse } from '../../../../models/validacioncliente_response';
import { FraccionPagoInterface } from 'src/app/models/fraccion_pago';
// *** IMPORTACIONES DE UTILIS *** \\
import { constant } from 'src/app/shared/utils/constant';
// *** IMPORTACIONES DE SERVICIOS *** \\
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { OccInterface } from 'src/app/models/occ';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { Router } from '@angular/router';
import { TipoPagoInterface } from 'src/app/models/tipo_pago';
//****************************************************************************************//

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.scss']
})

export class AddVentaComponent implements OnInit {

  // *** VARIABLES GLOBALES *** \\
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
  tipos_ventas: TipoventaInterface[];
  occs: OccInterface[];   
  t_pagos: TipoPagoInterface[];


  //****************************************************************************************//
  constructor(
    private title: Title,
    private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
  ) {

  }
  //****************************************************************************************//

  identity = new FormGroup({
    rif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    tipo_doc: new FormControl('', [Validators.required]),
  });

  solicitud = new FormGroup({
    occ: new FormControl('', [Validators.required]),
    t_pago_id: new FormControl('', [Validators.required]),
    t_pago_desc: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required]),
  });


  buy = new FormGroup({
    modelo: new FormControl('', [Validators.required]),
    plataforma: new FormControl('', [Validators.required]),
    banco: new FormControl('', [Validators.required]),
    numero_cuenta_pos: new FormControl('', [Validators.required]),
    precio_usd: new FormControl('', [Validators.required]),
    lugar_entrega: new FormControl('', [Validators.required]),
    comunicacion: new FormControl('', [Validators.required]),
    operadora: new FormControl('', [Validators.required]),
    tipocobro: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
    cod_afiliado: new FormControl('', [Validators.required]),
    tipo_venta: new FormControl('', [Validators.required]),
    serial_pos: new FormControl('', [Validators.required]),
    almacen: new FormControl('', [Validators.required]),
    terminal: new FormControl('', [Validators.required]),
  });

  model = new FormGroup({
    acta: new FormControl('', [Validators.required]),
    contrato: new FormControl('', [Validators.required]),
    domiciliacion: new FormControl('', [Validators.required]),
  });

  //****************************************************************************************//
  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Venta')

    this.fraccion_pagos = JSON.parse(this.storage.get(constant.FRACCIONES_PAGO)).fracciones_pago
    this.operadoras = JSON.parse(this.storage.get(constant.OPERADORAS)).operadoras
    this.modelos = JSON.parse(this.storage.get(constant.MODELOS)).modelos
    this.planes = JSON.parse(this.storage.get(constant.PLANES)).planes
    this.plataformas = JSON.parse(this.storage.get(constant.PLATAFORMAS)).plataformas
    this.tipocobros = JSON.parse(this.storage.get(constant.T_COBROS)).t_cobros
    this.tipo_documentos = JSON.parse(this.storage.get(constant.T_DOCS)).t_docs
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
    this.occs = JSON.parse(this.storage.get(constant.OCCS)).occs
    this.t_pagos = JSON.parse(this.storage.get(constant.T_PAGOS)).t_pagos

  }


  //****************************************************************************************//

  // *** FUNCION VALIDADORA DE EXISTENCIA DE USUARIOS *** \\
  verificar_usuario() {
    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    // console.log(rif)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(rif),
    }))
    this.loading = true;
    console.log("verify")
    this.cliente.doVerificaicon(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      // console.log(res)
      // console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionresponse = new ValidacionclienteDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionresponse)
      this.search_client = this.validacionresponse.value_exists === "false" ? true : false;
      if (!this.search_client) {
        this.identity.controls['rif'].setErrors({ 'existe': null });
        this.identity.controls['rif'].updateValueAndValidity()
      } else {
        this.identity.controls['rif'].setErrors({ 'existe': true });
      }
      this.loading = false
      this.crypto.setKeys(this.validacionresponse.keyS, this.validacionresponse.ivJ, this.validacionresponse.keyJ, this.validacionresponse.ivS)
    })
  }
  //****************************************************************************************//


  submit() {

    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    // console.log(rif)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.identity.get('tipo_doc').value + this.identity.get('rif').value),

      occ_id: this.crypto.encryptJson(this.solicitud.get('occ').value),
      t_sol_id: this.crypto.encryptJson("1"),
      pago: this.crypto.encryptJson(JSON.stringify([
        {
          t_pago_id: this.solicitud.get("t_pago_id").value,
          t_pago_desc: this.solicitud.get("t_pago_desc").value,
          monto: this.solicitud.get("monto").value,
        }
      ])),

      id_t_cobro: this.crypto.encryptJson(this.solicitud.get('tipocobro').value),
      monto_cuota: this.crypto.encryptJson("30"),
      fraccion_pago_id: this.crypto.encryptJson(this.solicitud.get('tipo_venta').value),
      plan_id: this.crypto.encryptJson(this.solicitud.get('plan').value),
      modelo_id: this.crypto.encryptJson(this.solicitud.get('modelo').value),
      terminal: this.crypto.encryptJson(this.solicitud.get('terminal').value),
      afiliado: this.crypto.encryptJson(this.solicitud.get('cod_afiliado').value),
      cuenta: this.crypto.encryptJson(this.solicitud.get('numero_cuenta_pos').value),
      banco_id: this.crypto.encryptJson(this.solicitud.get('banco').value),
      
      items: this.crypto.encryptJson(JSON.stringify([
        {
          cod_serial: this.solicitud.get("serial_pos").value,
          pedido_id: this.solicitud.get("").value,
          almacen_id: this.solicitud.get("occ").value,
          status_id: this.solicitud.get("1").value,
          complemento_d: this.solicitud.get("").value,
          reservado: this.solicitud.get("1").value,
        }
      ]))




    }))
    this.loading = true;
    console.log("verify")
    this.cliente.doVerificaicon(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionresponse = new ValidacionclienteDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      // console.log(this.validacionresponse)
      this.loading = false
      this.crypto.setKeys(this.validacionresponse.keyS, this.validacionresponse.ivJ, this.validacionresponse.keyJ, this.validacionresponse.ivS)

      switch (this.validacionresponse.R) {
        case constant.R0:
          this.router.navigateByUrl('/admin/app/(adr:clientela)')
          this.toaster.success(this.validacionresponse.M)
          break;
        case constant.R1:
          this.toaster.error(this.validacionresponse.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }

  getError() {
    return this.identity.errors?.['existe']
  }

  resetStatus() {
    this.search_client = true;
  }

  onlyNumberKey(event) {
    this.resetStatus()
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  price_model() {
    var precio;
    if (this.buy.get("modelo") != null) {
      if (this.modelos.filter(it => it.id == this.buy.get("modelo").value).length > 0) {
        precio = this.modelos.filter(it => it.id == this.buy.get("modelo").value)[0].precio
      }
    }
    return precio
  }

}
