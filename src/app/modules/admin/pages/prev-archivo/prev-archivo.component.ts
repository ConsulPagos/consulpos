import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';


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

  columns = []
  isCentralizado = false

  constructor(private route: ActivatedRoute,
    private router: Router, private modal: ModalService,
    private bancario: BancarioService,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private toaster: ToasterService,
    private dialog: MatDialog,
    private loader: LoaderService) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.archivo) {

      this.archivo = this.router.getCurrentNavigation().extras.state.archivo
      this.tipo_archivo = this.router.getCurrentNavigation().extras.state.tipo_archivo
      this.n_pagina = this.router.getCurrentNavigation().extras.state.n_pagina

      if (this.router.getCurrentNavigation().extras.state.data) {
        this.data = this.router.getCurrentNavigation().extras.state.data
        console.log(this.data)
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

    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      const wsname: string = wb.SheetNames[this.n_pagina];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const json = XLSX.utils.sheet_to_json(ws);
      const nData: any = []

      json.forEach(cuota => {
        console.log(cuota)
        var data = {};
        for (let index = 0; index < this.plantilla.length; index++) {
          const col = this.plantilla[index];
          data[col.columna] = this.parseValue(col.tipo, cuota[col.nombre], col.decimales);
        }

        nData.push(data)

      });

      console.log(nData)
      console.log(columns)

      this.data = nData;
      this.columns = columns;
      this.loading = false;

    };
  }

  onFileChangeTXT(event: any) {

    var data: [{}];
    const columns = []

    this.plantilla.forEach(p => {
      columns.push(p.nombre);
    })

    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    console.log(target.files[0])
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      var lines = e.target.result.split('\n');

      lines.forEach((l: string) => {
        const line = l.trim();
        var json = {};
        for (let index = 0; index < this.plantilla.length; index++) {

          const col = this.plantilla[index];


          if (line.length > 0) {
            const value = line.substring(col.inicia, col.inicia + col.longitud);
            json[`${col.nombre}`] = this.parseValue(col.tipo, value, col.decimales);
          }
        }

        if (line.length > 0) {
          if (data == undefined) {
            data = [json]
          } else {
            data.push(json);
          }
        }

      });

      console.log(data)
      this.data = data;
      this.columns = columns;

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
        console.log("acciones")
        this.submit()
      }
    })
  }

  submit() {

    //console.log(JSON.stringify(this.data))

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
          this.crypto.setKeys(response0.keyS, response0.ivJ, response0.keyJ, response0.ivS)
          this.toaster.success(response0.M)
          this.router.navigateByUrl("admin/app/(adr:actualizar-archivo)")
          break;
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
          this.toaster.error(response.M)
          break;
      }
    })
    //**************************************************************************************************************************//
  }


  confirmCentralizado(){
    const dialogRef = this.dialog.open(EditFieldDialogComponent, {
      width: '350px',
      height:'auto',
      panelClass:'custom-dialog',
      data: { 'field': "Concepto","value":"" }
    });

    dialogRef.afterClosed().subscribe((result:string) => {
      if(result.length > 0){
        this.submitCentralizado(result)
      }
    })
  }

  submitCentralizado(descripcion:string) {
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
          this.crypto.setKeys(response0.keyS, response0.ivJ, response0.keyJ, response0.ivS)
          this.toaster.success(response0.M)
          this.router.navigateByUrl("admin/app/(adr:cobro-centralizado)")
          break;
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
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

    this.loader.loading()

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      codigo: this.crypto.encryptJson(this.archivo.id_banco),
    }))

    this.bancario.doGetPlantillaRespuesta(`${this.session.getDeviceId()};${data}`).subscribe(res => {

      const json = JSON.parse(this.crypto.decryptString(res))

      console.log(json)

      this.loader.stop()

      switch (json.R) {
        case constant.R0:
          const response0 = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.plantilla = JSON.parse(this.crypto.decryptJson(json.plantilla)) as PlantillaRespuestaInterface[];
          this.crypto.setKeys(response0.keyS, response0.ivJ, response0.keyJ, response0.ivS)
          break;
        case constant.R1:
        default:
          const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
          this.crypto.setKeys(response.keyS, response.ivJ, response.keyJ, response.ivS)
          this.toaster.error(response.M)
          break;
      }

      console.log(this.plantilla)
    })
    //**************************************************************************************************************************//
  }

  parseValue(type: string, value: string, d: number) {
    var data: any = value;
    switch (type) {
      case "string":
        data = value.toString();
        break;
      case "int":
        data = parseInt(value);
        break;
      case "double":
        if (d > 0) {
          data = (parseFloat(value.trim().replace(".", '').replace(",", '.')) / Math.pow(10, d)).toFixed(d)
        } else {
          data = parseFloat(value.trim().replace(".", '').replace(",", '.')).toFixed(2);
          console.log(data)
        }
        break;
      default:
        data = value;
        break;
    }

    return data;
  }

}
