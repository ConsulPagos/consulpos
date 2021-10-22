import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SalidaInterface } from 'src/app/models/salida';
import { ProductInterface } from 'src/app/models/product';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-lector',
  templateUrl: './lector.component.html',
  styleUrls: ['./lector.component.scss']
})
export class LectorComponent implements OnInit {


  constructor(private routes: ActivatedRoute,private router: Router, private admin: AdminService, private auth: AuthService, private toaster: ToasterService) { }

  id;
  id_afiliado;
  order;
  affiliate;
  address;
  loading = false;
  error = false;
  trx = null;
  lectorData: SalidaInterface[] = [];
  barcode = '';
  loadingSalida = false;

  ngOnInit(): void {
    this.id = parseInt(this.routes.snapshot.paramMap.get('id_pedido'))
    this.id_afiliado = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
    this.load()
  }

  load() {
    this.loading = true;
    this.error = false;

    this.admin.get_order(this.id, this.id_afiliado, true).subscribe(data => {
      this.order = data['order'];
      this.affiliate = data['affiliate'];
      this.address = data['address'];
      this.trx = data['trx']
      this.loading = false;
    }, e => {
      this.error = true;
      this.loading = false;
    })
  }

  read() {
    if (this.barcode.length > 0) {
      this.admin.get_product_by_barcode(this.barcode).subscribe(data => {
        
        var product: ProductInterface = data;
        var old = this.lectorData.find(p => p.product.id == product.id);
        if (old) {
          this.lectorData.find(p => p.product.id == product.id).unidades += 1;
        } else if(product.id) {
          var item: SalidaInterface = { 'product': product, 'unidades': 1, 'admin': this.auth.getIdentity(), 'id_pedido': this.order.id, 'tipo': 'Unidad', 'id_producto':product.id, 'id_transaccion':this.order.id_transaccion};
          this.lectorData.push(item);
        }

      },e=>{
        this.toaster.error('Error al leer el código de barras')
      })
    }
  }
  deleteItem(item: SalidaInterface) {
    this.lectorData = this.lectorData.filter(i => i.product.id != item.product.id);
  }

  save(){
    this.loadingSalida = true;
     this.admin.new_salida(this.lectorData).subscribe(res=>{
      this.loadingSalida = false;
      this.router.navigateByUrl('/admin/app/(adr:salida-pedidos)');
      this.toaster.success('Guardado con éxito')
      
    },e=>{
      this.loadingSalida = false;
      this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
    }) 
  }
}
