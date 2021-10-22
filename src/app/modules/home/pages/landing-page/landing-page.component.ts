import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { HagaSuPedidoDialogComponent } from '../../components/haga-su-pedido-dialog/haga-su-pedido-dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  constructor(private title: Title, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.title.setTitle('Grupo Altius | Evolucionamos la manera de vender licor');
  }

  openDialog(): void {
    this.dialog.open(HagaSuPedidoDialogComponent, {
      width: '400px',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }


}
