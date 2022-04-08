import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  countNuevos;

  constructor(
    private title: Title, 
    private router: Router, 
    private excelService: ExportService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Inventario')
  }

  showInventario(inventario) {
    const navigationExtras: NavigationExtras = {
      state: {
        showInventario: inventario
      }
    }
    this.router.navigateByUrl(`/admin/app/(adr:inventario/detalle/${inventario.almacen_id})`, navigationExtras)
  }

}
