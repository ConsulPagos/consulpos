import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidarPruebaDecrypter, ValidarPruebaResponse } from 'src/app/models/validar_prueba';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { VentasService } from 'src/app/shared/services/ventas.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-validar-prueba',
  templateUrl: './validar-prueba.component.html',
  styleUrls: ['./validar-prueba.component.scss']
})
export class ValidarPruebaComponent implements OnInit {

  countNuevos;
  showSale: any = {};
  client: any;
  default: ValidarPruebaResponse;
  id: string;

  constructor(
    private crypto: CryptoService,
    private ventas: VentasService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params =>
      this.id = params['id']);
  }

  ngOnInit(): void {
  }

}
