import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modal-key-so',
  templateUrl: './modal-key-so.component.html',
  styleUrls: ['./modal-key-so.component.scss']
})
export class ModalKeySoComponent implements OnInit {

  isKey = false;
  isSo = false;

  constructor(
    public dialogRef: MatDialogRef<ModalKeySoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }


}
