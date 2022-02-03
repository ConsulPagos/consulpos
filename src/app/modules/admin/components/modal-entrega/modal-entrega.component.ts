import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ModalPagoComponent } from '../modal-pago/modal-pago.component';

@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.scss']
})
export class ModalEntregaComponent implements OnInit {

  id_venta: number;

  constructor(public dialogRef: MatDialogRef<ModalPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.id_venta = data['id_venta']
  }

  ngOnInit(): void {
  }

}
