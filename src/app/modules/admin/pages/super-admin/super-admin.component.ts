import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {

  countNuevos;
  usuarios = []

  constructor(
    private title: Title,
    private router: Router, 
    private excelService: ExportService,
    ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Usuarios')
  }

  exportXLSX(): void {
    this.excelService.exportExcel(this.usuarios, 'Archivo_' + new Date());
  }

  editUser(user) {
    const navigationExtras: NavigationExtras = {
      state: {
        showUser: user
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:edit-admin)", navigationExtras)
  }

  showUser(user) {
    const navigationExtras: NavigationExtras = {
      state: {
        showUser: user
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:ficha-user)", navigationExtras)
  }

}
