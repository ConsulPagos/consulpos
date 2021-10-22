import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoInterface } from 'src/app/models/pedido';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-detalle-pedido',
  templateUrl: './admin-detalle-pedido.component.html',
  styleUrls: ['./admin-detalle-pedido.component.scss']
})
export class AdminDetallePedidoComponent implements OnInit {

  constructor(private routes: ActivatedRoute,private router:Router, private admin: AdminService, public dialog: MatDialog, private toaster: ToasterService) { }

  id;
  id_afiliado;
  order;
  affiliate;
  address;
  loading = false;
  error = false;
  trx = null;
  save_loading = false;


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

  acceptOrder(order: PedidoInterface) {

    var body = 'Se aceptará la orden #' + order.id;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.save_loading = true;
        this.admin.acceptOrder(order).subscribe(res => {
          this.toaster.success('Pedido aceptado');
          this.load();
          this.save_loading = false;
          this.router.navigateByUrl(`/admin/app/(adr:pedidos)`);
        }, e => {
          this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente');
          this.save_loading = false;
        })
      }
    });
  }

  getWALink(telefono){
    return `https://api.whatsapp.com/send?phone=${telefono}&text=Quiero%20comunicarme%20con%20${this.affiliate.nombre_empresa}%20de%20parte%20de%20Grupo%20Altius`
  }

}
