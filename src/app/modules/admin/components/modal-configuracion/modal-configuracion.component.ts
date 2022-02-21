import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AsignacionResponse, AsignacionDecrypter } from 'src/app/models/asignacion_response';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
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
  default: AsignacionResponse;
  editSale: any = {};
  x = null;

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
      const item = this.dataVenta.items[index];
      this.formDinamic.push(new FormGroup({
        serial_sim: new FormControl('', [Validators.required]),
        serial_pos: new FormControl(item.cod_serial, [Validators.required]),
      }))
      console.log(this.formDinamic)
    }
  }

  findSim(sim) {
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
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(json)
      console.log(this.default)
        
      x = this.default.items[0].cod_serial
    })
    return x;
  }

  saveConfig(modelo, serial, sim) {

    const inputs = [];
    sim.forEach(sim => {
      inputs.push({
        input_id: sim.sim_serial,
      })
    })
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
      solicitud_banco_id: this.crypto.encryptJson(this.dataVenta.solicitud_banco_id),
      accion: this.crypto.encryptJson("CONFIGURACION"),

      Operaciones: this.crypto.encryptJson(JSON.stringify([
        {
          cod_serial: serial,
          terminal: this.configuracion.get('terminal').value,
          afiliado: this.configuracion.get('afiliado').value,
          modelo: modelo,
          sim_serial: this.configuracion.get(inputs),
        }
      ]))
    }))
    console.log("verify")
    this.venta.doSaveConfig(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)
        
    })
  }

}
