import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Output() count = new EventEmitter<number>();
  @Output() remove = new EventEmitter<boolean>();

  @Input() initial: number;
  @Input() showDelete: boolean = false;

  mycount;

  constructor() { }

  ngOnInit(): void {

    if (this.initial) {
      this.mycount = this.initial;
    } else {
      this.mycount = 1;
    }

    this.count.emit(this.mycount);
  }

  increment() {
    this.mycount = this.mycount + 1;
    this.count.emit(this.mycount);
  }

  decrement() {
    if (this.mycount > 1) {
      this.mycount = this.mycount - 1;
      this.count.emit(this.mycount);
    }
  }

  inputChange() {
    if (this.mycount == 0) {
      this.mycount = 1;
    }
    this.count.emit(this.mycount);
  }

  removeEmit(){
    this.remove.emit(true);
  }

}
