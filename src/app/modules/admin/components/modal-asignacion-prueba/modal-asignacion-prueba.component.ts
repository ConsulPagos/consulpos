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
import { AsignacionManualDecrypter, AsignacionManualResponse } from 'src/app/models/asignacion_manual_response';
import { ConfigDecrypter } from 'src/app/models/config_response';


@Component({
  selector: 'app-modal-asignacion-prueba',
  templateUrl: './modal-asignacion-prueba.component.html',
  styleUrls: ['./modal-asignacion-prueba.component.scss']
})
export class ModalAsignacionPruebaComponent implements OnInit {

  item: any;
  default: AsignacionManualResponse;
  editSale: any = {};
  x = null;
  viejo_serial: any;
  
  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private venta: VentasService,
    private modal: ModalService,
    private pago: PagosService,

    public dialogRef: MatDialogRef<ModalAsignacionPruebaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.item = data['item']

    this.asignacion = new FormGroup({
      serial: new FormControl(this.x, [Validators.required]),
      // afiliado: new FormControl(this.item.afiliado, [Validators.required]),
    });
  }

  asignacion: FormGroup;

  ngOnInit(): void {
  }

  findPos() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.item.solicitud),
      modelos: this.crypto.encryptJson(JSON.stringify([{
        modelo: this.item.modelo,
        afiliado: this.item.afiliado,
        terminal: this.item.terminal,
        cuenta: this.item.cuenta,
        solicitud_banco_id: this.item.solicitud_banco_id,
      }]

      )),
      correctivo: this.crypto.encryptJson(this.item.correctivo),
    }))
    console.log("verify")
    // this.viejo_serial = this.item.equipo

    this.venta.doAutomaticAssingItem(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.default = new AsignacionManualDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default.items[0].cod_serial);

      this.x = (this.item.equipo == this.default.items[0])?this.default.items[1].cod_serial:this.default.items[0].cod_serial

      // if( this.item.equipo != this.viejo_serial){
      //   var x = this.default.items[0].cod_serial
      //   this.x = x
      //   console.log(this.x)
      // } else {
      //   this.x = this.item.equipo
      // }


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
      accion: this.crypto.encryptJson("ASIGNACION"),
      solicitud: this.crypto.encryptJson(this.item.solicitud),
      equipo: this.crypto.encryptJson(this.item.equipo),
      solicitud_banco_id: this.crypto.encryptJson(this.item.solicitud_banco_id),
      viejo_serial: this.crypto.encryptJson(this.item.equipo),
      nuevo_serial: this.crypto.encryptJson(this.x),

    }))
    console.log("verify")
    this.venta.actualizarPosPorTest(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
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
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      items: this.crypto.encryptJson(JSON.stringify(
        [{

          modelo: this.item.modelo,
          afiliado: this.item.afiliado,
          terminal: this.item.terminal,
          cuenta: this.item.cuenta,
          solicitud_banco_id: this.item.solicitud_banco_id,
        }]
      ))
    }))
    this.venta.liberarSim(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new ConfigDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
    })
  }
}
