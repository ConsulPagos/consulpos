import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressInterface } from 'src/app/models/address';
import { ZoneInterface } from 'src/app/models/zone';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.scss']
})
export class EditAddressDialogComponent implements OnInit {

  loading = false;
  submitted = false;
  direcciones: AddressInterface[] = []
  direccionSelected: AddressInterface = {}
  zones: ZoneInterface[] = [];
  loadingZones = false;
  errorZones = false;
  selectedZone: ZoneInterface = {};

  despachoForm = new FormGroup({
    calle: new FormControl('', [Validators.required]),
    edificio: new FormControl('', [Validators.required]),
    sector: new FormControl('', [Validators.required]),
    zona: new FormControl('', [Validators.required]),
    referencia: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<EditAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private auth: AuthService, private toaster: ToasterService, private api: ApiService, private storage: StorageService) { }

  ngOnInit(): void {
    this.direcciones = <AddressInterface[]>JSON.parse(localStorage.getItem('addresses'));
    this.loadZones();
  }

  loadZones() {
    this.errorZones = false;
    this.loadingZones = true;
    this.api.get_zones().subscribe(data => {
      console.log(data)
      this.zones = data['zones'];
      this.loadingZones = false;
    }, e => {
      this.errorZones = true;
    })
  }

  onChangeSel(value) {
    if (value == 'new') {
      this.direccionSelected = {};
    } else {
      this.direccionSelected = this.direcciones[value];
    }
  }

  onSubmit() {
    if(this.despachoForm.valid){
      this.loading = true;
    if (this.direccionSelected.id) {

      this.direccionSelected.id_zona = this.selectedZone.id;
      this.direccionSelected.zona = this.selectedZone.nombre;
      this.api.update_affiliate_address(this.direccionSelected).subscribe(data => {
        this.loading = false;
        this.dialogRef.close()
        this.storage.store('addresses', data['addresses']);
        this.toaster.success('Guardado con éxito');
      }, e => {
        this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente');
        this.loading = false;
        this.dialogRef.close()
      })
    } else {

      this.direccionSelected.id_afiliado = parseInt(this.auth.getUserId());
      this.direccionSelected.id_zona = this.selectedZone.id;
      this.direccionSelected.zona = this.selectedZone.nombre;

      this.api.new_affiliate_address(this.direccionSelected).subscribe(data => {
        this.loading = false;
        this.storage.store('addresses', data['addresses']);
        this.toaster.success('Guardado con éxito');
        this.dialogRef.close()
      }, e => {
        this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente');
        this.loading = false;
        this.dialogRef.close()
      })
    }
    }
  }
  delete() {
    this.loading = true;
    this.api.delete_affiliate_address(this.direccionSelected).subscribe(data => {
      this.loading = false;
      this.storage.store('addresses', data['addresses']);
      this.toaster.success('Eliminado con éxito');
      this.dialogRef.close()
    }, e => {
      this.toaster.error('Ha ocurrido un error inesperado, intentalo nuevamente');
      this.loading = false;
      this.dialogRef.close()
    })
  }

  setZone(index) {
    if (index) {
      this.selectedZone = this.zones[index]
    }else{
      this.selectedZone = null;
    }
  }
}
