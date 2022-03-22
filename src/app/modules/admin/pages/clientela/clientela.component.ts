import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { ClienteRequestInterface } from 'src/app/models/cliente_request';
import { ExportService } from '../../services/export.service';


@Component({
  selector: 'app-clientela',
  templateUrl: './clientela.component.html',
  styleUrls: ['./clientela.component.scss']
})
export class ClientelaComponent implements OnInit {


  countNuevos;

  client: ClienteRequestInterface;
  clientes = []

  constructor(
    private title: Title, 
    private router: Router, 
    private excelService: ExportService,
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Clientes')
  }

  exportXLSX(): void {
    this.excelService.exportExcel(this.clientes, 'Archivo_' + new Date());
  }

  editClient(client) {
    const navigationExtras: NavigationExtras = {
      state: {
        editClient: client
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-client)", navigationExtras)
  }

  showClient(client) {
    const navigationExtras: NavigationExtras = {
      state: {
        showClient: client
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:ficha-cliente)", navigationExtras)
  }

  
}
