import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public dia = ['Banco de Venezuela', 'Banplus', 'Banco Plaza', '100% Banco'];
  public type = 'bar';
  public leyenda = true;
  public datos = [
    { data: [65, 59, 80, 81, 56, 55, 40 ,65, 59, 80, 81, 56, 55], label: 'Monto Enviado' },
    { data: [28, 48, 40, 19, 86, 27, 90, 40 ,65, 59, 80, 81, 56], label: 'Monto Cobrado' }
  ];

  public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40 ,65, 59, 80, 81, 56, 55], label: 'Monto Enviado' },
    { data: [28, 48, 40, 19, 86, 27, 90, 40 ,65, 59, 80, 81, 56], label: 'Monto Cobrado' }
  ];


  public a = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public b = 'line';
  public c = true;
  public d = [
    { data: [65, 59, 80, 81, 56, 55, 40 ,65, 59, 80, 81, 56, 55], label: 'Activos' },
    { data: [28, 48, 40, 19, 86, 27, 90, 40 ,65, 59, 80, 81, 56], label: 'Desafiliados' }
  ];


  public pieChartLabels = ['Banco de Venezuela', 'Banplus', 'Banco Plaza', '100% Banco'];
  public pieChartData = [100, 56, 80, 5];
  public pieChartType = 'pie';

  public pieDeudaLabels = ['Banco de Venezuela', 'Banplus', 'Banco Plaza', '100% Banco'];
  public pieDeuda = [1555464, 4454545, 857570, 75757];
  public pieDeudaType = 'pie';

  constructor(private admin: AdminService, private title: Title) { }

  ngOnInit(): void {

  }

}
