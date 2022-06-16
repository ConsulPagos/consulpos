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
  serial: any;
  modelo: any;
  solicitud_banco_id: any;

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

    // this.parametrizacion = new FormGroup({
    //   afiliado: new FormControl(this.dataVenta.afiliado, [Validators.required]),
    //   terminal: new FormControl('', [Validators.required]),
    // });
  }

  formDinamic;
  parametrizacion: FormGroup;

  ngOnInit(): void {
    this.formDinamic = [];
    console.log(this.dataVenta.items)
    for (let t = 0; t < this.dataVenta.items.length; t++) {
      const item = this.dataVenta.items[t]
      if (!item.complemento_d) {
        console.log(item)
        this.formDinamic.push(new FormGroup({
          afiliado: new FormControl(item.solicitud_banco.afiliado, [Validators.required]),
          terminal: new FormControl(item.solicitud_banco.terminal, [Validators.required]),
          solicitud_banco_id: new FormControl(item.solicitud_banco.solicitud_banco_id),
          cod_serial: new FormControl(item.cod_serial),
          modelo: new FormControl(item.modelo),
        }))
      }

      console.log(this.formDinamic)
    }
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  saveConfig(serial, modelo, solicitud_banco_id) {
    console.log(this.formDinamic)
    const items = []
    this.formDinamic.forEach(h => {
      items.push({
        cod_serial: h.get('cod_serial').value,
        terminal: h.get('terminal').value,
        afiliado: h.get('afiliado').value,
        modelo: h.get('modelo').value,
        solicitud_banco_id: h.get('solicitud_banco_id').value,
      })
    });
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_id: this.crypto.encryptJson(this.dataVenta.number),
      accion: this.crypto.encryptJson("PARAMETRIZACION"),
      Operaciones: this.crypto.encryptJson(JSON.stringify(
        items
      )),
      correctivo: this.crypto.encryptJson(this.dataVenta.correctivo),
    }))
    console.log("verify")
    this.venta.doSaveConfig(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new AsignacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.default)

    })
  }

  invalid() {
    var invalid = false;
    for (let index = 0; index < this.formDinamic.length; index++) {
      if (this.formDinamic[index].invalid) {
        invalid = true
        break;
      }
    }
    return invalid
  }

  // getErrorMessage(z) {
  //   if (this.formDinamic[z].get('terminal')?.hasError('required')) {
  //     return 'Ingrese un terminal válido';
  //   }
  //   return this.formDinamic[z].get('terminal')?.hasError('terminal') ? 'Terminales del 1 al 299' : '';
  // }
}
