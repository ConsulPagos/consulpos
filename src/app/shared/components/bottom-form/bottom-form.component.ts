import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-form',
  templateUrl: './bottom-form.component.html',
  styleUrls: ['./bottom-form.component.scss']
})
export class BottomFormComponent implements OnInit {

  @Output() onClear = new EventEmitter<boolean>();
  
  @Output() onSubmit = new EventEmitter<boolean>();

  constructor() { }

  clear() {
    this.onClear.emit(true)
  }

  submit() {
    this.onSubmit.emit(true)
  }

  ngOnInit(): void {
  }

}
