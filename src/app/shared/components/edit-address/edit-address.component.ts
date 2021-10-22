import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from '../../services/toaster.service';
import { DialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {


  changePasswordForm: FormGroup;
  submitted: boolean = false;
  loading = false;


  constructor(public dialogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private fb: FormBuilder, private toaster: ToasterService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(5)]],
        new_password: ["", [Validators.required, Validators.minLength(5)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(5)]],
        email: [""]
      }
    );
  }

  onSubmit() {

    this.submitted = true;

    if (this.changePasswordForm.valid) {
      
    }

  }

}
