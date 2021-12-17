import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataVentaFirebase, Equipo, VentaFirebase } from 'src/app/models/venta_firebase';
import { ConsulposService } from 'src/app/shared/services/consulpos.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-validador-venta',
  templateUrl: './validador-venta.component.html',
  styleUrls: ['./validador-venta.component.scss']
})
export class ValidadorVentaComponent implements OnInit {

  id;
  data: DataVentaFirebase;
  equipos = [];
  constructor(private route: ActivatedRoute, private router: Router, private consulpos: ConsulposService, private loader:LoaderService) { }

  ngOnInit(): void {
    this.loader.loading();
    this.route.params.subscribe(p => {
      this.id = p.id;
      this.consulpos.getSale({ id: this.id }).subscribe(data => {
        this.loader.stop();
        this.data = data as DataVentaFirebase
        this.mapToArray()

      })
    })
  }

  mapToArray(){
    var index = 1;
    console.log(this.data.equipos["equipo_"+ index])
    while (this.data.equipos["equipo_"+ index] != null) {
      const e = this.data.equipos["equipo_"+ index]
      e.title = "equipo_"+ index;
      this.equipos.push(e)
      index++
    }
    console.log(this.equipos)
  }

}
