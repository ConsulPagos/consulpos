import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { ExcelReaderService } from '../../services/excel-reader.service';
import template from "../../file-templates/carga-masiva";
@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.scss']
})
export class CargaMasivaComponent implements OnInit {

  loading = false;


  data:any;
  columns:any;

  constructor(private excelReader: ExcelReaderService
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
        this.columns = columns;
        sub.unsubscribe()
      })
    };
  }

}
