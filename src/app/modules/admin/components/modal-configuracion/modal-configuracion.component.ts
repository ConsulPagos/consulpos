import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ModalAsignacionComponent } from '../modal-asignacion/modal-asignacion.component';

@Component({
  selector: 'app-modal-configuracion',
  templateUrl: './modal-configuracion.component.html',
  styleUrls: ['./modal-configuracion.component.scss']
})
export class ModalConfiguracionComponent implements OnInit {

  id_venta: number;

  constructor(public dialogRef: MatDialogRef<ModalAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.id_venta=data['id_venta']
    }

  ngOnInit(): void {
  }
}
