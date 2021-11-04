import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-clientela',
  templateUrl: './clientela.component.html',
  styleUrls: ['./clientela.component.scss']
})
export class ClientelaComponent implements OnInit {

  countPrimeraCompra;
  countNuevos;
  countDocumentos;
  countDocumentosReq;
  countException;
  
  constructor(private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Clientes')
  }

}
