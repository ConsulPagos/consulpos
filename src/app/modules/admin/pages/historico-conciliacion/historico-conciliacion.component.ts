import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BancoInterface } from 'src/app/models/banco';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ShowClientsDecrypter } from 'src/app/models/showclients_response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-historico-conciliacion',
  templateUrl: './historico-conciliacion.component.html',
  styleUrls: ['./historico-conciliacion.component.scss']
})
export class HistoricoConciliacionComponent implements OnInit {

  loading = false;
  data;
  columns = ["id", "fecha_generacion", "fecha_respuesta", "fecha_conciliacion", "cuotas", "monto_enviado", "monto_cobrado", "efectividad", "descripcion"]
  columnsCC = ["id", "fecha_respuesta", "fecha_conciliacion", "cuotas", "monto_cobrado", "descripcion"]
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  bancos: BancoInterface[];
  error = false;
  resultsLength;
  dataSource = new MatTableDataSource<any>();

  form = new FormGroup({
    banco: new FormControl("", [Validators.required]),
    oper: new FormControl("", [Validators.required]),
  });

  constructor(
    private title: Title,
    private storage: StorageService,
    private crypto: CryptoService,
    private session: SesionService,
    private toaster: ToasterService,
    private bancario: BancarioService,
    private loader: LoaderService,) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Historico de Conciliación')
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  submit() {
    if (this.form.valid) {
      this.load();
    }
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loader.loading()
          const data = this.crypto.encryptString(JSON.stringify({
            u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
            scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
            correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
            id_banco: this.crypto.encryptJson(this.form.get("banco").value),
            pag: this.crypto.encryptJson(this.paginator.pageIndex.toString()),
            offset: this.crypto.encryptJson("10"),
            oper: this.crypto.encryptJson(this.form.get("oper").value),
          }))
          return this.bancario.doGetHistoricoConciliacion(`${this.session.getDeviceId()};${data}`)
        }),
        map(data => {
          this.loader.stop()
          const json = JSON.parse(this.crypto.decryptString(data));
          const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(data)))
          this.data = JSON.parse(this.crypto.decryptJson(json.archivos))
          console.log(this.data)
          this.resultsLength = parseInt(this.crypto.decryptJson(json.total));
          this.crypto.setKeys(response0.keyS, response0.ivJ, response0.keyJ, response0.ivS)
          return this.data;

        }),
        catchError((e) => {
          this.loading = false;
          this.error = true;
          console.log(e)
          return observableOf([]);
        })
      ).subscribe(data => {
        this.data = data
        this.dataSource = new MatTableDataSource(this.data);
      });
  }

  // get() {

  //   this.data = null;

  //   this.loader.loading();

  //   const data = this.crypto.encryptString(JSON.stringify({
  //     u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
  //     scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
  //     correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
  //     id_banco: this.crypto.encryptJson(this.form.get("banco").value),
  //     pag: this.crypto.encryptJson("0"),
  //     offset: this.crypto.encryptJson("25"),
  //     oper: this.crypto.encryptJson(this.form.get("oper").value),
  //   }))

  //   this.bancario.doGetHistoricoConciliacion(`${this.session.getDeviceId()};${data}`).subscribe(res => {
  //     const json = JSON.parse(this.crypto.decryptString(res))
  //     this.loader.stop();
  //     console.log(json.archivos)
  //     switch (json.R) {
  //       case constant.R0:
  //         const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
  //         this.data = JSON.parse(this.crypto.decryptJson(json.archivos))
  //         console.log(this.data)
  //         this.crypto.setKeys(response0.keyS, response0.ivJ, response0.keyJ, response0.ivS)
  //         //this.toaster.success(response0.M)
  //         break
  //       case constant.R1:
  //       default:
  //         const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
  //         this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
  //         this.toaster.error(response.M)
  //         break;
  //     }
  //   })
  // }

  getColumns() {
    var myCols = this.columns;
    if (this.form.get('oper').value == '/cc') {
      myCols = this.columnsCC
    }
    return myCols
  }

  reset() {
    this.form.get('banco').reset()
    this.data = null
  }

}
