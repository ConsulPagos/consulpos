import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';
import { AdminService } from '../../services/admin.service';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-tasas',
  templateUrl: './tasas.component.html',
  styleUrls: ['./tasas.component.scss']
})
export class TasasComponent implements OnInit {

  countNuevos;
  loadingTasas = false;
  tasas: any;
  columns =['id','fecha_inicio', 'fecha_fin', 'monto'];


  constructor(
    public dialog: MatDialog,
    private admin: AdminService,
    private session: SesionService,
    private bancario: BancarioService,
    private api: ApiService,
    private crypto: CryptoService,
    private auth: AuthService,
    private routes: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private excelService: ExportService,
    private toaster: ToasterService
  ) {


   }

  ngOnInit(): void {
    this.getTasas()
  }

  getTasas() {
    var data: {} = {
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
    }
    const dataString = this.crypto.encryptString(JSON.stringify(data));
    this.loadingTasas = true;
    this.bancario.doGetTasas(`${this.session.getDeviceId()};${dataString}`).subscribe(res => {
      console.log(res)
      const json = JSON.parse(this.crypto.decryptString(res));
      const response = new DefaultDecrypter(this.crypto).deserialize(json);
      console.log(json)
      switch (json.R) {
        case constant.R0:
          this.tasas = JSON.parse(this.crypto.decryptJson(json.tasas));
          console.log(this.tasas)
          break;
        case constant.R1:
        default:
          this.toaster.error(response.M)
          break;
      }
      this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
      this.loadingTasas = false
    })
  }

}
