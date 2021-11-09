import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SkuComponent } from './pages/sku/sku.component';
import { CobrosComponent } from './pages/cobros/cobros.component';
import { CrmComponent } from './pages/crm/crm.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClientelaComponent } from './pages/clientela/clientela.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { LectorComponent } from './pages/lector/lector.component';
import { SalidaPedidosComponent } from './pages/salida-pedidos/salida-pedidos.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { ClientelaAfiliadosComponent } from './components/clientela-afiliados/clientela-afiliados.component';
import { AffiliateDetailComponent } from './components/affiliate-detail/affiliate-detail.component';
import { SharedModule } from "../../shared/modules/shared/shared.module";
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditInventarioComponent } from './components/edit-inventario/edit-inventario.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { SalidasComponent } from './pages/salidas/salidas.component';
import { TablaCobrosComponent } from './components/tabla-cobros/tabla-cobros.component';
import { TablaPedidosComponent } from './components/tabla-pedidos/tabla-pedidos.component';
import { DetalleCobrosComponent } from './components/detalle-cobros/detalle-cobros.component';
import { HistorialCobrosComponent } from './pages/historial-cobros/historial-cobros.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { CrmDetalleComponent } from './pages/crm-detalle/crm-detalle.component';
import { TablaAfiliadosCrmComponent } from './components/tabla-afiliados-crm/tabla-afiliados-crm.component';
import { AplicarDescuentoComponent } from './pages/aplicar-descuento/aplicar-descuento.component';
import { AplicarCreditoComponent } from './pages/aplicar-credito/aplicar-credito.component';
import { TablaAfiliadosCobrosComponent } from './components/tabla-afiliados-cobros/tabla-afiliados-cobros.component';
import { RegistrarCobroComponent } from './pages/registrar-cobro/registrar-cobro.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';
import { SuperAdminComponent } from './pages/super-admin/super-admin.component';
import { TablaSuperAdminComponent } from './components/tabla-super-admin/tabla-super-admin.component';
import { NuevoAdminComponent } from './pages/nuevo-admin/nuevo-admin.component';
import { AdminChangePwdComponent } from './pages/admin-change-pwd/admin-change-pwd.component';
import { VentaManualComponent } from './pages/venta-manual/venta-manual.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OwlModule } from 'ngx-owl-carousel';
import { AddClientComponent } from './pages/add-client/add-client.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';
import { EditAdminComponent } from './pages/edit-admin/edit-admin.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { AdminTitleComponent } from './components/admin-title/admin-title.component';


@NgModule({
  declarations: [AdminComponent, SkuComponent, CobrosComponent, CrmComponent, InventarioComponent, ClientelaComponent, PedidosComponent, LectorComponent, SalidaPedidosComponent, AdminNavbarComponent, AdminSidenavComponent, ClientelaAfiliadosComponent, AffiliateDetailComponent, EditProductComponent, EditInventarioComponent, IngresosComponent, SalidasComponent, TablaCobrosComponent, TablaPedidosComponent, DetalleCobrosComponent, HistorialCobrosComponent, DashboardComponent, CrmDetalleComponent, TablaAfiliadosCrmComponent, AplicarDescuentoComponent, AplicarCreditoComponent, TablaAfiliadosCobrosComponent, RegistrarCobroComponent, HistorialPedidosComponent, SuperAdminComponent, TablaSuperAdminComponent, NuevoAdminComponent, AdminChangePwdComponent, VentaManualComponent, AddClientComponent, VentasComponent, AddVentaComponent, EditAdminComponent, AdminDetailComponent, EditClientComponent, AdminTitleComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatTabsModule,
    MatTableModule,
    MatStepperModule,
    SharedModule,
    MatSlideToggleModule,
    ChartsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    OwlModule
  ]
})
export class AdminModule { }
