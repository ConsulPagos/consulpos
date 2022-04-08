import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { ModeloInterface } from 'src/app/models/modelos';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-add-pedidos',
  templateUrl: './add-pedidos.component.html',
  styleUrls: ['./add-pedidos.component.scss']
})
export class AddPedidosComponent implements OnInit {


  loading = false;
  defaultResponse: DefaultResponse;
  currentYear = new Date();
  modelos: ModeloInterface[];
  provedores: any[];
  formats_model: any[] = [];
  models = [];

  pipe = new DatePipe('en-US')

  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService
  ) { }


  ngOnInit(): void {
    this.add_model()
    this.modelos = JSON.parse(this.storage.get(constant.MODELOS)).modelos
    this.provedores = JSON.parse(this.storage.get(constant.PROVEEDORES)).proveedores
  }

  form = new FormGroup({
    fecha_pedido: new FormControl('', [Validators.required]),
    proveedor: new FormControl('', [Validators.required]),
    num_order: new FormControl('', [Validators.required]),
    num_factura: new FormControl('', [Validators.required]),
  });

  model = new FormGroup({
    cantidad: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
  });

  clear() {
    this.form.reset();
    this.model.reset();
  }

  save() {
    this.modal.confirm("Se agregara una nueva marca").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  add_model() {
    var newFormat: any = {};
    var modelo = new FormGroup({
      cantidad: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
    });
    this.models.push(modelo);
    this.formats_model.push(newFormat);
  }

  deleteModel(index: number) {
    this.formats_model.splice(index, 1);
    this.models.splice(index, 1);
  }

  submit() {

    var modelos: any = {};
    var items = [];

    for (let index = 0; index < this.models.length; index++) {
      const a = this.models[index];
      items.push({
        modelo_id: a.get("modelo").value,
        total: a.get("cantidad").value,
      })
    }

    modelos = {
      modelos: JSON.stringify(items),
    }

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      fecha: this.crypto.encryptJson(this.pipe.transform(this.form.get('fecha_pedido').value, 'yyyy-MM-dd')),
      proveedor_id: this.crypto.encryptJson(this.form.get('proveedor').value),
      numero_orden: this.crypto.encryptJson(this.form.get('num_order').value),
      numero_factura: this.crypto.encryptJson(this.form.get('num_factura').value),
      modelos: this.crypto.encryptJson(JSON.stringify(
        items
      )),
    }))


    this.loading = true;
    console.log("verify")
    this.inventario.doCrearPedido(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          this.router.navigateByUrl('/admin/app/(adr:pedidos)')
          break;
        case constant.R1:
          this.toaster.error(this.defaultResponse.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }

}
