import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { DialogData } from '../confirm-dialog/confirm-dialog.component';
import { EditFieldDialogComponent } from '../edit-field-dialog/edit-field-dialog.component';

@Component({
  selector: 'app-editphone',
  templateUrl: './editphone.component.html',
  styleUrls: ['./editphone.component.scss']
})
export class EditphoneComponent implements OnInit {

  
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Venezuela, CountryISO.UnitedStates];

  constructor(public dialogRef: MatDialogRef<EditFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  phones = new FormGroup({
    phone: new FormControl('', [Validators.required]),
  });

}
