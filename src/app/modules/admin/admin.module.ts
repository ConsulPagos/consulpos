import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from "../../shared/modules/shared/shared.module";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartsModule } from 'ng2-charts';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OwlModule } from 'ngx-owl-carousel';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './admin.component';
import { ActualizarArchivoComponent } from './pages/actualizar-archivo/actualizar-archivo.component';
import { AddClientComponent } from './pages/add-client/add-client.component';
import { AddTasasComponent } from './pages/add-tasas/add-tasas.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';
import { AdminChangePwdComponent } from './pages/admin-change-pwd/admin-change-pwd.component';
import { ClientelaComponent } from './pages/clientela/clientela.component';
import { CobroCentralizadoComponent } from './pages/cobro-centralizado/cobro-centralizado.component';
import { ConciliarArchivoComponent } from './pages/conciliar-archivo/conciliar-archivo.component';
import { ConfigComponent } from './pages/config/config.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditAdminComponent } from './pages/edit-admin/edit-admin.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { FichaClienteComponent } from './pages/ficha-cliente/ficha-cliente.component';
import { FichaUserComponent } from './pages/ficha-user/ficha-user.component';
import { GenerarArchivoComponent } from './pages/generar-archivo/generar-archivo.component';
import { HistoricoConciliacionComponent } from './pages/historico-conciliacion/historico-conciliacion.component';
import { NuevoAdminComponent } from './pages/nuevo-admin/nuevo-admin.component';
import { PrevArchivoComponent } from './pages/prev-archivo/prev-archivo.component';
import { ResultFileComponent } from './pages/result-file/result-file.component';
import { SuperAdminComponent } from './pages/super-admin/super-admin.component';
import { TasasComponent } from './pages/tasas/tasas.component';
import { ValidadorVentaComponent } from './pages/validador-venta/validador-venta.component';
import { VentaConsulposComponent } from './pages/venta-consulpos/venta-consulpos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { EstadoCuentaComponent } from './pages/estado-cuenta/estado-cuenta.component';
import { DiferirDeudaComponent } from './components/diferir-deuda/diferir-deuda.component';
import { TableComponent } from './components/table/table.component';
import { TablaHistoricoConciliacionComponent } from './components/tabla-historico-conciliacion/tabla-historico-conciliacion.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { ClientelaAfiliadosComponent } from './components/clientela-afiliados/clientela-afiliados.component';
import { AddRolComponent } from './pages/add-rol/add-rol.component';
import { EditRolComponent } from './pages/edit-rol/edit-rol.component';
import { RolesComponent } from './pages/roles/roles.component';
import { TablaSuperAdminComponent } from './components/tabla-super-admin/tabla-super-admin.component';
import { TablaRolesComponent } from './components/tabla-roles/tabla-roles.component';
import { TablaSalesComponent } from './components/tabla-sales/tabla-sales.component';



@NgModule({
  declarations: [
    AdminComponent,
    ConciliarArchivoComponent,
    ClientelaComponent,
    SuperAdminComponent,
    NuevoAdminComponent,
    AdminChangePwdComponent,
    AddClientComponent,
    VentasComponent,
    AddVentaComponent,
    EditAdminComponent,
    EditClientComponent,
    PrevArchivoComponent,
    ResultFileComponent,
    VentaConsulposComponent,
    FichaClienteComponent,
    ValidadorVentaComponent,
    ActualizarArchivoComponent,
    HistoricoConciliacionComponent,
    TasasComponent,
    ConfigComponent,
    AddTasasComponent,
    EstadoCuentaComponent,
    DiferirDeudaComponent,
    FichaUserComponent,
    CobroCentralizadoComponent,
    TableComponent,
    TablaHistoricoConciliacionComponent,
    AdminNavbarComponent,
    AdminSidenavComponent,
    ClientelaAfiliadosComponent,
    DashboardComponent,
    GenerarArchivoComponent,
    AddRolComponent,
    EditRolComponent,
    RolesComponent,
    TablaSuperAdminComponent,
    TablaRolesComponent,
    TablaSalesComponent,
  ],

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
    OwlModule,
    MatCardModule,
    
  ]
})
export class AdminModule { }
