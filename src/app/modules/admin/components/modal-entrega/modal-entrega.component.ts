import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AsignacionDecrypter } from 'src/app/models/asignacion_response';
import { ActaDecrypter, ActaResponse } from 'src/app/models/acta';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ArchiveService } from 'src/app/shared/services/archive.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.scss']
})
export class ModalEntregaComponent implements OnInit {

  dataVenta: any;
  default: ActaResponse

  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private archivo: ArchiveService,
    private venta: VentasService,

    public dialogRef: MatDialogRef<ModalEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dataVenta = data['venta']
    
  }

  ngOnInit(): void {
  }

  upload(d: any, id: string) {
    const encode = d.file.toString()
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      att_by: this.crypto.encryptJson("CLIENTE"),
      rif: this.crypto.encryptJson(this.dataVenta.rif),
      documento: this.crypto.encryptJson(id),
      extension: this.crypto.encryptJson(d.ext),
      t_sol_id: this.crypto.encryptJson(null),
      solicitud: this.crypto.encryptJson(null),
      file: this.crypto.encryptJson(encode),
    }))
    this.archivo.saveAttached(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res));
      this.default = new ActaDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default);
      console.log(id);
      
    })
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      nombre: this.crypto.encryptJson(this.default.nombre),
      path: this.crypto.encryptJson(this.default.path),
      solicitud_banco: this.crypto.encryptJson(this.dataVenta.solicitud_banco_id),
      solicitud: this.crypto.encryptJson(this.dataVenta.solicitud),
      base64: this.crypto.encryptJson(this.default.base64),
      c_t_doc_id: this.crypto.encryptJson("1"),
      solicitud_id:this.crypto.encryptJson(this.dataVenta.solicitud_id),
      cod_serial:this.crypto.encryptJson(this.dataVenta.cod_serial),
    }))
    console.log("verify")
    this.venta.entregarVenta(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)
    })
  }
}
