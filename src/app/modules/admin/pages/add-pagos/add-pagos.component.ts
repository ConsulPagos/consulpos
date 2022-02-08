import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TasaInterface } from 'src/app/models/tasa';
import { PagosResponse, PagosDecrypter } from 'src/app/models/pagos_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { constant } from 'src/app/shared/utils/constant';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { BancarioService } from 'src/app/shared/services/bancario.service';

@Component({
  selector: 'app-add-pagos',
  templateUrl: './add-pagos.component.html',
  styleUrls: ['./add-pagos.component.scss']
})
export class AddPagosComponent implements OnInit {

  total: number;
  t_pagos: any[];
  default: PagosResponse;
  addPay: any = {};
  loading: boolean;
  payments = [];
  formats_payments: any[] = [];
  formats: any[] = [];
  formDinamic = [];
  tasas: any[];
  tasa: TasaInterface[];

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private venta: VentasService,
    private modal: ModalService,
    private pago: PagosService,
    private loader: LoaderService,
    private bancario: BancarioService,

  ) {
    if (this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.addPay) {
      this.addPay = this.router.getCurrentNavigation().extras.state.addPay as any;
    } else {
      this.router.navigateByUrl("/admin/app/(adr:pagos)");
    }
  }

  pay = new FormGroup({
    t_pago: new FormControl(null, [Validators.required]),
    monto: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
  });

  formtasa = new FormGroup({
    dollar: new FormControl('', [Validators.required]),
    // euro: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.tipoPagos()
    this.add_pay()
  }

  add_pay() {
    var newFormat: any = {};
    var pay = new FormGroup({
      t_pago: new FormControl(null, [Validators.required]),
      monto: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(''),
    });
    this.payments.push(pay);
    this.formats_payments.push(newFormat);
  }

  deletePay(index: number) {
    this.formats_payments.splice(index, 1);
    this.payments.splice(index, 1);
  }

  buildFormGroup(car: any[], i: number) {
    this.formDinamic[i] = new FormGroup({})
    car.forEach(c => {
      this.formDinamic[i].addControl(c.id_caracteristica, new FormControl('', [Validators.required]))
    })
  }

  getMonto() {
    var totalPago = 0;
    this.payments.forEach(m => {
      if (m.get('monto') && m.get('monto').value != null) {
        totalPago += parseFloat(m.get('monto').value)
        console.log(totalPago)
      }
    })
    return this.total - totalPago
  }


  tipoPagos() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.addPay.number),
    }))
    this.loader.loading()
    this.pago.doPaymentInput(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.loader.stop()
      const json = JSON.parse(this.crypto.decryptString(res))
      this.total = JSON.parse(this.crypto.decryptJson(json.total))
      this.t_pagos = JSON.parse(this.crypto.decryptJson(json.t_pagos))
      this.default = new PagosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)
      this.t_pagos = JSON.parse(this.default.t_pagos)
      console.log(this.t_pagos)
      this.crypto.setKeys(this.default.keyS, this.default.ivJ, this.default.keyJ, this.default.ivS)
      this.getTasas()
    })
  }

  getInput(id: string) {
    return this.t_pagos.filter(p => p.t_pago_id == id)[0].inputs
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  isInvalid() {
    var invalid = false;
    for (let index = 0; index < this.payments.length; index++) {
      const m = this.payments[index];
      const d = this.formDinamic[index];
      if (m.invalid || d.invalid) {
        invalid = true;
        break;
      }
    }
    return invalid
  }

  // isTypePay(){
  //   return this.t_pagos.filter(m => m.cod_moneda == )
  // }

  submit(caracteristicas: any[]) {
    const inputs = [];
    caracteristicas.forEach(c => {
      inputs.push({
        input_id: c.id_caracteristica,
      })
    })
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.addPay.number),
      t_pago_id: this.crypto.encryptJson(this.pay.get('t_pago').value),
      monto: this.crypto.encryptJson(this.pay.get('monto').value),
      descripcion: this.crypto.encryptJson(this.pay.get('descripcion').value),
      caracteristicas: this.crypto.encryptJson(JSON.stringify(inputs)),
    }))

    this.loading = true;
    console.log("verify")
    this.loader.loading()
    this.pago.doSavePayment(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.default = new PagosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)
      this.loader.stop()
      this.crypto.setKeys(this.default.keyS, this.default.ivJ, this.default.keyJ, this.default.ivS)
      switch (this.default.R) {
        case constant.R0:
          this.toaster.success(this.default.M)
          this.router.navigateByUrl('/admin/app/(adr:dashboard)')
          break;
        case constant.R1:
          this.toaster.error(this.default.M)
          break;
      }

    })
  }

  save(caracteristicas) {
    this.modal.confirm("Desea agregar este pago a la venta").subscribe(result => {
      if (result) {
        this.submit(caracteristicas)
      }
    })
  }

  deleteimg() {

  }

  getTasas() {
    var data: {} = {
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      tipo: this.crypto.encryptJson("2"), //Tasa de venta 1-Cobranza; 2-Venta; nada todas
    }
    const dataString = this.crypto.encryptString(JSON.stringify(data));
    this.loader.loading();
    this.bancario.doGetTasas(`${this.session.getDeviceId()};${dataString}`).subscribe(res => {
      this.loader.stop();
      const json = JSON.parse(this.crypto.decryptString(res));
      const response = new DefaultDecrypter(this.crypto).deserialize(json);
      console.log(json)
      switch (json.R) {
        case constant.R0:
          this.tasas = JSON.parse(this.crypto.decryptJson(json.tasas));
          console.log(this.tasas)
          break;
        case constant.R1:
        default:
          this.toaster.error(response.M)
          break;
      }
      this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
    })
  }



}
