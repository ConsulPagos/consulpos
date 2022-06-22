import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { AsignacionDecrypter, AsignacionResponse } from 'src/app/models/asignacion_response';
import { ConfigDecrypter } from 'src/app/models/config_response';


@Component({
  selector: 'app-modal-asignacion',
  templateUrl: './modal-asignacion.component.html',
  styleUrls: ['./modal-asignacion.component.scss']
})
export class ModalAsignacionComponent implements OnInit {

  dataVenta: any;
  default: AsignacionResponse;
  editSale: any = {};
  x = null;

  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private venta: VentasService,
    private modal: ModalService,
    private pago: PagosService,

    public dialogRef: MatDialogRef<ModalAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.dataVenta = data['venta']

    this.asignacion = new FormGroup({
      serial: new FormControl(this.x, [Validators.required]),
      // afiliado: new FormControl(this.dataVenta.afiliado, [Validators.required]),
    });
  }

  asignacion: FormGroup;

  ngOnInit(): void {
  }

  findPos() {
    const modelos = [];
    this.dataVenta.modelos.forEach(m => {
      modelos.push(
        {
          modelo: m.caracteristicas[0].modelo,
          // solicitud_banco: m.caracteristicas[0].solicitud_banco,
          afiliado:m.caracteristicas[0].solicitud_banco.afiliado,
          terminal:m.caracteristicas[0].solicitud_banco.terminal,
          cuenta:m.caracteristicas[0].solicitud_banco.cuenta,
          solicitud_banco_id:m.caracteristicas[0].solicitud_banco.solicitud_banco_id,
        }
      )
    });
    console.log(modelos)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
      modelos: this.crypto.encryptJson(JSON.stringify(
        modelos
      )),
      correctivo: this.crypto.encryptJson(this.dataVenta.correctivo),
    }))
        console.log("verify")
    this.venta.doAutomaticAssingItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      var x = this.default.items[0].cod_serial
      this.x = x
      console.log(this.x)
    })
  }

  save() {
    this.modal.confirm("Se le asignaro seriales a los equipos").subscribe(result => {
      if (result) {
        this.saveAsignacion()
      }
    })
  }

  saveAsignacion() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
      accion: this.crypto.encryptJson("ASIGNACION"),
    }))
    console.log("verify")
    this.venta.doEndAssingItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      switch (this.default.R) {
        case constant.R0:
          this.toaster.success(this.default.M)
          this.router.navigateByUrl('/admin/app/(adr:operaciones/asignacion)')
          break;
        case constant.R1:
          this.toaster.error(this.default.M)
          break;
      }
      console.log(this.default)

    })
  }

  
  liberarSim() {
    const inputs = [];
    this.dataVenta.modelos.forEach(f => {
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

}
