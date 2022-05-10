import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  file: any;
  @Output() change: EventEmitter<any> = new EventEmitter()
  @Input() loading:boolean = false;
  @Input() accept:string;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0].name
    this.change.emit(event)
  }

}
