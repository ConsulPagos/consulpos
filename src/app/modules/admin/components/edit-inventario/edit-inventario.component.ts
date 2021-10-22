import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInterface } from 'src/app/models/product';
import { IngresoInterface } from 'src/app/models/ingreso';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-inventario',
  templateUrl: './edit-inventario.component.html',
  styleUrls: ['./edit-inventario.component.scss']
})
export class EditInventarioComponent implements OnInit {

  constructor(private routes: ActivatedRoute, private router: Router, private api: ApiService, private admin: AdminService, public dialog: MatDialog, private toaster: ToasterService) { }

  id;
  id_afiliado;
  product: ProductInterface;
  affiliate;
  loading = false;
  error = false;
  entry: IngresoInterface = {};

  entryForm = new FormGroup({
    factura: new FormControl('', [Validators.required]),
    cajas: new FormControl('', [Validators.required, Validators.minLength(1)]),
    unidades_caja: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  ngOnInit(): void {

    this.id = parseInt(this.routes.snapshot.paramMap.get('id_product'))
    this.load()

  }

  load() {
    this.loading = true;
    this.error = false;

    this.api.get_product(this.id).subscribe(data => {
      this.product = data['product'];
      this.loading = false;
    }, e => {
      this.error = true;
      this.loading = false;
    })
  }

  new_entry() {

    if (this.entryForm.valid) {

      this.entry.id_producto = this.product.id;
      this.entry.cantidad_cajas = this.entryForm.get('cajas').value
      this.entry.unidades_caja = this.entryForm.get('unidades_caja').value 

      var body = 'Se guardará el nuevo ingreso';

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        height: 'auto',
        panelClass: 'custom-dialog',
        data: { 'body': body }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.toaster.progress('Guardando...')
          this.admin.new_entry(this.entry, this.product.id).subscribe(res => {
            this.toaster.success('Guardado con éxito')
            this.router.navigateByUrl('/admin/app/(adr:inventario)')
          }, e => {
            this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
          })
        }
      });
    }
  }
  divide(stock,unidad){
    var cajas = Math.floor((stock/unidad))
    var unidades = Math.round(((stock/unidad) - cajas)*unidad)
    return `${cajas} cajas con ${unidades} unidad(es)`
  }
}
