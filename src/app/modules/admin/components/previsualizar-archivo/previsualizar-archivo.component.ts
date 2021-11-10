import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-previsualizar-archivo',
  templateUrl: './previsualizar-archivo.component.html',
  styleUrls: ['./previsualizar-archivo.component.scss']
})
export class PrevisualizarArchivoComponent implements OnInit {

  @Input() data: any;
  @Input() displayedColumns: any;
  @Input() displayedColumnsNames: any;

  constructor() { }

  ngOnInit(): void {
  }

}
