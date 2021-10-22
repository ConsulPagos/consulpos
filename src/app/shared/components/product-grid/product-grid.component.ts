import { Component, Input, OnInit } from '@angular/core';
import { SellInterface } from 'src/app/models/sell';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @Input() ventas: SellInterface[];

  constructor() { }

  ngOnInit(): void {
    this.ventas = this.ventas.slice(0,3);
  }

}
