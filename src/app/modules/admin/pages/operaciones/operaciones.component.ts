import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent implements OnInit {

  countNuevos;

  client: any;
  tipo_operacion: string;
  cambioOperacion: Subject<string> = new Subject<string>();


  constructor(
    private title:Title,
    private router: Router, 
    private route: ActivatedRoute,
    ) {
      this.route.paramMap.subscribe( paramMap => {
        this.tipo_operacion = paramMap.get('tipo_operacion');
        this.cambioOperacion.next(this.tipo_operacion);

    })
     }

  ngOnInit(): void {
    this.title.setTitle('ConsulPos | Operaciones')
  }
  

}
