import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';
import { ModalCentralizadoComponent } from '../../components/modal-centralizado/modal-centralizado.component';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-seleccion-centralizado',
  templateUrl: './seleccion-centralizado.component.html',
  styleUrls: ['./seleccion-centralizado.component.scss']
})
export class SeleccionCentralizadoComponent implements OnInit {

  displayedColumns: string[] = ["select", "afiliado", "serial", 'terminal', "rif", 'comercio', "tarifa"];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  equipos: any;
  banco: string;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private crypto: CryptoService,
    private loader: LoaderService,
    private bancario: BancarioService,
    private session: SesionService,
    private toaster: ToasterService,
    private storage: StorageService,
    private exports: ExportService
  ) {

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.equipos && this.router.getCurrentNavigation().extras.state.banco) {
      this.equipos = this.router.getCurrentNavigation().extras.state.equipos;
      this.banco = this.router.getCurrentNavigation().extras.state.banco;
      this.dataSource = new MatTableDataSource(this.equipos);
    } else {
      this.router.navigateByUrl("/admin/app/(adr:cobro-centralizado)");
    }
  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(ModalCentralizadoComponent, {
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { selected: this.selection.selected },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.submitSeleccion(result)
      }
    });
  }

  submitSeleccion(seleccion: any) {

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      equipos: this.crypto.encryptJson(JSON.stringify(seleccion))
    }))

    this.loader.loading()

    this.bancario.doUpdateClientList(`${this.session.getDeviceId()};${data}`).subscribe(res => {

      console.log(this.crypto.decryptString(res))

      const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loader.stop()
      const json = JSON.parse(this.crypto.decryptString(res));

      switch (json.R) {
        case constant.R0:

          var i = 0
          seleccion = seleccion.map((d: any) => {
            i++;
            return [i, d.afiliado, d.terminal, d.rif, d.razon_social, d.monto]
          })

          const s = []
          s.push(["N°", "N° Afiliado", "Terminal", "Rif del Comercio", "Nombre del Comerco", "Tarifa"])
          seleccion = [...s, ...seleccion]

          const pipe = new DatePipe('en-US');
          const now = Date.now();
          const myFormattedDate = pipe.transform(now, 'short');

          this.exports.exportExcel(seleccion, "Cobro centralizado_" + this.banco + "_" + myFormattedDate)
          this.toaster.success(response.M)
          this.router.navigateByUrl("/admin/app/(adr:cobro-centralizado)")

          break;
        case constant.R1:
        default:
          this.toaster.error(response.M)
          break;
      }

       

    })
  }




}
