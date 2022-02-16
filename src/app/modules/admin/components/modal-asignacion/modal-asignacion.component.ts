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
      afiliado: new FormControl(this.dataVenta.afiliado, [Validators.required]),
    });
  }

  asignacion: FormGroup;

  ngOnInit(): void {
  }

  findPos(modelo) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      modelo: this.crypto.encryptJson(modelo),
    }))

    console.log("verify")
    this.venta.doFindPos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(json)
      console.log(this.default)
      this.crypto.setKeys(this.default.keyS, this.default.ivJ, this.default.keyJ, this.default.ivS)
      var x = this.default.item.cod_serial
      this.x = x
      console.log(this.x)
    })
  }

  saveConfig(modelo) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id:this.crypto.encryptJson(this.dataVenta.number),
      solicitud_banco_id:this.crypto.encryptJson(this.dataVenta.solicitud_banco_id),
      accion: this.crypto.encryptJson("ASIGNACION"),

      Operaciones:this.crypto.encryptJson(JSON.stringify([
        {
          cod_serial: this.asignacion.get('serial').value,
          terminal:"",
          afiliado:this.asignacion.get('afiliado').value,
          modelo: modelo,
        }
      ]))
    }))
    console.log("verify")
    this.venta.doSaveConfig(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)
      this.crypto.setKeys(this.default.keyS, this.default.ivJ, this.default.keyJ, this.default.ivS)
    })
  }

}
