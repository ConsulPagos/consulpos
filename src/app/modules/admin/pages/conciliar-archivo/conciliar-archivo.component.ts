import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CrmTableInterface } from 'src/app/models/crm';
import { AdminService } from '../../services/admin.service';
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

@Component({
  selector: 'app-conciliar-archivo',
  templateUrl: './conciliar-archivo.component.html',
  styleUrls: ['./conciliar-archivo.component.scss']
})
export class ConciliarArchivoComponent implements OnInit {

  data: any = { 'affiliate': {} };
  affiliate: CrmTableInterface;
  loading = false;
  error = false;
  id;
  bancos: BancoInterface[];
  conciliacionResponse: ConciliacionResponse;
  archivos: ArchivoInterface[];

  constructor(
    private admin: AdminService,
    private routes: ActivatedRoute,
    private router: Router,
    private title: Title,
    private storage: StorageService,
    private crypto: CryptoService,
    private session: SesionService,
    private toaster: ToasterService
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
    const archivo =  this.archivos.filter(it => it.id == id)[0]
    const extras : NavigationExtras ={
      state:{
        archivo: archivo 
      }
    }
    this.loading = true;
    this.error = false;
    this.router.navigateByUrl(`/admin/app/(adr:previsualizar-archivo/${archivo.id})`, extras);
  }

  submit() {

    this.archivos = null;

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      id_banco: this.crypto.encryptJson(this.form.get('banco').value),
    }))

    this.loading = true;

    this.session.doGetArchivos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loading = false
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


}
