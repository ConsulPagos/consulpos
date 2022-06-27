import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemEstadoCuentaInterface } from 'src/app/models/itemestadocuenta';
import { TipoDiferidoInterface } from 'src/app/models/tipo_diferido';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-diferir-deuda',
  templateUrl: './diferir-deuda.component.html',
  styleUrls: ['./diferir-deuda.component.scss']
})
export class DiferirDeudaComponent implements OnInit {

  inputValue:string = '';
  field_name:string;

  tipos!:TipoDiferidoInterface[];

  form: FormGroup;
  saldo;

  constructor(public dialogRef: MatDialogRef<DiferirDeudaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selected: ItemEstadoCuentaInterface[]},
    private storage:StorageService) { 
    }

  ngOnInit(): void {
    this.saldo = this.montoADiferir();

    this.form = new FormGroup({
      id_diferido: new FormControl('', [Validators.required]),
      saldo_diferido: new FormControl('', [Validators.required,Validators.min(1), Validators.max(this.saldo)]),
      cuotas: new FormControl(this.data.selected, [Validators.required]),
    })
    this.tipos = JSON.parse(this.storage.get(constant.TIPOS_DIFERIDO)).tipos_diferido
    // console.log(this.tipos)
  }

  montoADiferir(){
    return this.data.selected.reduce((a:number, c:ItemEstadoCuentaInterface) => a + parseFloat(c.saldo), 0)
  }

  
}



