import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuotaInterface } from 'src/app/models/cuota';
import { ModalService } from 'src/app/shared/services/modal.service';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import * as XLSX from "xlsx";
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { ToasterService } from 'src/app/shared/services/toaster.service';


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
  loading = false;

  columns = ["rif", "cuenta", "afiliado", "cobrado", "mensaje"]

  constructor(private route: ActivatedRoute, private router: Router, private modal: ModalService, private bancario: BancarioService, private crypto: CryptoService, private storage: StorageService, private session: SesionService, private toaster: ToasterService) {
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
    this.loading = true;
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
        const nCuota: CuotaInterface = { rif: cuota[this.columns[0]], cuenta: cuota[this.columns[1]], afiliado: cuota[this.columns[2]], cobrado: parseFloat(cuota[this.columns[3]]), mensaje: cuota[this.columns[4]], }
        nData.push(nCuota)
      });
      this.data = nData
      console.log(nData)
      this.loading = false;
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

    console.log(JSON.stringify(this.data))

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      id_archivo: this.crypto.encryptJson(this.archivo.id),
      archivo: this.crypto.encryptJson(JSON.stringify(this.data)),
    }))

    this.loading = true;

    this.bancario.doConciliacion(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      
      const json = JSON.parse(this.crypto.decryptString(res))
      this.loading = false

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


}
