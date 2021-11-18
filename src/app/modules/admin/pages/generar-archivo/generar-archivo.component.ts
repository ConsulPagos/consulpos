import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BancoInterface } from 'src/app/models/banco';
import { PaymentInterface } from 'src/app/models/payment';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminService } from '../../services/admin.service';
import { MesInterface } from '../../../../models/mes'
 

@Component({
  selector: 'app-generar-archivo',
  templateUrl: './generar-archivo.component.html',
  styleUrls: ['./generar-archivo.component.scss']
})
export class GenerarArchivoComponent implements OnInit {

  id;
  id_afiliado;
  loading = false;
  error = false;
  payment: PaymentInterface = {}
  methods;
  loading_methods = false;
  error_methods = false;

  form = new FormGroup({
    banco: new FormControl('', [Validators.required]),
    mes: new FormControl('', [Validators.required]),
  });

  constructor(private admin: AdminService, private api: ApiService, private auth: AuthService, private routes: ActivatedRoute, private router: Router) { }

  value = 'Clear me';

  bancos: BancoInterface[] = [{
    id_banco: 1,
    banco: 'BANCO DE VENEZUELA',
    codigo: '0102',
    id_plataforma: 1,
  }]

  meses: MesInterface[] = [{
    id: 1,
    mes:'Enero'
  },
  {
    id: 2,
    mes:'Febrero'
  }]

  procesos = [{
    id: 1,
    fecha: '10/11/2021 2:54 pm',
    trace: '11558'
  }]


  ngOnInit(): void {
    this.id = parseInt(this.routes.snapshot.paramMap.get('id_pedido'))
    this.id_afiliado = parseInt(this.routes.snapshot.paramMap.get('id_afiliado'))
    this.payment.admin = this.auth.getIdentity()
    this.loadMethods()
  }

  loadMethods() {
    this.error_methods = false;
    this.loading_methods = true;
    this.api.get_payment_methods().subscribe(data => {
      this.loading_methods = false;
      this.methods = data
    }, e => {
      this.error_methods = true;
    })
  }

  submit() {
    this.payment.cash_recibido = this.form.get('cash').value
    this.payment.factura = this.form.get('factura').value
    this.payment.id_medio_pago = this.form.get('metodo').value
    this.payment.id_pedido = this.id
    this.loading = true;
    this.admin.new_payment(this.payment).subscribe(res => {
      this.loading = false;
      this.router.navigateByUrl(`/admin/app/(adr:cobros/${this.id_afiliado})`);
    }, e => {
      this.error = true;
      this.loading = false;
    })
  }

}
