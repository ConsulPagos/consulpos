import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-pago-manual',
  templateUrl: './pago-manual.component.html',
  styleUrls: ['./pago-manual.component.scss']
})
export class PagoManualComponent implements OnInit {
  
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

}
