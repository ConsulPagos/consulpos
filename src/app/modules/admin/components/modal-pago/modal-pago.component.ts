import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ValidarPagosDecrypter, ValidarPagosResponse } from 'src/app/models/validarpagos_response';
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
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss']
})
export class ModalPagoComponent implements OnInit {

  default: ValidarPagosResponse;
  dataVenta: any;

  constructor(public dialogRef: MatDialogRef<ModalPagoComponent>,
    public pagos: PagosService,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private venta: VentasService,
    private modal: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dataVenta = data['venta']
  }
  solicitud: string;

  ngOnInit(): void {
    this.validarPago()
  }

  validarPago() {
    const pagos = [];
    console.log(pagos)
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
    }))
    console.log("verify")
    this.pagos.doPaymentInfo(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.solicitud = JSON.parse(this.crypto.decryptJson(json.solicitud))
      console.log(this.solicitud)
      this.default = new ValidarPagosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))

    })
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
    }))
    console.log("verify")
    this.pagos.doConfirmPayment(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.solicitud = JSON.parse(this.crypto.decryptJson(json.solicitud))
      console.log(this.solicitud)
      this.default = new ValidarPagosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))

    })
  }

}
