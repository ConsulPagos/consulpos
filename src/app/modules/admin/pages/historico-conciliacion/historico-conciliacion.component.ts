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
import { NavigationExtras, Router } from '@angular/router';
import { PlantillaRespuestaInterface } from 'src/app/models/plantilla_respuesta';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-historico-conciliacion',
  templateUrl: './historico-conciliacion.component.html',
  styleUrls: ['./historico-conciliacion.component.scss']
})
export class HistoricoConciliacionComponent implements OnInit {

  loading = false;
  data;
  columns = ["id", "fecha_generacion", "fecha_respuesta", "fecha_conciliacion", "cuotas", "monto_enviado", "monto_cobrado", "efectividad", "descripcion", "acciones"]
  columnsCC = ["id", "fecha_respuesta", "fecha_conciliacion", "cuotas", "monto_cobrado", "descripcion", "acciones"]
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
    private router: Router,
    private loader: LoaderService,
    private exportService: ExportService,
  ) { }

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
            codigo: this.crypto.encryptJson(this.form.get("banco").value),
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
  //   
  //         //this.toaster.success(response0.M)
  //         break
  //       case constant.R1:
  //       default:
  //         const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
  //          
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

  getArchivo(archivo) {

    this.loader.loading()

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      id_archivo: this.crypto.encryptJson(archivo.id),
      oper: this.crypto.encryptJson(this.form.get('oper').value),
    }))


    this.bancario.doGetArchivo(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loader.stop()
      console.log(JSON.parse(this.crypto.decryptString(res)))
      switch (json.R) {
        case constant.R0:
          const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.view(JSON.parse(this.crypto.decryptJson(json.archivo)), archivo);

          //this.toaster.success(response0.M)
          break
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))

          this.toaster.error(response.M)
          break;
      }
    })
  }

  view(data: any, archivo: any) {

    const plantilla: PlantillaRespuestaInterface[] = [{
      nombre: "serial",
      columna: "serial",
      decimales: null,
      inicia: null,
      longitud: null,
      posicion: 1,
      tipo: "string"
    }, {
      nombre: "afiliado",
      columna: "afiliado",
      decimales: null,
      inicia: null,
      longitud: null,
      posicion: 2,
      tipo: "string"
    }, {
      nombre: "cobrado",
      columna: "cobrado",
      decimales: 2,
      inicia: null,
      longitud: null,
      posicion: 3,
      tipo: "string"
    }
    ]

    const extras: NavigationExtras = {
      state: {
        archivo: archivo,
        columns: ["afiliado", "serial", "cobrado"],
        data: data
      }
    }
    this.router.navigateByUrl(`/admin/app/(adr:previsualizar-archivo/${archivo.id})`, extras);
  }

  download(archivo) {

    this.loader.loading()

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      id_archivo: this.crypto.encryptJson(archivo.id),
      oper: this.crypto.encryptJson(this.form.get('oper').value),
    }))

    this.bancario.doGetArchivo(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loader.stop()
      console.log(JSON.parse(this.crypto.decryptString(res)))
      switch (json.R) {
        case constant.R0:
          var result = [
            { id_archivo_cobranza: "Id de archivo", id: "Id de linea", rif: "RIF", serial: "Serial", afiliado: "Afiliado", cuenta: "Numero de cuenta", enviado: "Monto Enviado", cobrado: "Monto Cobrado", mensaje: "Mensaje" },
            ...JSON.parse(this.crypto.decryptJson(json.archivo))]
          console.log(result)
          this.exportService.exportExcel(result, archivo.descripcion);
          break
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.toaster.error(response.M)
          break;
      }
    })
  }

}
