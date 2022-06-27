import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { BancoInterface } from 'src/app/models/banco';
import { ActualizacionResponse, ActualizacionDecrypter } from 'src/app/models/actualizacion_response';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-actualizar-archivo',
  templateUrl: './actualizar-archivo.component.html',
  styleUrls: ['./actualizar-archivo.component.scss']
})
export class ActualizarArchivoComponent implements OnInit {

  data: any = { 'affiliate': {} };
  loading = false;
  error = false;
  id;
  bancos: BancoInterface[];
  actualizacionResponse: ActualizacionResponse;
  archivos: any[];


  constructor(
    private router: Router,
    private title: Title,
    private storage: StorageService,
    private crypto: CryptoService,
    private session: SesionService,
    private bancario: BancarioService,
    private toaster: ToasterService  ) { }

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
        archivo: archivo,
        tipo_archivo: this.actualizacionResponse.tipo_archivo,
        n_pagina: this.actualizacionResponse.n_pagina 
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
      codigo: this.crypto.encryptJson(this.form.get('banco').value),
      oper: this.crypto.encryptJson("/actualizar"),
      pag: this.crypto.encryptJson("0"),
      offset: this.crypto.encryptJson("50"),
    }))

    this.loading = true;

    this.bancario.doGetArchivos(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loading = false

      switch (json.R) {
        case constant.R0:
          this.actualizacionResponse = new ActualizacionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.archivos = this.actualizacionResponse.archivos
          break;
        case constant.R1:
        default:
          this.form.get("archivo").reset()
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
           
          this.toaster.error(response.M)
          break;
      }
    })
    //**************************************************************************************************************************//
  }

  
 
}

