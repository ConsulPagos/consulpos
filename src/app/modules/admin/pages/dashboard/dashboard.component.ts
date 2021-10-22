import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard;
  error = false;
  loading = true;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          display: false,
          ticks: {
                beginAtZero:true,
            }
      }],
      xAxes: [{
          display: true,
      }],
  },
  };
  public barChartType = 'bar';


  public STMBarChartLabels = [];
  public STMBarChartData = [
    { data: [], label: 'Monto facturado' }
  ];

  public NABMBarChartLabels = [];
  public NABMBarChartData = [
    { data: [], label: 'Nuevos afiliados' }
  ];

  blueChartColors: any[] = [
    {
      backgroundColor: "#33aaaabb"
    }];

  orangeChartColors: any[] = [
    {
      backgroundColor: "#33aaaabb"
    }];

  constructor(private admin: AdminService, private title:Title) { }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.error = false;
    this.loading = true;
    this.admin.get_dashboard().subscribe(data => {
      this.dashboard = data;
      this.loading = false;
      this.getSellThisMonthDataset();
      this.getNABMDataset();
    }, e => {
      this.loading = false;
      this.error = true;
    })
  }

  getSellThisMonthDataset() {
    this.dashboard.sells_this_month.forEach(data => {
      this.STMBarChartData[0].data.push(data[0])
      this.STMBarChartLabels.push(data[1])
    });
  }

  getNABMDataset() {
    this.dashboard.new_affilites_by_month.forEach(data => {
      this.NABMBarChartData[0].data.push(data[0])
      this.NABMBarChartLabels.push(data[1])
    });
  }
}
