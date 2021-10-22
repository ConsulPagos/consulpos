import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-carrusel-landing',
  templateUrl: './carrusel-landing.component.html',
  styleUrls: ['./carrusel-landing.component.scss']
})
export class CarruselLandingComponent implements OnInit {

  products: any = [];
  loading = false;
  error = false;
  imgl;
  imgr;
  aux = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.error = false;
    this.loading = true;
    this.api.products_carousel().subscribe(data => {
      this.loading = false;
      this.products = data;
      this.delay();
    }, e => {
      this.error = true;
      this.loading = false;
    })
  }

  async delay(ms: number = 5000) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => {
      if (this.aux == this.products.length - 1) {
        this.aux = 0;
      } else {
        this.aux += 1;
      }

      if (this.aux % 2 == 0) {
        //par
        document.getElementById('imagem-l').className = 'show';
        document.getElementById('imagem-r').className = 'hidden';
      } else {
        //inpar
        document.getElementById('imagem-r').className = 'show';
        document.getElementById('imagem-l').className = 'hidden';
      }

    });
    this.delay();
  }
}
