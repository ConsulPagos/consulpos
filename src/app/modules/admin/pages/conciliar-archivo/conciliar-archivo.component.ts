import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BancoInterface } from '../../../../models/banco'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { ConciliacionDecrypter, ConciliacionResponse } from '../../../../models/conciliacion_response';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { ArchivoInterface } from 'src/app/models/archivo';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-conciliar-archivo',
  templateUrl: './conciliar-archivo.component.html',
  styleUrls: ['./conciliar-archivo.component.scss']
})
export class ConciliarArchivoComponent implements OnInit {

  data: any = { 'affiliate': {} };
  loadingUpdate = false;
  loadingGetArchivo = false;
  error = false;
  id;
  bancos: BancoInterface[];
  conciliacionResponse: ConciliacionResponse;
  archivos: ArchivoInterface[];
  archivo: any;

  constructor(
    private router: Router,
    private title: Title,
    private storage: StorageService,
    private crypto: CryptoService,
    private session: SesionService,
    private toaster: ToasterService,
    private bancario: BancarioService,
    private modal: ModalService,
    private loader: LoaderService,

  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Conciliar Archivo')
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
  }

  form = new FormGroup({
    banco: new FormControl(null, [Validators.required]),
    archivo: new FormControl('', [Validators.required]),
  });

  load() {

    const id = this.form.get("archivo").value;
    const archivo = this.archivos.filter(it => it.id == id)[0]
    const extras: NavigationExtras = {
      state: {
        archivo: archivo
      }
    }
    this.error = false;
    this.router.navigateByUrl(`/admin/app/(adr:previsualizar-archivo/${archivo.id})`, extras);
  }

  getArchivos() {

    this.archivos = null;

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      id_banco: this.crypto.encryptJson(this.form.get('banco').value),
      oper: this.crypto.encryptJson("/conciliar"),
    }))

    this.loader.loading()

    this.bancario.doGetArchivos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loader.stop()

      console.log(JSON.parse(this.crypto.decryptString(res)))
      switch (json.R) {
        case constant.R0:
          this.conciliacionResponse = new ConciliacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.archivos = this.conciliacionResponse.archivos
          this.crypto.setKeys(this.conciliacionResponse.keyS, this.conciliacionResponse.ivJ, this.conciliacionResponse.keyJ, this.conciliacionResponse.ivS)
          break;
        case constant.R1:
        default:
          this.form.get("archivo").reset()
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
          this.toaster.error(response.M)
          break;
      }
    })
    //**************************************************************************************************************************//
  }

  conciliar() {
    this.modal.confirm("Se actualizaran los saldos de los clientes").subscribe(result => {
      if (result) {
        this.submit()
      }
    })
  }

  submit() {

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      id_archivo: this.crypto.encryptJson(this.archivo.id),
    }))

    this.loader.loading()

    this.bancario.doUpdateEC(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loader.stop()
      console.log(res)
      console.log(JSON.parse(this.crypto.decryptString(res)))
      switch (json.R) {
        case constant.R0:
          const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.crypto.setKeys(response0.keyS, response0.ivJ, response0.keyJ, response0.ivS)
          this.toaster.success(response0.M)
          this.archivos = null
          this.archivo = null;
          this.form.get("banco").setValue(null)
          this.form.markAsPristine();
          this.form.markAsUntouched();
          break
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
          this.toaster.error(response.M)
          break;
      }

    })

    this.loadingUpdate = false;
    this.loadingGetArchivo = false;

    //**************************************************************************************************************************//
  }

  getArchivo() {

    this.loadingGetArchivo = true;
    this.loader.loading()

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      id_archivo: this.crypto.encryptJson(this.archivo.id),
    }))


    this.bancario.doGetArchivo(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loadingGetArchivo = false
      this.loader.stop()
      console.log(JSON.parse(this.crypto.decryptString(res)))
      switch (json.R) {
        case constant.R0:
          const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.view(JSON.parse(this.crypto.decryptJson(json.archivo)));
          this.crypto.setKeys(response0.keyS, response0.ivJ, response0.keyJ, response0.ivS)
          //this.toaster.success(response0.M)
          break
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
          this.toaster.error(response.M)
          break;
      }
    })
  }

  view(data: any) {
    const archivo = this.archivo;
    const extras: NavigationExtras = {
      state: {
        archivo: archivo,
        columns: ["rif", "cuenta", "afiliado", "cobrado", "enviado", "mensaje"],
        data: data
      }
    }
    this.router.navigateByUrl(`/admin/app/(adr:previsualizar-archivo/${archivo.id})`, extras);
  }

  setArchivo(id) {
    this.archivo = this.archivos.filter(it => it.id == id)[0];
  }

}
