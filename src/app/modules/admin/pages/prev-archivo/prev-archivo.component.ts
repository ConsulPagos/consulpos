import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CuotaInterface } from 'src/app/models/cuota';
import { ModalService } from 'src/app/shared/services/modal.service';
import * as XLSX from "xlsx";


@Component({
  selector: 'app-prev-archivo',
  templateUrl: './prev-archivo.component.html',
  styleUrls: ['./prev-archivo.component.scss']
})
export class PrevArchivoComponent implements OnInit {

  data: CuotaInterface[];
  progress: number = 0;
  id: any;
  archivo: any;

  columns = ["doc", "cuenta", "afiliado", "cobrado", "mensaje"]

  constructor(private route: ActivatedRoute, private router: Router, private modal: ModalService) {
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.archivo) {
      this.archivo = this.router.getCurrentNavigation().extras.state.archivo
    }
  }

  ngOnInit(): void {

    this.route.params.subscribe(p => {
      this.id = p.id
    });

  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    console.log(target.files[0])
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      console.log(wsname)
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const json = XLSX.utils.sheet_to_json(ws);
      console.log(json)
      const nData: CuotaInterface[] = []
      json.forEach(cuota => {
        console.log(cuota)
        const nCuota: CuotaInterface = { doc: cuota[this.columns[0]], cuenta: cuota[this.columns[1]], afiliado: cuota[this.columns[2]],  cobrado: parseFloat(cuota[this.columns[3]]), mensaje: cuota[this.columns[4]], }
        nData.push(nCuota)
      });
      this.data = nData
      console.log(nData)
      this.progress = 100
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
    return this.data.map(t => t.monto).reduce((acc, value) => acc + value, 0);
  }

  getTotalCobrado() {
    return this.data.map(t => t.cobrado).reduce((acc, value) => acc + value, 0);
  }

  save() {
    this.modal.confirm("Desea guardar el archivo?").subscribe(result => {
      if (result) {
        console.log("acciones")
      }
    })
  }

}
