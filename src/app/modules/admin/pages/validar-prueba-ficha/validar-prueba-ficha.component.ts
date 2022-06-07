import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AsignacionPruebaDecrypter, AsignacionPruebaResponse } from 'src/app/models/asignacion_prueba_response';
import { ConfiguracionDecrypter } from 'src/app/models/configuracion_response';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';
import { ModalAsignacionPruebaComponent } from '../../components/modal-asignacion-prueba/modal-asignacion-prueba.component';

@Component({
  selector: 'app-validar-prueba-ficha',
  templateUrl: './validar-prueba-ficha.component.html',
  styleUrls: ['./validar-prueba-ficha.component.scss']
})
export class ValidarPruebaFichaComponent implements OnInit {

  default: AsignacionPruebaResponse;
  default_2: DefaultDecrypter;
  item: any = {};
  x = null;
  form: FormGroup;

  constructor(
    private title: Title,
    public dialog: MatDialog,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private router: Router,
    private venta: VentasService,
    private modal: ModalService,
    private pago: PagosService,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.item
    ) {
      this.item = this.router.getCurrentNavigation().extras.state.item as any;
      console.log(this.item)

      this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        serial: new FormControl(this.item.equipo, [Validators.required]),
      });
    } else {
      this.router.navigateByUrl("/admin/app/(adr:prueba)");
    }
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Venta')
  }



  openDialog(item): void {
    if (this.item.status_desc === "PRUEBAS") {
      var dialogRef: any = this.dialog.open(ModalAsignacionPruebaComponent, {
        disableClose: true,
        height: 'auto',
        panelClass: 'custom-dialog',
        data: { item: item },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {

        }
      });
    }
  }

  findPos() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_banco_id: this.crypto.encryptJson(this.item.solicitud_banco_id),
      modelo: this.crypto.encryptJson(this.item.modelo),
      viejo_serial: this.crypto.encryptJson(this.item.equipo),
    }))
    console.log("verify")
    this.venta.actualizarPosPorTest(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.default = new AsignacionPruebaDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      var x = this.default.cod_serial
      this.x = x
      console.log(this.x)
      this.form.get('serial').setValue(this.default.cod_serial)
    })
  }

  findSim(modelo: any, cod_serial: any) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      solicitud_banco_id: this.crypto.encryptJson(this.item.solicitud_banco_id),
      modelo: this.crypto.encryptJson(modelo),
      viejo_serial: this.crypto.encryptJson(cod_serial),
    }))
    this.venta.actualizarSimPorTest(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.default = new ConfiguracionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
    })
  }


  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      nombre: this.crypto.encryptJson(this.form.get('name').value),
      cod_serial: this.crypto.encryptJson(this.form.get('serial').value),
    }))
    console.log("verify")
    this.venta.confirmacionTestCorrecto(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.default = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
    })
  }

}
