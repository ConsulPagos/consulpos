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
    @Inject(MAT_DIALOG_DATA) public data: GeneracionResponse,
    private excelService: ExportService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
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

}
