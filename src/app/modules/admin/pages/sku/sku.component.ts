import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { ProductInterface } from 'src/app/models/product';
import { TransactionInterface } from 'src/app/models/transaction';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss']
})
export class SkuComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'producto', 'formats', 'activo', 'action'];
  products: ProductInterface[] = [];
  loading = false;
  error = false;
  resultsLength;
  firstLoading = false;
  newProductID = 0;

  dataSource = new MatTableDataSource<TransactionInterface>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private title:Title, private admin: AdminService, private api: ApiService, public dialog: MatDialog, private toaster: ToasterService) { }

  ngAfterViewInit() {
    this.load();
    this.firstLoading = true;
  }

  ngOnInit(){
    this.loading = true;
    this.title.setTitle('Grupo Altius | SKU')
  }

  load() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.error = false;
          this.loading = true;
          return this.api.products(this.paginator.pageIndex + 1, 0)
        }),
        map(data => {
          this.firstLoading = false;
          this.loading = false;
          this.resultsLength = data['total_count'];
          this.paginator.pageIndex = data['current_page'] - 1;
          return data['data'];
        }),
        catchError(() => {
          this.firstLoading = false;
          this.loading = false;
          this.error = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.products = data
      });
  }

  update_product(product: ProductInterface) {
    product.activo = (product.activo == 1) ? 0 : 1;

    this.toaster.progress('Guardando')
    this.admin.update_product({'product': product,'formats' : null}, product.id).subscribe(res => {
      this.toaster.success('Guardado con éxito')
    }, e => {
      this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
    })
  }

}
