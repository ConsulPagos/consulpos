import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfiguracionResponse, ConfiguracionDecrypter } from 'src/app/models/configuracion_response';
import { ConfigDecrypter } from 'src/app/models/config_response';
import { OperadoraInterface } from 'src/app/models/operadora';
import { ValidacionSimDecrypter, ValidacionSimResponse } from 'src/app/models/validacionsim_response';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { ModalConfiguracionComponent } from '../modal-configuracion/modal-configuracion.component';

@Component({
  selector: 'app-modal-configuracion-manual',
  templateUrl: './modal-configuracion-manual.component.html',
  styleUrls: ['./modal-configuracion-manual.component.scss']
})
export class ModalConfiguracionManualComponent implements OnInit {

  dataVenta: any;
  default: ConfiguracionResponse;
  editSale: any = {};
  x = null;
  modelo: any;
  serial: any;
  sim: any;

  operadoras: OperadoraInterface[];
  validacionsimresponse: ValidacionSimResponse;

  formDinamic = [];

  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private venta: VentasService,
    private modal: ModalService,
    private pago: PagosService,

    public dialogRef: MatDialogRef<ModalConfiguracionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dataVenta = data['venta']

    this.configuracion = new FormGroup({
      serial_sim: new FormControl(this.x, [Validators.required]),
      operadora: new FormControl('', [Validators.required]),
    });
  }

  configuracion: FormGroup;

  simFormGroup(sim: any[], i: number) {
    this.formDinamic[i] = new FormGroup({})
    sim.forEach(sim => {
      this.formDinamic[i].addControl(sim.sim_serial, new FormControl('', [Validators.required]))
    })
  }

  ngOnInit(): void {
    for (let index = 0; index < this.dataVenta.modelos.length; index++) {
      const item = this.dataVenta.modelos[index];
      console.log(item)
      for (let z = 0; z < item.caracteristicas.length; z++) {
        this.formDinamic.push(new FormGroup({
          serial_sim: new FormControl(null, [Validators.required]),
          operadora: new FormControl('', [Validators.required]),
        }))
      }

      console.log(this.formDinamic)
    }
    this.doSimModels()
  }

  findSim(sim: string, form: FormGroup) {
    console.log(sim)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      modelo: this.crypto.encryptJson(form.get('operadora').value),
    }))
    console.log(form.value)
    var x;
    this.venta.doFindSim(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.crypto.decryptString(res))
      console.log(res)
      this.default = new ConfiguracionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(json)
      console.log(this.default)
      form.get("serial_sim").setValue(this.default.item.cod_serial)
      x = this.default.item.cod_serial
      console.log(x)
    })
  }

  doSimModels() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.venta.doSimModels(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.validacionsimresponse = new ValidacionSimDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.operadoras = JSON.parse(this.validacionsimresponse.modelos)
    })
  }

  saveConfig(modelo, serial) {

    const inputs = [];

    this.formDinamic.forEach(f => {
      inputs.push({
        input_id: f.get('serial_sim').value,
      })
    })
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
      solicitud_banco_id: this.crypto.encryptJson(this.dataVenta.solicitud_banco_id),
      cod_serial: this.crypto.encryptJson(serial),
      items: this.crypto.encryptJson(JSON.stringify([
        {
          sim_serial: this.configuracion.get(inputs),
          cod_serial: serial,
        }
      ]))
    }))
    console.log("verify")
    this.venta.configuracionManual(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log('UBUIIIIII')
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.default = new ConfigDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)

    })
  }


}
