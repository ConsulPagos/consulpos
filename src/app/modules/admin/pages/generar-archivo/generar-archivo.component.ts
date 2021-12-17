import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BancoInterface } from 'src/app/models/banco';
import { PaymentInterface } from 'src/app/models/payment';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminService } from '../../services/admin.service';
import { MesInterface } from '../../../../models/mes'
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { GeneracionResponse, GeneracionDecrypter } from '../../../../models/generacion_response'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultFileComponent } from '../result-file/result-file.component';
import { ExportService } from '../../services/export.service'
import { DefaultDecrypter } from '../../../../models/default_response'

import { expFile } from './generartxt'
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { BancarioService } from 'src/app/shared/services/bancario.service';

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
  payment: PaymentInterface = {}
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
  ) { }

  form = new FormGroup({
    tipo_cobro: new FormControl(null, [Validators.required]),
    banco: new FormControl(null, [Validators.required]),
    cash: new FormControl('', [Validators.min(0.01)]),
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
    this.payment.admin = this.auth.getIdentity()
    this.loadMethods()
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
    this.getTasas();
  }

  loadMethods() {
    this.error_methods = false;
    this.loading_methods = true;
    this.api.get_payment_methods().subscribe(data => {
      this.loading_methods = false;
      this.methods = data
    }, e => {
      this.error_methods = true;
    })
  }

  openDialog(): void {
    this.dialog.open(ResultFileComponent, {
      data:{
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
    id_banco: this.crypto.encryptJson(this.form.get('banco').value),
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


  this.bancario.doGeneracion(`${this.session.getDeviceId()};${dataString}`).subscribe(res => {

    this.pauseTimer()
    const json = JSON.parse(this.crypto.decryptString(res));

    switch (json.R) {
      case constant.R0:
        this.generacionResponse = new GeneracionDecrypter(this.crypto).deserialize(json)
        this.crypto.setKeys(this.generacionResponse.keyS, this.generacionResponse.ivJ, this.generacionResponse.keyJ, this.generacionResponse.ivS)
        this.openDialog();
        this.form.reset();
        if (this.generacionResponse.tipo_archivo === 'EXCEL') {
          this.exportXLSX();
        } else if (this.generacionResponse.tipo_archivo === 'TXT') {
          expFile(this.generacionResponse.cuotas.join('\n'), 'Archivo_' + this.generacionResponse.id_archivo + '_' + new Date())
        }
        break;
      case constant.R1:
        const def = new DefaultDecrypter(this.crypto).deserialize(json)
        this.toaster.error(def.M)
        this.crypto.setKeys(def.keyS, def.ivJ, def.keyJ, def.ivS)
        break;
      default:
        this.toaster.default_error()
        break;
    }


    this.loading = false


  })

}

isInvalid(): boolean {
  if (this.form.get("tipo_cobro").value == "personalizado") {
    return this.form.invalid || this.formPersonalizado.invalid;
  }
  return this.form.invalid;
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
