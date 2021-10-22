import { Component, HostListener, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/models/product';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { ApiService } from '../../../../shared/services/api.service'
@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss']
})
export class PortafolioComponent implements OnInit {

  products: ProductInterface[];
  page = 1;
  loading = false;
  error = false;
  data;
  errorDetails;

  productsSub;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    if (!this.products) {
      this.load()
    }
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max && this.products.length > 0 && !this.loading && this.data != null && this.data['next_page'] != null) {
      this.load()
    }
  }

  load() {

    this.error = false;
    this.loading = true;

    this.productsSub = this.api.products(this.page, 1).subscribe(data => {
      
      this.page = this.page + 1;
      
      this.data = data
      console.log(data); //deleteee
     
      if (!this.products) {
        this.products = []
      }
      
      this.products = this.products.concat(data['data'])
      this.loading = false;
    }, e => {
      this.loading = false;
      this.error = true;
      this.errorDetails = e;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productsSub.unsubscribe();
  }
}
