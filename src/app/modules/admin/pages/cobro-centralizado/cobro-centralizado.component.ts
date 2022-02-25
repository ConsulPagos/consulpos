import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { BancoInterface } from 'src/app/models/banco';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { PlantillaRespuestaInterface } from 'src/app/models/plantilla_respuesta';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-cobro-centralizado',
  templateUrl: './cobro-centralizado.component.html',
  styleUrls: ['./cobro-centralizado.component.scss']
})
export class CobroCentralizadoComponent implements OnInit {

  form = new FormGroup({
    banco: new FormControl(null, [Validators.required]),
    option: new FormControl('', [Validators.required]),
  });
  bancos: BancoInterface[];

  constructor(
    private storage: StorageService,
    private router: Router,
    private crypto: CryptoService,
    private loader: LoaderService,
    private bancario: BancarioService,
    private session: SesionService,
    private toaster: ToasterService
  ) {
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos

  }

  ngOnInit(): void {
  }

  submitGenerar() {

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      codigo: this.crypto.encryptJson(this.form.get("banco").value),
    }))

    this.loader.loading()

    this.bancario.doGetClientList(`${this.session.getDeviceId()};${data}`).subscribe(res => {

      console.log(this.crypto.decryptString(res))

      const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loader.stop()
      const json = JSON.parse(this.crypto.decryptString(res));
      const equipos = JSON.parse(this.crypto.decryptJson(json.equipos))

      switch (json.R) {
        case constant.R0:
          const navigationExtras: NavigationExtras = {
            state: {
              equipos: equipos,
              banco: this.bancos.filter(b => b.codigo == this.form.get("banco").value)[0].nombre
            }
          }
          this.router.navigateByUrl("/admin/app/(adr:seleccion-centralizado)", navigationExtras)
          break;
        case constant.R1:
        default:
          this.toaster.error(response.M)
          break;
      }

       

    })
  }


  submitRegistrar() {

    const plantilla: PlantillaRespuestaInterface[] = [{
      nombre: "CODAFI",
      columna: "afiliado",
      decimales: null,
      inicia: null,
      longitud: null,
      posicion: 1,
      tipo: "string"
    }, {
      nombre: "TERMIN",
      columna: "terminal",
      decimales: null,
      inicia: null,
      longitud: null,
      posicion: 2,
      tipo: "string"
    }, {
      nombre: "COMI$",
      columna: "monto",
      decimales: 2,
      inicia: null,
      longitud: null,
      posicion: 3,
      tipo: "double"
    }
    ]

    const id = 1;
    const archivo = { id_banco: this.form.get("banco").value }
    const extras: NavigationExtras = {
      state: {
        archivo: archivo,
        tipo_archivo: "EXCEL",
        n_pagina: 0,
        isCentralizado: true,
        plantilla: plantilla
      }
    }
    this.router.navigateByUrl(`/admin/app/(adr:previsualizar-archivo/${id})`, extras);
  }


}
