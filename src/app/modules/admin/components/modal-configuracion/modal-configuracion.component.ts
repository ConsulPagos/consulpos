import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfiguracionResponse, ConfiguracionDecrypter } from 'src/app/models/configuracion_response';
import { ConfigDecrypter } from 'src/app/models/config_response';
import { OperadoraInterface } from 'src/app/models/operadora';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-modal-configuracion',
  templateUrl: './modal-configuracion.component.html',
  styleUrls: ['./modal-configuracion.component.scss']
})
export class ModalConfiguracionComponent implements OnInit {

  dataVenta: any;
  default: ConfiguracionResponse;
  editSale: any = {};
  x = null;
  modelo: any;
  serial: any;
  sim: any;

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
        const c = item.caracteristicas[z];
        const d = this.dataVenta.items.filter(i => i.solicitud_banco.solicitud_banco_id == c.solicitud_banco.solicitud_banco_id)[0];
        this.formDinamic.push(new FormGroup({
          sim_serial: new FormControl(null, [Validators.required]),
          solicitud_banco_id: new FormControl(c.solicitud_banco.solicitud_banco_id),
          cod_serial: new FormControl(d.cod_serial),
        }))
      }
    }
  }

  findSim(sim: string, form: FormGroup) {
    console.log(sim)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      modelo: this.crypto.encryptJson(sim),
    }))
    var x;
    this.venta.doFindSim(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new ConfiguracionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      form.get("sim_serial").setValue(this.default.item.cod_serial)
      x = this.default.item.cod_serial
      console.log(x)
    })
  }

  liberarSim() {
    const inputs = [];
    this.formDinamic.forEach(f => {
      inputs.push(f.value)
    })
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      items: this.crypto.encryptJson(JSON.stringify(inputs))
    }))
    this.venta.liberarSim(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new ConfigDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
    })
  }

  saveConfig() {
    const inputs = [];
    this.formDinamic.forEach(f => {
      inputs.push(f.value)
    })
    console.log('MARAVILLA')
    console.log(this.formDinamic)
    console.log(inputs)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
      solicitud_banco_id: this.crypto.encryptJson(this.dataVenta.solicitud_banco_id),
      accion: this.crypto.encryptJson("CONFIGURACION"),
      Operaciones: this.crypto.encryptJson(JSON.stringify(
        inputs
      ))
    }))
    this.venta.doSaveConfig(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new ConfigDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
    })
    this.end()
  }



  end() {
    console.log()
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
      accion: this.crypto.encryptJson("CONFIGURACION"),
    }))
    this.venta.doEndAssingItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new ConfigDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      // switch (this.default.R) {
      //   case constant.R0:
      //     this.toaster.success(this.default.M)
      //     break;
      //   case constant.R1:
      //     this.toaster.error(this.default.M)
      //     break;
      // }
    })
  }

}
