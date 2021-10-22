import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-afiliado-error',
  templateUrl: './afiliado-error.component.html',
  styleUrls: ['./afiliado-error.component.scss']
})
export class AfiliadoErrorComponent implements OnInit {

  @Output() reload = new EventEmitter<Boolean>();
  @Input() errorDetails;

  details = false;


  constructor() { }

  ngOnInit(): void {
  }

  emitReload(){
    this.reload.emit(true);
  }

  showDetails(){
    if(this.details){
      this.details = false;
    }else{
      this.details = true;
    }
  }

}
