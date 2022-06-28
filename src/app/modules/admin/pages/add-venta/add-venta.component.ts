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
import { TipoBancoInterface, TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { ValidacionOccDecrypter, ValidacionOccResponse } from '../../../../models/validacionocc_response';
import { ValidacionSimDecrypter, ValidacionSimResponse } from '../../../../models/validacionsim_response';
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
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ShowClientsDecrypter, ShowClientsResponse } from 'src/app/models/showclients_response';
import { MarcaInterface } from 'src/app/models/marca';
import { CategoriaInterface } from 'src/app/models/categoria';
import { ValidacionCategoriasDecrypter, ValidacionCategoriasResponse } from 'src/app/models/validacioncategoria_response';
import { ValidacionMarcaDecrypter, ValidacionMarcaResponse } from 'src/app/models/validacionmarca_response';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { ArchiveService } from 'src/app/shared/services/archive.service';
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
  validacionresponse: ShowClientsResponse;
  validacionoccresponse: ValidacionOccResponse;
  validacionsimresponse: ValidacionSimResponse;
  validacionres: ValidacionventaRese;
  tipos_clientes: TipoclienteInterface[];
  plataformas: PlataformaInterface[];
  bancos: BancoInterface[];

  bancos_fraccion: TipoBancoInterface[];
  fraccion_pago: any[];
  default: DefaultResponse;
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

  marcaResponse: ValidacionMarcaResponse;
  marcas: MarcaInterface[];

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
    private archivo: ArchiveService,
  ) {

  }
  //****************************************************************************************//

  identity = new FormGroup({
    rif: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
    tipo_doc: new FormControl('', [Validators.required]),
  });

  solicitud = new FormGroup({
    occ: new FormControl('', [Validators.required]),
    plan: new FormControl('', [Validators.required]),
    tipocobro: new FormControl('', [Validators.required]),
    banco: new FormControl('', [Validators.required]),
    tipo_venta: new FormControl('', [Validators.required]),
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
    // this.doSimModels()
    this.add_buy()
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
    this.bancos_fraccion = JSON.parse(this.storage.get(constant.BANCOS_FRACCION)).bancos
    console.log("Banco francciomn")
    console.log(this.bancos_fraccion)
  }

  add_buy() {
    var newFormat: SaleRequestInterface = {};
    var buy = new FormGroup({
      modelo: new FormControl('', [Validators.required]),
      numero_cuenta_pos: new FormControl('', [Validators.required, Validators.minLength(20)]),
      precio_usd: new FormControl(''),
      lugar_entrega: new FormControl(''),
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
    console.log(this.formats_buy)
    var solicitudes_banco_sell: any = [];
    for (let index = 0; index < this.buies.length; index++) {
      const buy = this.buies[index];
      var items = [];
      const f = this.formats_buy[index];
      f.sims.forEach(sim => {
        items.push({
          sim_id: sim.get("operadora").value,
          modelo_id: buy.get("modelo").value,
        })
      })
      solicitudes_banco_sell.push({
        id_t_cobro: this.solicitud.get('tipocobro').value,
        monto_cuota: "30",
        fraccion_pago_id: this.solicitud.get('tipo_venta').value,
        plan_id: this.solicitud.get('plan').value,
        modelo_id: buy.get('modelo').value,
        terminal: buy.get('terminal').value,
        afiliado: buy.get('cod_afiliado').value,
        cuenta: buy.get('numero_cuenta_pos').value,
        banco_id: this.solicitud.get('banco').value,
        items: JSON.stringify(items),
      })
    }
    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.identity.get('tipo_doc').value + this.identity.get('rif').value),
      solicitud: this.crypto.encryptJson(JSON.stringify(
        {
          occ_id: this.solicitud.get('occ').value,
          // t_sol_id: "1",
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
    this.venta.doSale(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.validacionres = new ValidacionventadosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.validacionres)
      //this.crypto.setKeys(this.validacionres.keyS, this.validacionres.ivJ, this.validacionres.keyJ, this.validacionres.ivS)
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

  total_price() {
    var total = 0;
    this.buies.forEach(buies => {
      if (this.modelos.filter(it => it.id == buies.get("modelo").value).length > 0) {
        total += parseFloat(this.modelos.filter(it => it.id == buies.get("modelo").value)[0].precio)
      }
    })
    return total
  }

  getFraccion(): void {
    console.log("ajaa", this.bancos_fraccion.filter(c => c.codigo == this.solicitud.get('banco').value)[0]);
    
    this.fraccion_pago = this.bancos_fraccion.filter(c => c.codigo == this.solicitud.get('banco').value)[0].fraccion_pago
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

  buiesInvalid() {
    var invalid = false;
    for (let index = 0; index < this.buies.length; index++) {
      if (this.buies[index].invalid) {
        invalid = true
        break;
      }
    }
    return invalid
  }

  upload(d: any, id: string) {
    var rif = this.identity.get('tipo_doc').value + this.identity.get('rif').value;
    const encode = d.file.toString()
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      att_by: this.crypto.encryptJson("CLIENTE"),
      rif: this.crypto.encryptJson(rif),
      documento: this.crypto.encryptJson(id),
      extension: this.crypto.encryptJson(d.ext),
      t_sol_id: this.crypto.encryptJson(null),
      solicitud: this.crypto.encryptJson(null),
      file: this.crypto.encryptJson(encode),
    }))
    this.archivo.saveAttached(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.default = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default);
    })
  }

}
