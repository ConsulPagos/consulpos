import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-modal-cambio-almacen',
  templateUrl: './modal-cambio-almacen.component.html',
  styleUrls: ['./modal-cambio-almacen.component.scss']
})
export class ModalCambioAlmacenComponent implements OnInit {

  almacenes: any[];

  constructor(
    private storage: StorageService,
  ) { }

  form = new FormGroup({
    almacen_destino: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
  });

  ngOnInit(): void {
    this.almacenes = JSON.parse(this.storage.get(constant.ALMACENES)).almacenes
  }

}
