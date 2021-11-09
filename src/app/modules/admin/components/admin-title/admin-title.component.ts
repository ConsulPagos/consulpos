import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-title',
  templateUrl: './admin-title.component.html',
  styleUrls: ['./admin-title.component.scss']
})
export class AdminTitleComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
