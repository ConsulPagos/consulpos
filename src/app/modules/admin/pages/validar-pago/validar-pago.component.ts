import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-validar-pago',
  templateUrl: './validar-pago.component.html',
  styleUrls: ['./validar-pago.component.scss']
})
export class ValidarPagoComponent implements OnInit {

  countNuevos;
  pay: any;

  constructor(
    private title:Title,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Validar Pago')
  }

  showPay(pay) {
    const navigationExtras: NavigationExtras = {
      state: {
        showPay: pay
      }
    }
    this.router.navigateByUrl("/admin/app/(adr:add-pagos)", navigationExtras)
  }
}
