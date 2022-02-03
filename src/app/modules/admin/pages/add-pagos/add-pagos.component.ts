import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TipoPagoInterface } from 'src/app/models/tipo_pago';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-add-pagos',
  templateUrl: './add-pagos.component.html',
  styleUrls: ['./add-pagos.component.scss']
})
export class AddPagosComponent implements OnInit {

  // t_pagos: TipoPagoInterface[];
  t_pagos: any[];
  default: DefaultResponse;
  addPay: any = {};
  loading: boolean;


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


  carForm: FormGroup;

  ngOnInit(): void {
    this.tipoPagos()


  }

  buildFormGroup(car: any[]) {
    console.log(car)

    this.carForm = new FormGroup({});
    car.forEach(c => {
      this.carForm.addControl(c.id_caracteristica, new FormControl('', [Validators.required]))
    })

  }

  tipoPagos() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.pago.doPaymentInput(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.t_pagos = JSON.parse(this.crypto.decryptJson(json.t_pagos))
      this.default = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.t_pagos = JSON.parse(this.default.t_pagos)
      this.crypto.setKeys(this.default.keyS, this.default.ivJ, this.default.keyJ, this.default.ivS)
    })
  }

  getInput(t_pago_id: string) {
    return this.t_pagos.filter(p =>
      p.t_pago_id == t_pago_id
    )
    [0].inputs
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  submit(caracteristicas: any[]) {
    const inputs = [];
    caracteristicas.forEach(c => {
      inputs.push({
        input_id: c.id_caracteristica,
        input: this.carForm.get(c.id_caracteristica).value,
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
    this.pago.doSavePayment(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.default = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)
      this.loading = false
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



}
