import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderInterface } from 'src/app/models/order';
import { PedidoInterface } from 'src/app/models/pedido';
import { MedioPagoInterface } from 'src/app/models/medio_pago';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SellInterface } from 'src/app/models/sell';

@Component({
  selector: 'app-confirm-pedido-dialog',
  templateUrl: './confirm-pedido-dialog.component.html',
  styleUrls: ['./confirm-pedido-dialog.component.scss']
})
export class ConfirmPedidoDialogComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  loading = false;
  date;
  startDateStr = new Date().toISOString().slice(0, 16);
  methods: MedioPagoInterface[] = [];
  loadingMethods = false;
  errorMethods = false;
  loadingStatus = false;
  errorStatus = false;
  status;

  constructor(public dialogRef: MatDialogRef<ConfirmPedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 'pedido': PedidoInterface, 'orders': OrderInterface[], 'sells': SellInterface[], 'address': string }, private fb: FormBuilder,
    private api: ApiService, private route: Router, private toaster: ToasterService, private storage: StorageService) { }

  ngOnInit(): void {

    this.data.pedido.programar_entrega = null;
    this.data.pedido.id_medio_pago = null;

    this.form = this.fb.group(
      { medio_pago: ["", [Validators.required]] }
    );

    this.loadMethods();
    this.loadStatus();

  }

  loadMethods() {
    this.loadingMethods = true;
    this.errorMethods = false;
    this.api.get_payment_methods().subscribe(methods => {
      this.methods = methods as MedioPagoInterface[];
      this.loadingMethods = false;
    }, e => {
      this.errorMethods = true;
    })
  }

  loadStatus() {
    this.loadingStatus = true;
    this.api.get_affiliate_status(this.data.pedido.id_afiliado).subscribe(res => {
      this.loadingStatus = false;
      this.status = res;
    }, e => {
      this.loadingStatus = false;
      this.errorStatus = true;
    })
  }

  onSubmit() {

    if (this.form.valid || this.status.has_credit) {
   
      if (!this.status.has_credit) {
        this.data.pedido.id_medio_pago = this.form.get('medio_pago').value;
      } else {
        this.data.pedido.id_medio_pago = null;
      }
      this.save();
    }
  }

  clear() {
    this.storage.clear('orders');
    this.storage.clear('sells');
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  save() {

    this.loading = true;
    var body = { 'order': this.data.pedido, 'sells': this.data.sells }

    this.api.add_order(body).subscribe(res => {
      this.loading = false;
      this.clear();
      this.dialogRef.close(true);
    }, e => {
      if (e.error['error']) {
        this.toaster.error(e.error['error'].msg);
      } else {
        this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente.');
      }
      this.loading = false;
    });
  }

}
