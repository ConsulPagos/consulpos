import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchPosResponse, SearchPosDecrypter } from 'src/app/models/searchpos_response';
import { ShowInventarioDetalleDecrypter, ShowInventarioDetalleResponse } from 'src/app/models/showinventariodetalle_response';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-inventario-detalle',
  templateUrl: './inventario-detalle.component.html',
  styleUrls: ['./inventario-detalle.component.scss']
})
export class InventarioDetalleComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'numero_orden','numero_factura','marca', "modelo", 'serial', "aplicativo", "llave", "estatus"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  id: string;
  isLoadingResults = false;
  showInventarioResponse: any;
  inventarios = {};
  searchpos: SearchPosResponse;
  items: any[];

  constructor(
    private session: SesionService,
    private crypto: CryptoService,
    private storage: StorageService,
    private cliente: ClientesService,
    private modal: ModalService,
    private toaster: ToasterService,
    private router: Router,
    private inventario: InventarioService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.id = params['id']);
    this.showDetalle(this.id)

  }

  showDetalle(id) {
    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      id: this.crypto.encryptJson(id),
    }))
    this.isLoadingResults = true;

    console.log(data)
    this.inventario.doDetalleAlmacen(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.crypto.decryptString(res))
      this.showInventarioResponse = new ShowInventarioDetalleDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      console.log(this.showInventarioResponse)
      this.isLoadingResults = false;
      this.inventarios = this.showInventarioResponse.inventario
      this.searchPos()
    })
  }

  searchPos() {
    console.log('hola');

    const data = this.crypto.encryptString(JSON.stringify({
      u_id: this.crypto.encryptJson(this.storage.getJson(constant.USER).uid),
      correo: this.crypto.encryptJson(this.storage.getJson(constant.USER).email),
      scod: this.crypto.encryptJson(this.storage.getJson(constant.USER).scod),
      almacen_id: this.crypto.encryptJson(this.showInventarioResponse.inventario.almacen_id),
    }))


    this.inventario.doListarPosConfigurados(`${this.session.getDeviceId()};${data}`).subscribe(res => {
      console.log(this.showInventarioResponse.inventario.almacen_id);
      console.log(res)
      console.log(JSON.parse(this.crypto.decryptString(res)))
      this.searchpos = new SearchPosDecrypter(this.crypto).deserialize(JSON.parse(this.crypto.decryptString(res)))
      this.dataSource = new MatTableDataSource(this.searchpos.items)
      console.log(this.searchpos)
      this.items = this.searchpos.items
    })
  }


}
