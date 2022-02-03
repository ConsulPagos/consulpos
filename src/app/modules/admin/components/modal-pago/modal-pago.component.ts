import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss']
})
export class ModalPagoComponent implements OnInit {

  id_venta: number;

  constructor(public dialogRef: MatDialogRef<ModalPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.id_venta=data['id_venta']
    }


  ngOnInit(): void {
  }

}
