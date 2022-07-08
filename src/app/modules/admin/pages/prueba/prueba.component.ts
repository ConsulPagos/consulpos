import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  countNuevos;

  client: any;

  equipos: any = {};
  form: FormGroup;

  constructor(
    private title: Title,
    private router: Router,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.equipos
    ) {
      this.equipos = this.router.getCurrentNavigation().extras.state.equipos as any;
      console.log(this.equipos)

      this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        serial: new FormControl(this.equipos.equipo, [Validators.required]),
      });
    } else {
      this.router.navigateByUrl("/admin/app/(adr:prueba)");
    }
  }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Ventas')
  }

  showSale(sale) {
    const navigationExtras: NavigationExtras = {
      state: {
        equipos: sale
      }
    }
    console.log(sale)
    this.router.navigateByUrl(`/admin/app/(adr:validar-prueba-ficha/${sale.solicitud_id})`, navigationExtras)
  }

}
