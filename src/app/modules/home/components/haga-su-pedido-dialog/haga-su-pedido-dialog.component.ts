import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-haga-su-pedido-dialog',
  templateUrl: './haga-su-pedido-dialog.component.html',
  styleUrls: ['./haga-su-pedido-dialog.component.scss']
})
export class HagaSuPedidoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HagaSuPedidoDialogComponent>) { }

  ngOnInit(): void {}

 
  onNoClick() {
    this.dialogRef.close();
  }
}