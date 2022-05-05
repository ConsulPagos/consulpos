import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsignacionDecrypter, AsignacionResponse } from 'src/app/models/asignacion_response';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-modal-asignacion-manual',
  templateUrl: './modal-asignacion-manual.component.html',
  styleUrls: ['./modal-asignacion-manual.component.scss']
})
export class ModalAsignacionManualComponent implements OnInit {

  default: AsignacionResponse;
  dataVenta: any;
  a: any;

  constructor(
    private modal: ModalService,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private venta: VentasService,

    public dialogRef: MatDialogRef<ModalAsignacionManualComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dataVenta = data['venta']
  }

  ngOnInit(): void {
    
    for (let index = 0; index < this.dataVenta.modelos.length; index++) {
      const item = this.dataVenta.modelos[index];
      for (let z = 0; z < item.caracteristicas.length; z++) {
        const c = item.caracteristicas[z];
          this.a = c.solicitud_banco.solicitud_banco_id
      }
    }
  }

  form = new FormGroup({
    serial: new FormControl('', [Validators.required]),
  });


  saveAsignacionManual() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
      cod_serial: this.crypto.encryptJson(this.form.get('serial').value),
      solicitud_banco_id: this.crypto.encryptJson(this.a),
    }))
    console.log("verify")
    this.venta.asignacionManual(`${this.session.getDeviceId()};${data}`).subscribe(res => {
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

}
