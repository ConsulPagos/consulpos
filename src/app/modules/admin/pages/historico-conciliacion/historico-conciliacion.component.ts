import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-historico-conciliacion',
  templateUrl: './historico-conciliacion.component.html',
  styleUrls: ['./historico-conciliacion.component.scss']
})
export class HistoricoConciliacionComponent implements OnInit {
  loading = false;
  data;
  columns = ["id", "fecha_generacion", "fecha_respuesta", "fecha_conciliacion", "cuotas",  "monto_enviado", "monto_cobrado", "efectividad", "descripcion"]
  constructor(
    private router: Router,
    private title: Title,
    private storage: StorageService,
    private crypto: CryptoService,
    private session: SesionService,
    private toaster: ToasterService,
    private bancario: BancarioService,
    private loader:LoaderService,
    private modal: ModalService,) { }

  ngOnInit(): void {
    this.get()
  }

  get(){

    this.loader.loading();

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      pag: this.crypto.encryptJson("0"),
      offset: this.crypto.encryptJson("25")
    }))


    this.bancario.doGetHistoricoConciliacion(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loader.stop();
      console.log(json.archivos)
      switch (json.R) {
        case constant.R0:
          const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.data = JSON.parse(this.crypto.decryptJson(json.archivos))
          console.log(this.data)
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

}
