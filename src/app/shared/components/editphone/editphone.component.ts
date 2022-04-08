import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { TelefonoInterface } from 'src/app/models/telefono';
import { DialogData } from '../confirm-dialog/confirm-dialog.component';
import { EditFieldDialogComponent } from '../edit-field-dialog/edit-field-dialog.component';

@Component({
  selector: 'app-editphone',
  templateUrl: './editphone.component.html',
  styleUrls: ['./editphone.component.scss']
})
export class EditphoneComponent implements OnInit {

  editPhone: TelefonoInterface;
  phones: any
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Venezuela, CountryISO.UnitedStates];

  constructor(public dialogRef: MatDialogRef<EditFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data.value.length > 0) {
      this.phones = new FormGroup({
        phone_1: new FormControl(this.data.value[0].identificador + this.data.value[0].telefono, [Validators.required]),
        phone_1_id: new FormControl(this.data.value[0].telefono_id, [Validators.required]),
        phone_2: new FormControl(this.data.value[1].identificador + this.data.value[1].telefono, [Validators.required]),
        phone_2_id: new FormControl(this.data.value[1].telefono_id, [Validators.required]),
      });
    }
  }




}
