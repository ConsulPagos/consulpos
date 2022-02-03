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
import { SimInterface } from '../../../../models/sim';
import { TipoventaInterface } from '../../../../models/tipo_venta';
import { TipoclienteInterface } from 'src/app/models/tipo_cliente';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { ValidacionOccDecrypter, ValidacionOccResponse } from '../../../../models/validacionocc_response';
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
import { VentasService } from 'src/app/shared/services/ventas.service';
import { ValidacionclienteDecrypter, ValidacionclienteResponse } from '../../../../models/validacioncliente_response';
import { ValidacionventaRese, ValidacionventadosDecrypter } from '../../../../models/validacionventa_res';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SaleRequestInterface } from 'src/app/models/sales';
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
  validacionoccresponse: ValidacionOccResponse;
  validacionres: ValidacionventaRese;
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
  sims = [];
  buies = [];
  formats: SimInterface[] = [];
  formats_buy: SaleRequestInterface[] = [];

  //****************************************************************************************//
  constructor(
    private title: Title,
    private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private venta: VentasService,
    private modal: ModalService,
  ) {

  }
  //****************************************************************************************//

  identity = new FormGroup({
    rif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    tipo_doc: new FormControl('', [Validators.required]),
  });

  solicitud = new FormGroup({
    occ: new FormControl('', [Validators.required]),
  });

  sim = new FormGroup({
    operadora: new FormControl('', [Validators.required]),
  });

  document = new FormGroup({
    referencia: new FormControl('', [Validators.required]),
  });

  //****************************************************************************************//
  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Venta')
    this.occUser()
    this.add_buy()
    this.fraccion_pagos = JSON.parse(this.storage.get(constant.FRACCIONES_PAGO)).fracciones_pago
    this.operadoras = JSON.parse(this.storage.get(constant.OPERADORAS)).operadoras
    this.modelos = JSON.parse(this.storage.get(constant.MODELOS)).modelos
    this.planes = JSON.parse(this.storage.get(constant.PLANES)).planes
    this.plataformas = JSON.parse(this.storage.get(constant.PLATAFORMAS)).plataformas
    this.tipocobros = JSON.parse(this.storage.get(constant.T_COBROS)).t_cobros
    this.tipo_documentos = JSON.parse(this.storage.get(constant.T_DOCS)).t_docs
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
    // this.occs = JSON.parse(this.storage.get(constant.OCCS)).occs
    this.t_pagos = JSON.parse(this.storage.get(constant.T_PAGOS)).t_pagos
  }

  add_buy() {
    var newFormat: SaleRequestInterface = {};
    var buy = new FormGroup({
      modelo: new FormControl('', [Validators.required]),
      plataforma: new FormControl('', [Validators.required]),
      banco: new FormControl('', [Validators.required]),
      numero_cuenta_pos: new FormControl('', [Validators.required]),
      precio_usd: new FormControl('', [Validators.required]),
      lugar_entrega: new FormControl('', [Validators.required]),
      tipocobro: new FormControl('', [Validators.required]),
      plan: new FormControl('', [Validators.required]),
      tipo_venta: new FormControl('', [Validators.required]),
      terminal: new FormControl(''),
      cod_afiliado: new FormControl(''),
    });
    var sim = new FormGroup({
      operadora: new FormControl('', [Validators.required]),
    });
    newFormat.sims = [sim]
    this.buies.push(buy);
    this.formats_buy.push(newFormat);
  }

  deleteBuy(index: number) {
    this.formats_buy.splice(index, 1);
    this.buies.splice(index, 1);
  }

  add_sim(index: number) {
    var sim = new FormGroup({
      operadora: new FormControl('', [Validators.required]),
    });
    this.formats_buy[index].sims.push(sim)
  }

  deleteSim(index: number, indexsim: number) {
    this.formats_buy[index].sims.splice(indexsim, 1);
  }

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
      }
      else {
        this.identity.controls['rif'].setErrors({ 'existe': true });
      }
      this.loading = false
      this.crypto.setKeys(this.validacionresponse.keyS, this.validacionresponse.ivJ, this.validacionresponse.keyJ, this.validacionresponse.ivS)
    })
  }

  occUser() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.loading = true;
    this.venta.doOccUser(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.validacionoccresponse = new ValidacionOccDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.occs = JSON.parse(this.validacionoccresponse.occ_usuarios)
      this.loading = false
      this.crypto.setKeys(this.validacionoccresponse.keyS, this.validacionoccresponse.ivJ, this.validacionoccresponse.keyJ, this.validacionoccresponse.ivS)
    })
  }

  submit() {
    var solicitudes_banco_sell: any = [];

    this.buies.forEach(buy => {
      var items: any = [
        {
          modelo_id: buy.get("modelo").value,
          modelo: "MF919",
        }
      ]
      this.sims.forEach(sim => {
        items.push({
          sim_id: sim.get("operadora").value,
          sim: "DIGITEL",
        })
      })

      solicitudes_banco_sell.push({
        id_t_cobro: buy.get('tipocobro').value,
        monto_cuota: "30",
        fraccion_pago_id: buy.get('tipo_venta').value,
        plan_id: buy.get('plan').value,
        modelo_id: buy.get('modelo').value,
        terminal: buy.get('terminal').value,
        afiliado: buy.get('cod_afiliado').value,
        cuenta: buy.get('numero_cuenta_pos').value,
        banco_id: buy.get('banco').value,
        items: JSON.stringify(items),
      })
    })

    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.identity.get('tipo_doc').value + this.identity.get('rif').value),
      solicitud: this.crypto.encryptJson(JSON.stringify(
        {
          occ_id: this.solicitud.get('occ').value,
          t_sol_id: "1",
        }
      )),
      solicitudes_banco: this.crypto.encryptJson(JSON.stringify(
        solicitudes_banco_sell
      )),
      documentos: this.crypto.encryptJson(JSON.stringify([
        {
          link: this.document.get("referencia").value,
          id_doc: "1"
        },
      ]))
    }))

    this.loading = true;
    console.log("verify")
    this.venta.doSale(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionres = new ValidacionventadosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionres)
      this.loading = false
      this.crypto.setKeys(this.validacionres.keyS, this.validacionres.ivJ, this.validacionres.keyJ, this.validacionres.ivS)
      switch (this.validacionres.R) {
        case constant.R0:
          this.toaster.success(this.validacionres.M)
          this.router.navigateByUrl('/admin/app/(adr:ventas)')
          break;
        case constant.R1:
          this.toaster.error(this.validacionres.M)
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

  price_model(buies: FormGroup) {
    var precio;
    if (buies != null) {
      if (this.modelos.filter(it => it.id == buies.get("modelo").value).length > 0) {
        precio = this.modelos.filter(it => it.id == buies.get("modelo").value)[0].precio
      }
    }
    return precio
  }

  save() {
    this.modal.confirm("Desea confirmar el registro de la venta").subscribe(result => {
      if (result) {
        this.submit()
      }
    })
  }

}
