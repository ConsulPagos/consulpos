import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.component.html',
  styleUrls: ['./cobros.component.scss']
})
export class CobrosComponent implements OnInit {

  sin_cobrar_count = 0;
  contado_count = 0;

  constructor(private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle('Grupo Altius | Cobros')
  }

}
