import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

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
    this.router.navigateByUrl("/admin/app/(adr:add-pagos)", navigationExtras)
  }
}
