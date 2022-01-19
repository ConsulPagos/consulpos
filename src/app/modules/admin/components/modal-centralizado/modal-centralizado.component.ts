import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent, DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modal-centralizado',
  templateUrl: './modal-centralizado.component.html',
  styleUrls: ['./modal-centralizado.component.scss']
})
export class ModalCentralizadoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalCentralizadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

  }


}
