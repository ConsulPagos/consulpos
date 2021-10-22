import { Component, Input, OnInit } from '@angular/core';
import {ProductInterface} from '../../../models/product'
@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {

  @Input() product:ProductInterface;
  @Input() discount:number;

  constructor() { }

  ngOnInit(): void {
    
  }

}
