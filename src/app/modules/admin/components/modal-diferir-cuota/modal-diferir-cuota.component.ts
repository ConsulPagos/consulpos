import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AsignacionDecrypter } from 'src/app/models/asignacion_response';
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

@Component({
  selector: 'app-modal-diferir-cuota',
  templateUrl: './modal-diferir-cuota.component.html',
  styleUrls: ['./modal-diferir-cuota.component.scss']
})
export class ModalDiferirCuotaComponent implements OnInit {

  dataDiferir: any;
  default: DefaultResponse

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

    public dialogRef: MatDialogRef<ModalDiferirCuotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.dataDiferir = data['venta']
    console.log(this.dataDiferir);


  }

  ngOnInit(): void {

  }


  saveConfig() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_banco_id: this.crypto.encryptJson(this.dataDiferir.solicitud_banco_id),
      id: this.crypto.encryptJson(this.dataDiferir.id),
      monto: this.crypto.encryptJson(this.dataDiferir.total),
      fraccion_pago_id: this.crypto.encryptJson(this.dataDiferir.fraccion_pago_id),
    }))
    console.log("verify")
    this.pago.diferirCuota(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)
    })
  }
}
