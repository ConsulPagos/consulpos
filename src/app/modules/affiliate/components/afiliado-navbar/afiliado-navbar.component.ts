import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderInterface } from 'src/app/models/order';
import { ProductInterface } from 'src/app/models/product';
import { CartService } from 'src/app/modules/affiliate/services/cart.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from '../../../../shared/services/auth.service'
import { CarritoComponent } from '../../pages/carrito/carrito.component';
import { DocValidationService } from '../../services/doc-validation.service';

@Component({
  selector: 'app-afiliado-navbar',
  templateUrl: './afiliado-navbar.component.html',
  styleUrls: ['./afiliado-navbar.component.scss']
})
export class AfiliadoNavbarComponent implements OnInit {

  @ViewChild(CarritoComponent) carrito: CarritoComponent;

  identity = '';
  toggleNavbar = true;
  state = '';
  cartCount = 0;
  isVerificate = {'valid':true, 'access_level':4};

  constructor(private auth: AuthService, private cart: CartService, private storage: StorageService, private doc: DocValidationService) {
    this.identity = this.auth.getIdentity();
    this.state = this.auth.getState();
  }

  ngOnInit(): void {

    this.cartCount = this.cart.all().length;
    this.isVerificate = this.doc.verificate(false);

    this.storage.changes.subscribe(s => {
      if (s.key == 'orders') {
        if (s.value == null) {
          this.cartCount = 0;
        } else {
          var orders = s.value as OrderInterface[];
          this.cartCount = orders.length;
        }
      }else if (s.key == 'access_level') {
        this.isVerificate = this.doc.verificate(false);
      }
    })

  }

  loggout() {
    this.auth.loggout();
  }

  open() {
    this.carrito.open();
    this.hideMenu();
  }

  hideMenu() {
    if (!this.toggleNavbar) {
      this.toggleNavbar = true;
    }
  }

  verification() {
    this.doc.verificate(true);
  }

}
