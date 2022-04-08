import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { TipodocumentoInterface } from 'src/app/models/tipo_documento';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-modal-desafiliacion',
  templateUrl: './modal-desafiliacion.component.html',
  styleUrls: ['./modal-desafiliacion.component.scss']
})
export class ModalDesafiliacionComponent implements OnInit {

  almacenes: any[];
  tipos_clientes: any[];
  tipo_documentos: TipodocumentoInterface[];
  defaultResponse: DefaultResponse;
  serial: any;
  items: any;

  constructor(
    private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,
    private router: Router,
    private session: SesionService,
    private dialog: MatDialog,
    private loader: LoaderService,
    private toaster: ToasterService,
    private modal: ModalService,

    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.items = data['items']
  }

  form = new FormGroup({
    motivo: new FormControl('', [Validators.required]),
    tipo_doc: new FormControl('', [Validators.required]),
    rif: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.almacenes = JSON.parse(this.storage.get(constant.ALMACENES)).almacenes
    this.tipo_documentos = JSON.parse(this.storage.get(constant.T_DOCS)).t_docs
    console.log(this.data)
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  submit(serial: any) {
    var letra = this.form.get("tipo_doc").value
    var rif = letra + this.form.get('rif').value
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),

      rif: this.crypto.encryptJson(rif),
      id_motivo: this.crypto.encryptJson(this.form.get('motivo').value),
      motivo: this.crypto.encryptJson(this.form.get('motivo').value),
      cod_serial: serial,

    }))
    this.cliente.doDelete(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.defaultResponse = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      switch (this.defaultResponse.R) {
        case constant.R0:
          this.toaster.success(this.defaultResponse.M)
          break;
        case constant.R1:
          this.toaster.error(this.defaultResponse.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }
    })
  }
}
