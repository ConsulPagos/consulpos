import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { ExcelReaderService } from '../../services/excel-reader.service';
import template from "../../file-templates/carga-masiva";
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { constant } from 'src/app/shared/utils/constant';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.scss']
})
export class CargaMasivaComponent implements OnInit {

  loading = false;


  data: any;
  columns: any;

  constructor(private excelReader: ExcelReaderService,
    private crypto: CryptoService,
    private storage: StorageService,
    private session: SesionService,
    private ventas: VentasService,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {

    const columns = []

    template.forEach(p => {
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
      this.excelReader.read(binarystr, "EXCEL", 0, template)
      this.loading = true
      const sub = this.excelReader.finished.subscribe((nData: any[]) => {
        this.loading = false
        this.data = nData;
        console.log("DATA");
        console.log(this.data);
        this.columns = columns;
        sub.unsubscribe()
      })
    };
  }

  submit() {

    this.loading = true;

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      archivo: this.crypto.encryptJson(JSON.stringify(this.data)),
    }))

    console.log("ARCHIVO");
    console.log(JSON.stringify(this.data));

    this.ventas.batchSales(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res));
      const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(response);
      this.loading = false;
      switch (response.R) {
        case constant.R0:
          this.toaster.success(response.M)
          this.data = null;
          this.columns = null;
          break;
        case constant.R1:
          this.toaster.error(response.M)
          break;
        default:
          this.toaster.default_error()
          break;
      }

    })
  }

  cancel(){
    this.columns = false;
    this.data = false;
  }
  

}
