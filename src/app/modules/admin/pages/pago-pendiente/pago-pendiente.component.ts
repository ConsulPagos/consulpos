import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-pago-pendiente',
  templateUrl: './pago-pendiente.component.html',
  styleUrls: ['./pago-pendiente.component.scss']
})
export class PagoPendienteComponent implements OnInit {

  countNuevos;
  pay: any;

  constructor(
    private title:Title,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Pagos')
  }

  _addPay(pay) {
    const navigationExtras: NavigationExtras = {
      state: {
        addPay: pay
      }
    }
    console.log(pay)
    this.router.navigateByUrl("/admin/app/(adr:add-pago-manual)", navigationExtras)
  }


}
