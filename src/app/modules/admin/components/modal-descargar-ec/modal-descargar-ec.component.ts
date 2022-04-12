import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-modal-descargar-ec',
  templateUrl: './modal-descargar-ec.component.html',
  styleUrls: ['./modal-descargar-ec.component.scss']
})
export class ModalDescargarEcComponent implements OnInit {

  form: FormGroup;

  currentDay = new Date();
  oneMonthAgo = new Date();
  oneYearAgo = new Date();
  pipe = new DatePipe('en-US');

  constructor(
    private crypto: CryptoService,
    private storage: StorageService,
    public dialogRef: MatDialogRef<any>,
    private loader: LoaderService,
    private cliente: ClientesService,
    private session: SesionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.oneMonthAgo.setMonth(this.currentDay.getMonth() - 1);
    this.oneYearAgo.setMonth(this.currentDay.getMonth() - 12);

    this.form = new FormGroup({
      initial: new FormControl(this.oneMonthAgo, [Validators.required]),
      final: new FormControl(this.currentDay, [Validators.required]),
    });
  }

  generate() {
    this.dialogRef.close()
    console.log(this.form.value)
    console.log(this.pipe.transform(this.form.get("initial").value, 'yyyy-MM-dd'))
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      rif: this.crypto.encryptJson(this.data["rif"]),
      serial: this.crypto.encryptJson(this.data["serial"]),
      initial: this.crypto.encryptJson(this.pipe.transform(this.form.get("initial").value, 'yyyy-MM-dd')),
      final: this.crypto.encryptJson(this.pipe.transform(this.form.get("final").value, 'yyyy-MM-dd')),
    }))

    this.loader.loading()
    this.cliente.doStatusAccountPdf(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const pdf = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(pdf);
      window.open(fileURL, '_blank');
      this.loader.stop()
      console.log(res)
    })
  }

}
