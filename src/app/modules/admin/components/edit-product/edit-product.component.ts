import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatInterface } from 'src/app/models/format';
import { PedidoInterface } from 'src/app/models/pedido';
import { ProductInterface } from 'src/app/models/product';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private routes: ActivatedRoute, private router: Router, private api: ApiService, private admin: AdminService, public dialog: MatDialog, private toaster: ToasterService) { }

  id;
  id_afiliado;
  product: ProductInterface;
  formats: FormatInterface[];
  formats_old: FormatInterface[];
  affiliate;
  loading = false;
  error = false;
  formList = [];
  imgNotFound = '../../../../../assets/images/image-not-available.jpg';
  productForm: FormGroup;

  ngOnInit(): void {

    this.id = parseInt(this.routes.snapshot.paramMap.get('id_product'))

    if (this.id > 0) {

      this.load()

    } else if (this.id == 0) {

      this.product = {}
      this.formats = [{descripcion:'', activo:1}]
      this.buildFormatForm();
      this.productForm = new FormGroup({
        descripcion: new FormControl(this.product.img_name, [Validators.required]),
        nombre: new FormControl(this.product.producto, [Validators.required, Validators.minLength(1)]),
        unidades_caja: new FormControl(this.product.unidades_caja, [Validators.required, Validators.minLength(1)]),
        codigo_barra: new FormControl(this.product.codigo_barra, [Validators.required])
      });
    }

  }
  load() {
    this.loading = true;
    this.error = false;

    this.api.get_product(this.id).subscribe(data => {
      this.product = data['product'];
      this.formats = data['available_formats'];
      this.formats_old = [...this.formats];
      this.buildFormatForm();
      this.loading = false;
      this.productForm = new FormGroup({
        descripcion: new FormControl(this.product.descripcion, [Validators.required]),
        nombre: new FormControl(this.product.producto, [Validators.required, Validators.minLength(1)]),
        unidades_caja: new FormControl(this.product.unidades_caja, [Validators.required, Validators.minLength(1)]),
        codigo_barra: new FormControl(this.product.codigo_barra, [Validators.required])
      });
    }, e => {
      this.error = true;
      this.loading = false;
    })
  }

  acceptOrder(order: PedidoInterface) {

    var body = 'Se aceptará la orden #' + order.id;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  addFormat() {
    var newFormat: FormatInterface = {};
    newFormat.id = 0;
    newFormat.id_producto = this.product.id;
    newFormat.activo = 1;
    newFormat.descripcion='';

    var form = new FormGroup({
      descripcion: new FormControl(newFormat.descripcion, [Validators.required]),
      unidades: new FormControl(newFormat.unidades, [Validators.required, Validators.minLength(1)]),
      precio: new FormControl(newFormat.precio, [Validators.required, Validators.minLength(1)])
    });
    this.formList.push(form);

    this.formats.push(newFormat);
  }

  remove_format(format: FormatInterface) {
    if (this.formats_old.find(x => x.id == format.id)) {
      //eliminamos en la db
      this.delete_format_db(format);
    } else {
      //solo eliminamos en front
      this.formats = this.formats.filter(f => f.id != format.id);
    }
  }

  update_img(img) {
    this.product.img_name = img;
  }

  delete_format_db(format: FormatInterface) {

    var body = 'Se eliminará la presentación N°' + format.id + '. Recuerde que todos los productos deben tener al menos una presentación';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toaster.progress('Eliminando...')
        this.admin.delete_format(format.id, this.product.id).subscribe(res => {
          this.toaster.success('Eliminado con éxito')
          this.formats = this.formats.filter(f => f.id != format.id)
          this.router.navigateByUrl('/admin/app/(adr:sku)');
        }, e => {
          if (e.error['error']) {
            this.toaster.error(e.error['error'].msg)
          } else {
            this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
          }
        })
      }
    });
  }

  save_product() {
    if (this.checkFormList() && this.productForm.valid && this.product.img_name) {
      if (this.id != 0) {
        this.update_product();
      } else {
        this.new_product();
      }
    }
  }

  new_product() {

    var body = 'Se guardará el nuevo producto';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toaster.progress('Guardando...')
        this.admin.new_product({ 'product': this.product, 'formats': this.formats }).subscribe(res => {
          this.toaster.success('Guardado con éxito')
          this.router.navigateByUrl('/admin/app/(adr:sku)');
          this.formats_old = [...this.formats];
        }, e => {
          this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
        })
      }
    });
  }

  update_product() {

    var body = 'Se guardarán los cambios en el producto N°' + this.product.id;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toaster.progress('Guardando...')
        this.admin.update_product({ 'product': this.product, 'formats': this.formats }, this.product.id).subscribe(res => {
          this.toaster.success('Guardado con éxito')
          this.router.navigateByUrl('/admin/app/(adr:sku)');
          this.formats_old = [...this.formats];
        }, e => {
          this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
        })
      }
    });
  }

  save_format(format: FormatInterface) {
    if (this.formats_old.find(x => x.id == format.id)) {
      this.update_format(format);
    } else {
      //creamos nuevo formato
      this.new_format(format);
    }
  }

  new_format(format: FormatInterface) {

    var body = 'Se guardará la nueva presentación N°' + format.id;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toaster.progress('Guardando...')
        this.admin.new_format(format, this.product.id).subscribe(res => {
          this.toaster.success('Guardado con éxito')
          this.router.navigateByUrl('/admin/app/(adr:sku)');
        }, e => {
          this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
        })
      }
    });
  }

  update_format(format: FormatInterface) {

    var body = 'Se guardarán los cambios en la presentación N°' + format.id;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toaster.progress('Guardando...')
        this.admin.update_format(format, format.id, this.product.id).subscribe(res => {
          this.toaster.success('Guardado con éxito')
          this.router.navigateByUrl('/admin/app/(adr:sku)');
        }, e => {
          this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
        })
      }
    });
  }

  delete_product() {

    var body = 'Se eliminará el producto N°' + this.product.id + ' y todas sus presentaciones';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: 'auto',
      panelClass: 'custom-dialog',
      data: { 'body': body }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toaster.progress('Eliminando...')
        this.admin.delete_product(this.product.id).subscribe(res => {
          this.toaster.success('Eliminado con éxito')
          this.router.navigateByUrl('/admin/app/(adr:sku)');
        }, e => {
          this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
        })
      }
    });
  }

  buildFormatForm() {
    this.formats.forEach(format => {
      var form = new FormGroup({
        descripcion: new FormControl(format.descripcion, [Validators.required, Validators.minLength(1)]),
        unidades: new FormControl(format.unidades, [Validators.required, Validators.minLength(1)]),
        precio: new FormControl(format.precio, [Validators.required, Validators.minLength(1)])
      });
      this.formList.push(form);
    })
  }

  checkFormList(): boolean {
    var valid = true;
    console.log(this.formList)
    this.formList.forEach(form => {
      console.log(form.invalid)
      if (form.invalid) {
        valid = false
      }
    })
    return valid
  }

  getProductImg() {
    return this.product.img_name == null ? this.imgNotFound : this.product.img_name
  }

  update_format_status(format: FormatInterface) {
    
    format.activo = (format.activo == 1) ? 0 : 1;
    this.toaster.progress('Guardando')
    this.admin.update_format(format, format.id, this.product.id).subscribe(res => {
      this.toaster.success('Guardado con éxito')
    }, e => {
      this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
    })

  }

  update_product_status(product: ProductInterface) {
    product.activo = (product.activo == 1) ? 0 : 1;

    this.toaster.progress('Guardando')
    this.admin.update_product({'product': product,'formats' : null}, product.id).subscribe(res => {
      this.toaster.success('Guardado con éxito')
    }, e => {
      this.toaster.error('Ha ocurrido un error inesperado, intentelo nuevamente')
    })
  }

  checkFormat(format){
    return this.formats.filter(f => f.descripcion == format).length > 0 ? true : false
  }
}