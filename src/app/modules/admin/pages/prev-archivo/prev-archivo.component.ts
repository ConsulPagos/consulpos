import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import * as XLSX from "xlsx";
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { PlantillaRespuestaInterface } from 'src/app/models/plantilla_respuesta';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFieldDialogComponent } from 'src/app/shared/components/edit-field-dialog/edit-field-dialog.component';

import { ExcelReaderService } from "../../services/excel-reader.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ShowClientsDecrypter } from 'src/app/models/showclients_response';
@Component({
  selector: 'app-prev-archivo',
  templateUrl: './prev-archivo.component.html',
  styleUrls: ['./prev-archivo.component.scss']
})
export class PrevArchivoComponent implements OnInit {

  data: any[];
  progress: number = 0;
  id: any;
  archivo: any;
  tipo_archivo: String;
  n_pagina: number;
  loading = false;
  plantilla: PlantillaRespuestaInterface[] = null;
  loadingRespuesta = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  columns = []
  isCentralizado = false
  dataSource: MatTableDataSource<unknown>;
  resultsLength: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private modal: ModalService,
    private bancario: BancarioService,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private dialog: MatDialog,
    private excelReader: ExcelReaderService,
    private loader: LoaderService) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.archivo) {

      this.archivo = this.router.getCurrentNavigation().extras.state.archivo
      this.tipo_archivo = this.router.getCurrentNavigation().extras.state.tipo_archivo
      this.n_pagina = this.router.getCurrentNavigation().extras.state.n_pagina

      if (this.router.getCurrentNavigation().extras.state.data) {
        this.data = this.router.getCurrentNavigation().extras.state.data
      }

      if (this.router.getCurrentNavigation().extras.state.columns) {
        this.columns = this.router.getCurrentNavigation().extras.state.columns
      }


      if (this.router.getCurrentNavigation().extras.state.isCentralizado) {
        this.isCentralizado = this.router.getCurrentNavigation().extras.state.isCentralizado
      }

      if (this.router.getCurrentNavigation().extras.state.plantilla) {
        this.plantilla = this.router.getCurrentNavigation().extras.state.plantilla
      }
      

    } else {
      this.router.navigateByUrl("/admin/app/(adr:dashboard)")
    }

  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = p.id
    });

    if (!this.isCentralizado) {
      this.getPlantillaRespuesta();
    }

  }

  onFileChange(event: any) {

    const columns = []

    console.log(this.plantilla);
    

    this.plantilla.forEach(p => {
      columns.push(p.columna)
    })

    this.loading = true;
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();

    reader.readAsBinaryString(target.files[0]);
    var ws: XLSX.WorkSheet
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      this.excelReader.read(binarystr, this.tipo_archivo, this.n_pagina, this.plantilla)
      this.loading = true
      const sub = this.excelReader.finished.subscribe((nData: any[]) => {
        this.loading = false
        this.data = nData;
        this.columns = columns;
        sub.unsubscribe()
      })
    };
  }


  get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r;

    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]

      /* find the cell in the first row */
      var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
      if (cell && cell.t)
        hdr = XLSX.utils.format_cell(cell);

      headers.push(hdr);
    }
    return headers;
  }

  getTotal() {
    return this.data.map(t => t.cobrado > 0 ? 1 : 0).reduce((acc, value) => acc + value, 0);
  }

  getTotalMonto() {
    return this.data.map(t => t.enviado).reduce((acc, value) => acc + value, 0);
  }

  getTotalCobrado() {
    return this.data.map(t => t.cobrado).reduce((acc, value) => acc + value, 0);
  }

  save() {
    this.modal.confirm("Se actualizará el archivo.").subscribe(result => {
      if (result) {
        //console.log("acciones")
        this.submit()
      }
    })
  }

  submit() {

    ////console.log(JSON.stringify(this.data))

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      id_archivo: this.crypto.encryptJson(this.archivo.id),
      archivo: this.crypto.encryptJson(JSON.stringify(this.data)),
      codigo: this.crypto.encryptJson(this.archivo.id_banco),
    }))

    this.loading = true;
    this.loader.loading()

    this.bancario.doConciliacion(`${this.session.getDeviceId()};${data}`).subscribe(res => {

      const json = JSON.parse(this.crypto.decryptString(res))
      this.loading = false
      this.loader.stop()

      switch (json.R) {
        case constant.R0:
          const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))

          this.toaster.success(response0.M)
          this.router.navigateByUrl("admin/app/(adr:actualizar-archivo)")
          break;
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.toaster.error(response.M)
          break;
      }
    })
    //**************************************************************************************************************************//
  }


  confirmCentralizado() {
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'field': "Concepto", "value": "" }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result.length > 0) {
        this.submitCentralizado(result)
      }
    })
  }

  submitCentralizado(descripcion: string) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      archivo: this.crypto.encryptJson(JSON.stringify(this.data)),
      codigo: this.crypto.encryptJson(this.archivo.id_banco),
      descripcion: this.crypto.encryptJson(descripcion),
    }))

    this.loading = true;
    this.loader.loading()

    this.bancario.doConciliarCC(`${this.session.getDeviceId()};${data}`).subscribe(res => {

      const json = JSON.parse(this.crypto.decryptString(res))
      this.loading = false
      this.loader.stop()

      switch (json.R) {
        case constant.R0:
          const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))

          this.toaster.success(response0.M)
          this.router.navigateByUrl("admin/app/(adr:cobro-centralizado)")
          break;
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))

          this.toaster.error(response.M)
          break;
      }
    })
  }

  saveCentralizado() {
    this.modal.confirm("Se guardará el archivo.").subscribe(result => {
      if (result) {
        this.submitCentralizado(result)
      }
    })
  }


  getPlantillaRespuesta() {

    this.plantilla = null;


    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      codigo: this.crypto.encryptJson(this.archivo.id_banco),
    }))

    this.bancario.doGetPlantillaRespuesta(`${this.session.getDeviceId()};${data}`).subscribe(res => {

      const json = JSON.parse(this.crypto.decryptString(res))

      switch (json.R) {
        case constant.R0:
          this.plantilla = JSON.parse(this.crypto.decryptJson(json.plantilla)) as PlantillaRespuestaInterface[];
          break;
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.toaster.error(response.M)
          break;
      }

      //console.log(this.plantilla)
    })
    //**************************************************************************************************************************//
  }



}
