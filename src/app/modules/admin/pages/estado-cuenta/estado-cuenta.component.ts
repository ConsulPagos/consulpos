import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { DefaultDecrypter } from 'src/app/models/default_response';
import { ItemEstadoCuentaInterface } from 'src/app/models/itemestadocuenta';
import { ShowItemResponse } from 'src/app/models/showitem';
import { BancarioService } from 'src/app/shared/services/bancario.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';
import pdfMaker from 'src/app/shared/utils/pdf';
import { StatusAccountDecrypter, StatusAccountResponse } from '../../../../models/statusaccount';
import { DiferirDeudaComponent } from '../../components/diferir-deuda/diferir-deuda.component';


@Component({
  selector: 'app-estado-cuenta',
  templateUrl: './estado-cuenta.component.html',
  styleUrls: ['./estado-cuenta.component.scss']
})
export class EstadoCuentaComponent implements OnInit {

  displayedColumns: string[] = ["select", 'serial', "concepto", 'fecha', "deuda", "abono"];
  dataSource: MatTableDataSource<any>;
  countNuevos = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showClient: ClienteRequestInterface = {};
  loading: boolean;
  showItemClient: ShowItemResponse;
  showStatusAccount: StatusAccountResponse;
  @Input() rif;
  @Input() client:ClienteRequestInterface;
  selection = new SelectionModel<ItemEstadoCuentaInterface>(true, []);


  constructor(
    private title: Title,
    private crypto: CryptoService,
    private cliente: ClientesService,
    private bancario: BancarioService,
    private storage: StorageService,
    private router: Router,
    private session: SesionService,
    private dialog: MatDialog,
    private loader: LoaderService,
    private toaster: ToasterService
  ) {
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras && this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.showClient) {
      this.showClient = this.router.getCurrentNavigation().extras.state.showClient as ClienteRequestInterface;
    }
    // else {
    //   this.router.navigateByUrl("/admin/app/(adr:clientela)");
    // }

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Estado de Cuenta')
    this.doStatusAccount()
  }

  doStatusAccount() {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      rif: this.crypto.encryptJson(this.rif),
    }))
    this.loading = true;
    this.loader.loading()
    this.cliente.doStatusAccount(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      this.showStatusAccount = new StatusAccountDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loader.stop()
      console.log(this.showStatusAccount)
      this.dataSource = new MatTableDataSource(this.showStatusAccount.estado_de_cuenta.items)
      console.log(this.crypto.decryptString(res))
      this.loading = false
       //this.crypto.setKeys(this.showStatusAccount.keyS, this.showStatusAccount.ivJ, this.showStatusAccount.keyJ, this.showStatusAccount.ivS)
      //const pdf = new pdfMaker()
      //pdf.createPdf(this.client, this.showStatusAccount.estado_de_cuenta)
    })
  }

  doDiferir(id_diferido: string, cuotas) {


    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      id_diferido: this.crypto.encryptJson(id_diferido),
      cuotas: this.crypto.encryptJson(JSON.stringify(cuotas)),
    }))

    this.loading = true;
    this.loader.loading()
    this.bancario.doDiferir(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      
      const response = new DefaultDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.loader.stop()
      this.loading = false
      console.log(response)
      
       

      if (response.R === "0") {
        this.selection.clear()
        this.doStatusAccount()
      } else {
        this.toaster.success(response.M)
      }

      
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deuda() { return this.showStatusAccount.estado_de_cuenta.total_debito - this.showStatusAccount.estado_de_cuenta.total_credito }
  hasDeuda() { return this.deuda() > 0 }

  openDialogDiferir(): void {

    const dialogRef = this.dialog.open(DiferirDeudaComponent, {
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { selected: this.selection.selected },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const cuotas = result.cuotas.map(c => {
          const aux = { id: c.id_estado_cuenta }
          return aux
        })
        console.log(cuotas)
        this.doDiferir(result.id_diferido, cuotas)
      }
    });
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

  canDiferir() {
    var valid = true
    for (let index = 0; index < this.selection.selected.length; index++) {
      const s = this.selection.selected[index];
      if (s.t_cobro != "DEBITO") {
        valid = false;
        break;
      } else {
        if (s.id_diferido) {
          valid = false;
          break;
        }
      }

    }
    return valid
  }

}
