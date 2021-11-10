import { Component, Input, OnInit } from '@angular/core';
import { CuotaInterface } from "../../../../models/cuota";
@Component({
  selector: 'app-previsualizar-archivo',
  templateUrl: './previsualizar-archivo.component.html',
  styleUrls: ['./previsualizar-archivo.component.scss']
})
export class PrevisualizarArchivoComponent implements OnInit {

  @Input() data: CuotaInterface[];
  @Input() displayedColumns: any;
  columns: string[] = ['documento', 'cuenta', 'monto','cobrado', 'mensaje' ];
  @Input() progress: number = 0;

  constructor() { }

  ngOnInit(): void {
  }
  getTotalMonto() {
    return this.data.map(t => t.monto).reduce((acc, value) => acc + value, 0);
  }

  getTotalCobrado() {
    return this.data.map(t => t.cobrado).reduce((acc, value) => acc + value, 0);
  }


}
