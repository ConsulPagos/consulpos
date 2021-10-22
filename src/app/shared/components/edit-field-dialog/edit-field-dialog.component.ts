import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-field-dialog',
  templateUrl: './edit-field-dialog.component.html',
  styleUrls: ['./edit-field-dialog.component.scss']
})
export class EditFieldDialogComponent implements OnInit {

  inputValue:string = '';
  field_name:string;

  constructor(public dialogRef: MatDialogRef<EditFieldDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.field_name = this.data['field'];
    this.inputValue = (this.data['value'] as string).trim();
  }
  trim(){
    this.inputValue = this.inputValue.trim();
  }
}
