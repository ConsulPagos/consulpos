import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressInterface } from 'src/app/models/address';
import { AfiliadoInterface } from 'src/app/models/afiliado';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-venta-manual',
  templateUrl: './venta-manual.component.html',
  styleUrls: ['./venta-manual.component.scss']
})
export class VentaManualComponent implements OnInit {

  afiliado: AfiliadoInterface;
  errorMsg = null;
  form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    afiliado: new FormControl('', [Validators.required])
  });

  constructor(private admin: AdminService, private storage: StorageService, private toaster: ToasterService) { }

  ngOnInit(): void {
  }

  search() {
    if (this.form.get('id').value) {
      this.errorMsg = null;
      this.admin.get_affiliate_shop_data(this.form.get('id').value).subscribe(data => {
        this.afiliado = data['affiliate'] as AfiliadoInterface;
        var addresses: AddressInterface[] = data['addresses'];
        this.storage.store('addresses', addresses);
        this.form.controls.afiliado.setValue(true);
      }, e => {
        this.errorMsg = 'Afiliado no encontrado, intentelo nuevamente.';
        this.afiliado = null;
      });
    }
  }

  success(value) {
    this.toaster.success('Completado con éxito.');
    this.afiliado = null;
    this.errorMsg = null;
  }

}
