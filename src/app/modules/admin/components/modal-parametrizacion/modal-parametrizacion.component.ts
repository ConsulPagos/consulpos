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
  selector: 'app-modal-parametrizacion',
  templateUrl: './modal-parametrizacion.component.html',
  styleUrls: ['./modal-parametrizacion.component.scss']
})
export class ModalParametrizacionComponent implements OnInit {

  dataVenta: any;
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

    public dialogRef: MatDialogRef<ModalParametrizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.dataVenta = data['venta']

    this.parametrizacion = new FormGroup({
      afiliado: new FormControl(this.dataVenta.afiliado, [Validators.required]),
      terminal: new FormControl('', [Validators.required]),
    });
  }

  
  parametrizacion: FormGroup;

  ngOnInit(): void {
  }

  saveConfig(modelo, serial) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id:this.crypto.encryptJson(this.dataVenta.number),
      solicitud_banco_id:this.crypto.encryptJson(this.dataVenta.solicitud_banco_id),
      accion: this.crypto.encryptJson("PARAMETRIZACION"),

      Operaciones:this.crypto.encryptJson(JSON.stringify([
        {
          cod_serial: serial,
          terminal:this.parametrizacion.get('terminal').value,
          afiliado: this.parametrizacion.get('afiliado').value,
          modelo: modelo,
        }
      ]))
    }))
    console.log("verify")
    this.venta.doSaveConfig(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      // this.t_pagos = JSON.parse(this.crypto.decryptJson(json.t_pagos))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      // this.t_pagos = JSON.parse(this.default.t_pagos)
      console.log(this.default)
        
    })
  }
}
