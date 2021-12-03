import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  templateUrl: './action-btn.component.html',
  styleUrls: ['./action-btn.component.scss']
})
export class ActionBtnComponent implements OnInit {

  @Input() isDisabled: boolean = false;
  @Input() text: String = "";
  @Input() loading: boolean = false;
  @Output() onClick: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  click(){
    this.onClick.emit(true);
  }

}
