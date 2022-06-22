import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BancoInterface } from 'src/app/models/banco';
import { DefaultResponse, DefaultDecrypter } from 'src/app/models/default_response';
import { FraccionPagoInterface } from 'src/app/models/fraccion_pago';
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
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss']
})
export class AddPlanComponent implements OnInit {


  loading = false;
  defaultResponse: DefaultResponse;
  bancos: BancoInterface[];
  modelos: ModeloInterface[];
  fraccion_pagos: FraccionPagoInterface[];

  cuotas = [];
  formats_cuotas: any[] = [];

  constructor(
    private title: Title,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService
    
  ) { }


  ngOnInit(): void {
    this.add_cuota()
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
    this.modelos = JSON.parse(this.storage.get(constant.MODELOS)).modelos
    this.fraccion_pagos = JSON.parse(this.storage.get(constant.FRACCIONES_PAGO)).fracciones_pago
  }

  form = new FormGroup({
    banco: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    tipo_venta: new FormControl('', [Validators.required]),
  });

  clear() {
    this.form.reset();
  }

  add_cuota() {
    var newFormat: any = {};
    var cuota = new FormGroup({
      days: new FormControl('', [Validators.required]),
      porcentaje: new FormControl('', [Validators.required]),

    });
    this.cuotas.push(cuota);
    this.formats_cuotas.push(newFormat);
  }

  deleteCuota(index: number) {
    this.formats_cuotas.splice(index, 1);
    this.cuotas.splice(index, 1);
  }

  save() {
    this.modal.confirm("Se agregara un plan").subscribe(result => {
      if (result) {
        console.log("acciones")
        this.submit()
      }
    })
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  submit() {
    var cuota: any = [];

    for (let index = 0; index < this.cuotas.length; index++) {
      const c = this.cuotas[index];
      cuota.push({
        cuota: index + 1,
        porcentaje: c.get('porcentaje').value,
        dias_pago: c.get('days').value,
        banco: this.form.get('banco').value,
        modelo_id: this.form.get('modelo').value,
        fraccion_pago_id: this.form.get('tipo_venta').value,
      })
    }

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      banco: this.crypto.encryptJson(this.form.get('banco').value),
      modelo_id: this.crypto.encryptJson(this.form.get('modelo').value),
      fraccion_pago_id: this.crypto.encryptJson(this.form.get('tipo_venta').value),
      cuotas: this.crypto.encryptJson(JSON.stringify(
        cuota
      )),
    }))

    this.loading = true;
    console.log("verify")
    this.inventario.saveConfPrecio(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(data)
      console.log(res)
      console.log(this.crypto.decryptString(res))
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.defaultResponse)
      // this.loading = false
      //this.crypto.setKeys(this.defaultResponse.keyS, this.defaultResponse.ivJ, this.defaultResponse.keyJ, this.defaultResponse.ivS)

      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          this.router.navigateByUrl('/admin/app/(adr:plan)')
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

  buiesInvalid() {
    var invalid = false;

    for (let index = 0; index < this.cuotas.length; index++) {
      if (this.cuotas[index].invalid) {
        invalid = true
        break;
      }
    }

    return invalid


  }


}
