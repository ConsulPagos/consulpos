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

import { expFile } from './generartxt'

@Component({
  selector: 'app-generar-archivo',
  templateUrl: './generar-archivo.component.html',
  styleUrls: ['./generar-archivo.component.scss']
})
export class GenerarArchivoComponent implements OnInit {

  id;
  id_afiliado;
  loading = false;
  error = false;
  payment: PaymentInterface = {}
  methods;
  loading_methods = false;
  error_methods = false;
  value = '';
  bancos: BancoInterface[];
  meses: MesInterface[];
  generacionResponse: GeneracionResponse;

  constructor(
    public dialog: MatDialog,
    private admin: AdminService,
    private sesion: SesionService,
    private api: ApiService,
    private crypto: CryptoService,
    private auth: AuthService,
    private routes: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private excelService: ExportService
  ) { }

  form = new FormGroup({
    banco: new FormControl('', [Validators.required]),
    cash: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.id = parseInt(this.routes.snapshot.paramMap.get('id_pedido'))
    this.id_afiliado = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
    this.payment.admin = this.auth.getIdentity()
    this.loadMethods()
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
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
      data: this.generacionResponse,
    });
  }

  exportXLSX(): void {
    this.excelService.exportExcel(this.generacionResponse.cuotas, 'Archivo_' + this.generacionResponse.id_archivo + '_' + new Date());
  }



  submit() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson("1"),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      banco_id: this.crypto.encryptJson(this.form.get('banco').value),
      monto_cuota: this.crypto.encryptJson(this.form.get('cash').value),
      descripcion: this.crypto.encryptJson(this.form.get('descripcion').value),
      tasa: this.crypto.encryptJson('5'),
    }))

    const IMEI = '13256848646454643'
    this.loading = true;

    console.log("verify")

    this.sesion.doGeneracion(`${IMEI};${data}`).subscribe(res => {
      this.generacionResponse = new GeneracionDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.generacionResponse)
      console.log(JSON.parse(this.crypto.decryptString(res)))

      this.loading = false
      this.crypto.setKeys(this.generacionResponse.keyS, this.generacionResponse.ivJ, this.generacionResponse.keyJ, this.generacionResponse.ivS)
      this.openDialog();
      if (this.generacionResponse.tipo_archivo === 'EXCEL') {
        this.exportXLSX();
      } else if (this.generacionResponse.tipo_archivo === 'TXT') {
        expFile(this.generacionResponse.cuotas, 'Archivo_' + this.generacionResponse.id_archivo + '_' + new Date())
      }

    })
    //**************************************************************************************************************************//



  }


}
