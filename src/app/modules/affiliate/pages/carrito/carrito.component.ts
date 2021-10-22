import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderInterface } from 'src/app/models/order';
import { TransactionInterface } from 'src/app/models/transaction';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CartService } from '../../services/cart.service';
import { DocValidationService } from '../../services/doc-validation.service';
import { SellInterface } from 'src/app/models/sell';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { PedidoInterface } from 'src/app/models/pedido';
import { AddressInterface } from 'src/app/models/address';
import { ConfirmPedidoDialogComponent } from '../../components/confirm-pedido-dialog/confirm-pedido-dialog.component';

export interface DialogData {
  direccion?: string;
  tel?: string;
  calle?: string;
  edificio?: string;
  sector?: string;
  referencia?: string;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  direccionSelected: AddressInterface = {};

  constructor(public dialog: MatDialog,
    private auth: AuthService,
    private storage: StorageService,
    private cart: CartService,
    private api: ApiService,
    private route: Router,
    private toaster: ToasterService,
    private doc: DocValidationService) { }

  private order: PedidoInterface = {
    id: null,
    created_at: null,
    updated_at: null,
    id_afiliado: null,
    id_transaccion: null,
    aceptado: 0,
    estado: 'PENDIENTE',
    total: 0
  }

  orders: OrderInterface[] = [];
  sells: SellInterface[] = [];
  direcciones: AddressInterface[] = []
  total = 0;
  descuento: number = null;
  loading = false;

  ngOnInit(): void {

    if (localStorage.getItem('orders')) {
      this.parseOrders();
    }

    this.direcciones = <AddressInterface[]>JSON.parse(localStorage.getItem('addresses'));
    this.direccionSelected = this.direcciones[0];
    this.subscribe();
  }

  subscribe() {
    this.storage.changes.subscribe(s => {
      if (s.key == 'orders') {
        if (s.value == null) {
          this.orders = [];
        } else {
          this.orders = s.value;
        }
        this.getTotal();
      } else if (s.key == 'sells') {
        this.sells = s.value;
      } else if (s.key == 'addresses') {
        this.direcciones = s.value;
      }
    });
  }

  clear() {
    this.storage.clear('orders');
    this.storage.clear('sells');
  }

  removeOrder(event, order) {
    var sell: SellInterface = this.sells.find(s => s.id_presentacion == order.format.id);
    this.cart.remove_sell(sell);
    this.cart.remove(order);
  }

  getCount() {
    return this.orders.length;
  }

  parseOrders() {
    this.orders = <OrderInterface[]>JSON.parse(localStorage.getItem('orders'));
    this.sells = <SellInterface[]>JSON.parse(localStorage.getItem('sells'));
  }

  getTotal() {
    this.total = 0;
    this.orders.forEach(order => {
      if (!order.descuento) {
        this.total = this.total + (order.units * order.format.precio)
      } else {
        this.descuento = order.descuento;
        this.total = this.total + (order.units * order.format.precio - (order.units * order.format.precio * (order.descuento / 100)))
      }
    });
  }

  updateUnits(new_value, order) {

    this.orders[this.orders.indexOf(order)].units = new_value;

    var sell: SellInterface = this.sells.find(s => s.id_presentacion == order.format.id);
    this.sells[this.sells.indexOf(sell)].unidades = new_value;

    this.storage.store('sells', this.sells);
    this.storage.store('orders', this.orders);

  }

  confirmAction() {
    if (this.doc.verificate(true)['valid']) {
      this.confirm()
    } else {
      this.close()
    }
  }

  save() {

    this.loading = true;

    this.order.id_afiliado = parseInt(this.auth.getUserId());
    this.order.total = this.total;
    this.order.id_direccion = this.direccionSelected.id;
    this.order.descuento = this.descuento;

    var body = { 'order': this.order, 'sells': this.sells }

    this.api.add_order(body).subscribe(res => {
      this.loading = false;
      this.clear();
      this.close();
      this.route.navigateByUrl("/afiliado/app/(afr:pedido-confirmado)");
    }, e => {
      if (e.error['error']) {
        this.toaster.error(e.error['error'].msg);
      } else {
        this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente.');
      }
      this.close();
      this.loading = false;
    });
  }


  confirm() {

    this.order.id_afiliado = parseInt(this.auth.getUserId());
    this.order.total = this.total;
    this.order.id_direccion = this.direccionSelected.id;
    this.order.descuento = this.descuento;

    var address = this.direccionSelected.calle + ' ' + this.direccionSelected.edificio + ' ' + this.direccionSelected.sector + ' ' + this.direccionSelected.referencia + ' ' + this.direccionSelected.zona
    var body = { 'pedido': this.order, 'orders': this.orders, 'sells': this.sells, 'address': address }

    this.close();

    const dialogRef = this.dialog.open(ConfirmPedidoDialogComponent, {
      width: '450px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: body
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.route.navigateByUrl("/afiliado/app/(afr:pedido-confirmado)");

      }
    });
  }

  open() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log(w)
    if (w < 500) {
      document.getElementById("sidepanel").style.width = "100%";
      document.getElementById("sidepanel").style.right = "0";
    } else {
      document.getElementById("sidepanel").style.right = "0";
    }

    document.getElementById("carrito_background").style.width = "100%";

  }

  close() {

    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (w < 500) {
      document.getElementById("sidepanel").style.right = "-100%";
    } else {
      document.getElementById("sidepanel").style.right = "-500px";
    }

    document.getElementById("carrito_background").style.width = "0";

  }
  nothing() {

  }
  setAddress(value) {
    this.direccionSelected = this.direcciones[value]
  }
}
