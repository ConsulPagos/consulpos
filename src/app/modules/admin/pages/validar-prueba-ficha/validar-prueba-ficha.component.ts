import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalAsignacionPruebaComponent } from '../../components/modal-asignacion-prueba/modal-asignacion-prueba.component';

@Component({
  selector: 'app-validar-prueba-ficha',
  templateUrl: './validar-prueba-ficha.component.html',
  styleUrls: ['./validar-prueba-ficha.component.scss']
})
export class ValidarPruebaFichaComponent implements OnInit {


  item: any = {};

  constructor(
    private title: Title,
    private router: Router,
    public dialog: MatDialog,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.item
    ) {
      this.item = this.router.getCurrentNavigation().extras.state.item as any;
      console.log(this.item)
    } else {
      this.router.navigateByUrl("/admin/app/(adr:prueba)");
    }
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ficha Venta')
  }

  openDialog(item): void {
    if (this.item.status_desc === "PRUEBAS") {
      var dialogRef: any = this.dialog.open(ModalAsignacionPruebaComponent, {
        disableClose: true,
        height: 'auto',
        panelClass: 'custom-dialog',
        data: { item: item },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {

        }
      });
    }
  }

}
