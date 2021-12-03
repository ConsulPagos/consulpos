import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private sesion: SesionService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Conciliar Archivo')

    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
  }

  form = new FormGroup({
    banco: new FormControl('', [Validators.required]),
    proceso: new FormControl('', [Validators.required]),
  });

  load() {
    this.loading = true;
    this.error = false;
    this.router.navigateByUrl('/admin/app/(adr:previsualizar-archivo)');
  }

  isValid(limite_descuento) {
    if (limite_descuento) {
      var ld = new Date(limite_descuento)
      var now = new Date()
      return ld.getTime() > now.getTime() ? true : false;
    } else {
      return false;
    }
  }

  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      banco_id: this.crypto.encryptJson(parseInt(this.form.get('banco').value).toString()),
    }))

    const IMEI = '13256848646454643'
    this.loading = true;

    console.log("verify")

    this.sesion.doGetArchivos(`${IMEI};${data}`).subscribe(res => {
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.conciliacionResponse = new ConciliacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loading = false
      this.archivos = this.conciliacionResponse.archivos
      // this.crypto.setKeys(this.generacionResponse.keyS, this.generacionResponse.ivJ, this.generacionResponse.keyJ, this.generacionResponse.ivS)
      // this.openDialog();
      // if (this.generacionResponse.tipo_archivo === 'EXCEL') {
      //   this.exportXLSX();
      // } else if (this.generacionResponse.tipo_archivo === 'TXT') {
      //   expFile(this.generacionResponse.cuotas, 'Archivo_' + this.generacionResponse.id_archivo + '_' + new Date())
      // }

    })
    //**************************************************************************************************************************//
  }
  openDialog() {
    throw new Error('Method not implemented.');
  }
  exportXLSX() {
    throw new Error('Method not implemented.');
  }

}
