import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-modal-asignacion',
  templateUrl: './modal-asignacion.component.html',
  styleUrls: ['./modal-asignacion.component.scss']
})
export class ModalAsignacionComponent implements OnInit {

  id_venta: number;

  constructor(
    public dialogRef: MatDialogRef<ModalAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.id_venta = data['id_venta']
  }

  ngOnInit(): void {
  }


}
