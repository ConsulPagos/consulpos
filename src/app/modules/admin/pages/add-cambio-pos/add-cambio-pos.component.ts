import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BancoInterface } from 'src/app/models/banco';
import { CategoriaInterface } from 'src/app/models/categoria';
import { FraccionPagoInterface } from 'src/app/models/fraccion_pago';
import { MarcaInterface } from 'src/app/models/marca';
import { ModeloInterface } from 'src/app/models/modelos';
import { OccInterface } from 'src/app/models/occ';
import { OperadoraInterface } from 'src/app/models/operadora';
import { PlanInterface } from 'src/app/models/plan';
import { PlataformaInterface } from 'src/app/models/plataforma';
import { SaleRequestInterface } from 'src/app/models/sales';
import { ShowClientsResponse, ShowClientsDecrypter } from 'src/app/models/showclients_response';
import { SimInterface } from 'src/app/models/sim';
import { TipoclienteInterface } from 'src/app/models/tipo_cliente';
import { TipoCobroInterface } from 'src/app/models/tipo_cobro';
import { ComunicacionInterface } from 'src/app/models/tipo_comunicacion';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { TipoPagoInterface } from 'src/app/models/tipo_pago';
import { TipoventaInterface } from 'src/app/models/tipo_venta';
import { ValidacionCategoriasResponse, ValidacionCategoriasDecrypter } from 'src/app/models/validacioncategoria_response';
import { ValidacionMarcaResponse, ValidacionMarcaDecrypter } from 'src/app/models/validacionmarca_response';
import { ValidacionOccResponse, ValidacionOccDecrypter } from 'src/app/models/validacionocc_response';
import { ValidacionSimResponse, ValidacionSimDecrypter } from 'src/app/models/validacionsim_response';
import { ValidacionventaRese, ValidacionventadosDecrypter } from 'src/app/models/validacionventa_res';
import { CambioPosResponse, CambioPosDecrypter } from 'src/app/models/cambiopos_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-add-cambio-pos',
  templateUrl: './add-cambio-pos.component.html',
  styleUrls: ['./add-cambio-pos.component.scss']
})
export class AddCambioPosComponent implements OnInit {

  // *** VARIABLES GLOBALES *** \\
  loading = false;
  search_client: boolean = true;
  modelos: ModeloInterface[];
  fraccion_pagos: FraccionPagoInterface[];
  validacionresponse: ShowClientsResponse;
  validacionoccresponse: ValidacionOccResponse;
  validacionsimresponse: ValidacionSimResponse;
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

  formats: SimInterface[] = [];
  formats_buy: SaleRequestInterface[] = [];

  marcaResponse: ValidacionMarcaResponse;
  marcas: MarcaInterface[];
  validacionPos: CambioPosResponse;
  categoriaResponse: ValidacionCategoriasResponse;
  categorias: CategoriaInterface[];

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
    private loader: LoaderService,
    private inventario: InventarioService,
  ) {

  }
  //****************************************************************************************//

  identity = new FormGroup({
    rif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
    tipo_doc: new FormControl('', [Validators.required]),
  });

  solicitud = new FormGroup({
    occ: new FormControl('', [Validators.required]),
    serial: new FormControl('', [Validators.required]),
  });

  sim = new FormGroup({
    operadora: new FormControl('', [Validators.required]),
  });

  document = new FormGroup({
    referencia: new FormControl('', [Validators.required]),
  });

  buy = new FormGroup({
    modelo: new FormControl('', [Validators.required]),
    modelo2: new FormControl('', [Validators.required]),
    plataforma: new FormControl('', [Validators.required]),
    banco: new FormControl('', [Validators.required]),
    numero_cuenta_pos: new FormControl('', [Validators.required, Validators.minLength(20)]),
    precio_usd: new FormControl(''),
    lugar_entrega: new FormControl(''),
    tipocobro: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
    tipo_venta: new FormControl('', [Validators.required]),
    terminal: new FormControl('', [Validators.required]),
    cod_afiliado: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required]),
  });

  //****************************************************************************************//
  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Agregar Venta')
    this.occUser()
    // this.doSimModels()
    this.marca()
    this.categoria()
    this.fraccion_pagos = JSON.parse(this.storage.get(constant.FRACCIONES_PAGO)).fracciones_pago
    this.modelos = JSON.parse(this.storage.get(constant.MODELOS)).modelos
    this.planes = JSON.parse(this.storage.get(constant.PLANES)).planes
    this.plataformas = JSON.parse(this.storage.get(constant.PLATAFORMAS)).plataformas
    this.tipocobros = JSON.parse(this.storage.get(constant.T_COBROS)).t_cobros
    this.tipo_documentos = JSON.parse(this.storage.get(constant.T_DOCS)).t_docs
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
    this.t_pagos = JSON.parse(this.storage.get(constant.T_PAGOS)).t_pagos
    this.marcas = JSON.parse(this.storage.get(constant.MARCAS)).marcas
    console.log(this.marcas)
  }

  // *** FUNCION VALIDADORA DE EXISTENCIA DE USUARIOS *** \\
  verificar_usuario() {
    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      filter: this.crypto.encryptJson(rif),
    }))
    this.loading = true;
    console.log("verify")
    this.cliente.doFind(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.validacionresponse = new ShowClientsDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionresponse)
      this.search_client = this.validacionresponse.clientes.length === 0 ? true : false;
      if (!this.search_client) {
        this.identity.controls['rif'].setErrors({ 'existe': null });
        this.identity.controls['rif'].updateValueAndValidity()
      }
      else {
        this.identity.controls['rif'].setErrors({ 'existe': true });
      }
      this.loading = false
      //this.crypto.setKeys(this.validacionresponse.keyS, this.validacionresponse.ivJ, this.validacionresponse.keyJ, this.validacionresponse.ivS)
    })
  }

  occUser() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.loader.loading()
    this.venta.doOccUser(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.validacionoccresponse = new ValidacionOccDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionoccresponse);

      this.occs = JSON.parse(this.validacionoccresponse.occ_usuarios)
      this.solicitud.get("occ").setValue(this.occs[0].occ_id)
      //this.crypto.setKeys(this.validacionoccresponse.keyS, this.validacionoccresponse.ivJ, this.validacionoccresponse.keyJ, this.validacionoccresponse.ivS)
      this.doSimModels()
    })
  }

  doSimModels() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.loader.stop()
    this.venta.doSimModels(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.validacionsimresponse = new ValidacionSimDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.operadoras = JSON.parse(this.validacionsimresponse.modelos)
      //this.crypto.setKeys(this.validacionsimresponse.keyS, this.validacionsimresponse.ivJ, this.validacionsimresponse.keyJ, this.validacionsimresponse.ivS)
    })
  }

  getMarca(id: any): void {
    this.modelos = JSON.parse(this.storage.get(constant.MODELOS)).modelos.filter(c => c.id_marca == id)
  }

  submit() {
    console.log(this.buy)
    var solicitudes_banco_sell: any = [];
    var items: any = [];
    var serial_sim
    for (let index = 0; index < this.validacionPos.item.sim.length; index++) {
      const c = this.validacionPos.item.sim[index];
      serial_sim = c.cod_serial
      items.push({
        modelo_id: this.buy.get('modelo2').value,
        sim_id: c.modelo_id,
        monto: "150",
      })
    }

    solicitudes_banco_sell.push({
      id_t_cobro: this.buy.get('tipocobro').value,
      monto_cuota: "30",
      fraccion_pago_id: "1",
      plan_id: this.buy.get('plan').value,
      modelo_id: this.buy.get('modelo').value,
      terminal: this.buy.get('terminal').value,
      afiliado: this.buy.get('cod_afiliado').value,
      cuenta: this.buy.get('numero_cuenta_pos').value,
      banco_id: this.buy.get('banco').value,
      items: JSON.stringify(items),
    })

    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.identity.get('tipo_doc').value + this.identity.get('rif').value),
      cod_serial: this.crypto.encryptJson(this.solicitud.get('serial').value),
      modelo: this.crypto.encryptJson(this.buy.get('modelo2').value),
      sim_serial: this.crypto.encryptJson(serial_sim),
      solicitud: this.crypto.encryptJson(JSON.stringify(
        {
          occ_id: this.solicitud.get('occ').value,
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
    console.log("verify")
    console.log(solicitudes_banco_sell)
    this.venta.doCambioDeEquipo(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionres = new ValidacionventadosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionres)
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

  marca() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.inventario.doListMarcas(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.marcaResponse = new ValidacionMarcaDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.marcas = JSON.parse(this.marcaResponse.marcas)
    })
  }

  categoria() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.inventario.doListCategorias(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.categoriaResponse = new ValidacionCategoriasDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.categorias = JSON.parse(this.categoriaResponse.categorias)
    })
  }

  save() {
    this.modal.confirm("Desea confirmar el registro de la venta").subscribe(result => {
      if (result) {
        this.submit()
      }
    })
  }


  buscarPos() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      cod_serial: this.crypto.encryptJson(this.solicitud.get('serial').value),
    }))
    this.venta.informacionDeEquipo(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionPos = new CambioPosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionPos)
      console.log(this.validacionPos.item.sim)
      this.buy.get('modelo').setValue(this.validacionPos.item.modelo_id)
      this.buy.get('plataforma').setValue(this.validacionPos.item.id_plataforma)
      this.buy.get('plan').setValue(this.validacionPos.item.plan_id)
      this.buy.get('tipocobro').setValue(this.validacionPos.item.id_t_cobro)
      this.buy.get('banco').setValue(this.validacionPos.item.codigo)
      this.buy.get('numero_cuenta_pos').setValue(this.validacionPos.item.cuenta)
      this.buy.get('cod_afiliado').setValue(this.validacionPos.item.afiliado)
      this.buy.get('terminal').setValue(this.validacionPos.item.terminal)
    })
  }

}
