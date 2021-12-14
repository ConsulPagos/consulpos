import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneracionResponse } from 'src/app/models/generacion_response';
import { ExportService } from '../../services/export.service'

@Component({
  selector: 'app-result-file',
  templateUrl: './result-file.component.html',
  styleUrls: ['./result-file.component.scss']
})

export class ResultFileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResultFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {archivo: GeneracionResponse, time:number},
    private excelService: ExportService
  ) { }

  ngOnInit(): void {
    console.log(this.data.archivo)
  }

  close(){
    this.dialogRef.close();
  }

  getSeparador(usarComa){
    if(usarComa === 0){
      return 'Punto (.)'
    }else if(usarComa === 1){
      return 'Coma (,)'
    }else if(usarComa === 2){
      return 'Sin separador'
    }
  }

  transform(value: number): string {

    const hours: number = Math.floor(value / 60);
    const minutes: number = (value - hours * 60);

    if (hours < 10 && minutes < 10) {
        return '0' + hours + ' : 0' + (value - hours * 60);
    }
    if (hours > 10 && minutes > 10) {
        return '0' + hours + ' : ' + (value - hours * 60);
    }
    if (hours > 10 && minutes < 10) {
        return hours + ' : 0' + (value - hours * 60);
    }
    if (minutes > 10) {
        return '0' + hours + ' : ' + (value - hours * 60);
    }
  }

}
