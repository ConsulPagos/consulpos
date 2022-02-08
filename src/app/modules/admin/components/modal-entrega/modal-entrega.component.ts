import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.scss']
})
export class ModalEntregaComponent implements OnInit {

  dataVenta: any;

  constructor(public dialogRef: MatDialogRef<ModalEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
    {
    this.dataVenta = data['id_venta']
  }

  ngOnInit(): void {
  }

}
