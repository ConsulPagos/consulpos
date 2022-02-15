import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BancoInterface } from 'src/app/models/banco';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MesInterface } from '../../../../models/mes'
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { GeneracionResponse, GeneracionDecrypter } from '../../../../models/generacion_response'
import { MatDialog } from '@angular/material/dialog';
import { ResultFileComponent } from '../result-file/result-file.component';
import { ExportService } from '../../services/export.service'
import { DefaultDecrypter } from '../../../../models/default_response'

import { expFile } from './generartxt'
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-generar-archivo',
  templateUrl: './generar-archivo.component.html',
  styleUrls: ['./generar-archivo.component.scss']
})
export class GenerarArchivoComponent implements OnInit {

  id;
  id_afiliado;
  loading = false;
  loadingTasas = false;
  error = false;
  methods;
  loading_methods = false;
  error_methods = false;
  value = '';
  bancos: BancoInterface[];
  meses: MesInterface[];
  generacionResponse: GeneracionResponse;
  tasas: any;
  time: number = 0;
  interval;

  constructor(
    public dialog: MatDialog,
    private session: SesionService,
    private bancario: BancarioService,
    private crypto: CryptoService,
    private routes: ActivatedRoute,
    private storage: StorageService,
    private excelService: ExportService,
    private toaster: ToasterService,
    private loader: LoaderService
  ) { }

  form = new FormGroup({
    tipo_cobro: new FormControl(null, [Validators.required]),
    banco: new FormControl(null, [Validators.required]),
    cash: new FormControl(null, [Validators.min(0.01)]),
    descripcion: new FormControl('', [Validators.required]),
    tasa: new FormControl('', [Validators.required]),
  });

  formPersonalizado = new FormGroup({
    tipoCobroJuridico: new FormControl(null, [Validators.required]),
    cashJuridico: new FormControl('', [Validators.required]),
    tipoCobroNatural: new FormControl(null, [Validators.required]),
    cashNatural: new FormControl('', [Validators.required]),
    tipoCobroFP: new FormControl(null, [Validators.required]),
    cashFP: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.id = parseInt(this.routes.snapshot.paramMap.get('id_pedido'))
    this.id_afiliado = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
    this.getTasas();
  }



  openDialog(): void {
    this.dialog.open(ResultFileComponent, {
      data: {
        archivo: this.generacionResponse,
        time: this.time
      }
    });
  }

  exportXLSX(): void {
    this.excelService.exportExcel(this.generacionResponse.cuotas, 'Archivo_' + this.generacionResponse.id_archivo + '_' + new Date());
  }

  getTipoCobro(t: string): boolean {
    var value = false;
    try {
      value = (t == this.form.get("tipo_cobro").value.toString())
    } catch (error) {
      value = false
    }
    return value;
  }


  submit() {

    this.startTimer()

    var data: {} = {
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      codigo: this.crypto.encryptJson(this.form.get('banco').value),
      descripcion: this.crypto.encryptJson(this.form.get('descripcion').value),
      tasa: this.crypto.encryptJson(this.tasas.filter(t => t.id == this.form.get('tasa').value)[0].monto),
      id_tasa: this.crypto.encryptJson(this.form.get('tasa').value),
      oper: this.crypto.encryptJson(this.form.get("tipo_cobro").value)
    }


    if (this.form.get("tipo_cobro").value == "personalizado") {
      data = {
        ...data,
        cobroJuridico: this.crypto.encryptJson(JSON.stringify({
          tipo_cobro: this.formPersonalizado.get("tipoCobroJuridico").value,
          monto_cuota: this.formPersonalizado.get("cashJuridico").value
        })),
        cobroNatural: this.crypto.encryptJson(JSON.stringify({
          tipo_cobro: this.formPersonalizado.get("tipoCobroNatural").value,
          monto_cuota: this.formPersonalizado.get("cashNatural").value
        })),
        cobroFP: this.crypto.encryptJson(JSON.stringify({
          tipo_cobro: this.formPersonalizado.get("tipoCobroFP").value,
          monto_cuota: this.formPersonalizado.get("cashFP").value
        })),
      }

    } else {
      data = {
        ...data,
        monto_cuota: this.crypto.encryptJson(this.form.get('cash').value)
      }
    }

    const dataString = this.crypto.encryptString(JSON.stringify(data));

    this.loading = true;
    this.loader.loading()


    this.bancario.doGeneracion(`${this.session.getDeviceId()};${dataString}`).subscribe(res => {

      this.pauseTimer()
      this.loader.stop()
      this.loading = false;
      console.log(res)
      const json = JSON.parse(this.crypto.decryptString(res));
      const def = new DefaultDecrypter(this.crypto).deserialize(json)

      switch (json.R) {
        case constant.R0:
          const pipe = new DatePipe('en-US');
          const now = Date.now();
          const myFormattedDate = pipe.transform(now, 'short');
          this.generacionResponse = new GeneracionDecrypter(this.crypto).deserialize(json)
          this.openDialog();
          this.form.reset();
          if (this.generacionResponse.tipo_archivo === 'EXCEL') {
            this.exportXLSX();
          } else if (this.generacionResponse.tipo_archivo === 'TXT') {
            expFile(this.generacionResponse.cuotas.join('\n'), 'Archivo_' + this.generacionResponse.id_archivo + '_' + myFormattedDate)
          }
          break;
        case constant.R1:
          this.toaster.error(def.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }

      this.crypto.setKeys(def.keyS, def.ivJ, def.keyJ, def.ivS)

    })

  }

  isInvalid(): boolean {
    if (this.form.get("tipo_cobro").value == "personalizado") {
      return this.form.invalid || this.formPersonalizado.invalid;
    }
    return this.form.invalid || this.form.get("cash").value == null;
  }

  getTasas() {

    var data: {} = {
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
    }

    const dataString = this.crypto.encryptString(JSON.stringify(data));

    this.loader.loading();

    this.bancario.doGetTasas(`${this.session.getDeviceId()};${dataString}`).subscribe(res => {
      this.loader.stop();
      const json = JSON.parse(this.crypto.decryptString(res));
      console.log("JSON DE TASAS")
      console.log(json)
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

  startTimer() {
    this.time = 0;
    console.log("=====>");
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
