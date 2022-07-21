import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoriaInterface } from 'src/app/models/categoria';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { MarcaInterface } from 'src/app/models/marca';
import { ModeloInterface } from 'src/app/models/modelos';
import { ValidacionCategoriasResponse, ValidacionCategoriasDecrypter } from 'src/app/models/validacioncategoria_response';
import { ValidacionMarcaResponse, ValidacionMarcaDecrypter } from 'src/app/models/validacionmarca_response';
import { ValidacionPedidosResponse, ValidacionPedidosDecrypter } from 'src/app/models/validacionpedidos_response';
import { CargaInventarioDecrypter, CargaInventarioResponse } from 'src/app/models/cargainventario_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-cargar-inventario',
  templateUrl: './cargar-inventario.component.html',
  styleUrls: ['./cargar-inventario.component.scss']
})
export class CargarInventarioComponent implements OnInit {

  loading = false;
  cargaResponse: CargaInventarioResponse;
  defaultResponse: DefaultResponse;
  categoriaResponse: ValidacionCategoriasResponse;
  categorias: CategoriaInterface[];
  marcaResponse: ValidacionMarcaResponse;
  marcas: MarcaInterface[];
  modelos: ModeloInterface[];
  almacenes: any[];
  provedores: any[];
  pedidosResponse: ValidacionPedidosResponse;
  pedidos: any[];
  seriales = [];

  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService,
    private ventas: VentasService,
  ) { }

  ngOnInit(): void {
    this.categoria();
    this.marca();
    this.pedido();
    this.modelos = JSON.parse(this.storage.get(constant.MODELOS)).modelos
    this.provedores = JSON.parse(this.storage.get(constant.PROVEEDORES)).proveedores
    this.almacenes = JSON.parse(this.storage.get(constant.ALMACENES)).almacenes
  }

  form = new FormGroup({
    modelo: new FormControl('', [Validators.required]),
    proveedor: new FormControl('', [Validators.required]),
    pedido: new FormControl('', [Validators.required]),
    caja: new FormControl('', [Validators.required]),
  });

  serialForm = new FormGroup({
    serial: new FormControl(''),
  });

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

  pedido() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.inventario.doPedidosAbiertos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(res)
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.pedidosResponse = new ValidacionPedidosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.pedidosResponse)
      this.pedidos = JSON.parse(this.pedidosResponse.pedidos)
    })
  }

  getMarca(id: any): void {
    this.modelos = JSON.parse(this.storage.get(constant.MODELOS)).modelos.filter(c => c.id_marca == id)
  }

  onlyCaracteres(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null :
      event.charCode >= 48 && event.charCode <= 57 ||
      event.charCode >= 64 && event.charCode <= 90 ||
      event.charCode >= 97 && event.charCode <= 122 || event.charCode == 241 ||
      event.charCode == 209;
  }

  cargarSerial(serial: string) {
    console.log(serial)
    if (this.seriales.indexOf(serial) == -1 && serial.trim().length > 0) {

      const data = this.crypto.encryptString(JSON.stringify({
        u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
        correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
        scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
        cod_serial: this.crypto.encryptJson(this.serialForm.get('serial').value),
      }))
      this.inventario.doCoprobarSerialItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
        this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
        switch (this.defaultResponse.R) {
          case constant.R0:
            this.seriales.push(serial)
            this.serialForm.reset()
            this.toaster.success(this.defaultResponse.M)
            break;
          case constant.R1:
            this.toaster.error(this.defaultResponse.M)
            break;
          default:
            this.toaster.default_error()
            break;
        }
      })
    } else {
      this.serialForm.reset()
      this.toaster.error('Serial ya registrado o nulo')
    }
  }


  deleteSerial(serial) {
    this.seriales.splice(this.seriales.indexOf(serial), 1)
  }

  clear() {
    this.form.reset();
  }

  clearinputs() {
    this.form.get('proveedor').reset();
    this.form.get('pedido').reset();
    this.seriales = [];
  }


  save() {
    this.modal.confirm("Se agregara los items al inventario").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      items: this.crypto.encryptJson(JSON.stringify(this.seriales)),
      pedido_id: this.crypto.encryptJson(this.form.get('pedido').value),
      caja: this.crypto.encryptJson(this.form.get('caja').value),
      modelo_id: this.crypto.encryptJson(this.form.get('modelo').value),
    }))
    console.log(this.seriales)
    this.loading = true;
    console.log("verify")
    this.inventario.doCargarInventarioDePos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.cargaResponse = new CargaInventarioDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.cargaResponse)
      switch (this.cargaResponse.R) {
        case constant.R0:
          this.toaster.success(this.cargaResponse.M)
          this.router.navigateByUrl('/admin/app/(adr:inventario)')
          break;
        case constant.R1:
          this.toaster.error(this.cargaResponse.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }



}
