import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesService } from '../../services/clientes.service';
import { CryptoService } from '../../services/crypto.service';
import { LoaderService } from '../../services/loader.service';
import { SesionService } from '../../services/sesion.service';
import { StorageService } from '../../services/storage.service';
import { constant } from '../../utils/constant';
import { DefaultDecrypter, DefaultResponse } from 'src/app/models/default_response';
import { ArchiveService } from '../../services/archive.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  default: DefaultResponse;

  constructor(
    private crypto: CryptoService,
    private cliente: ClientesService,
    private storage: StorageService,
    private session: SesionService,
    private loader: LoaderService,
    private archive: ArchiveService
  ) { }

  ngOnInit(): void {
  }

  upload() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
    }))
    this.loader.stop()
    this.archive.saveAttached(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.default = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
    })
  }
}