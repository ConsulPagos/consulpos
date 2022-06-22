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
import { SeleccionCentralizadoComponent } from './pages/seleccion-centralizado/seleccion-centralizado.component';
import { ModalCentralizadoComponent } from './components/modal-centralizado/modal-centralizado.component';
import { PrevisualizarArchivoComponent } from './components/previsualizar-archivo/previsualizar-archivo.component';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { TablaOperacionesComponent } from './components/tabla-operaciones/tabla-operaciones.component';
import { ModalAsignacionComponent } from './components/modal-asignacion/modal-asignacion.component';
import { ModalParametrizacionComponent } from './components/modal-parametrizacion/modal-parametrizacion.component';
import { ModalConfiguracionComponent } from './components/modal-configuracion/modal-configuracion.component';
import { FichaSaleComponent } from './pages/ficha-sale/ficha-sale.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { AddPagosComponent } from './pages/add-pagos/add-pagos.component';
import { TablaPagosComponent } from './components/tabla-pagos/tabla-pagos.component';
import { ModalPagoComponent } from './components/modal-pago/modal-pago.component';
import { ValidarPagoComponent } from './pages/validar-pago/validar-pago.component';
import { TablaValidarPagosComponent } from './components/tabla-validar-pagos/tabla-validar-pagos.component';
import { ModalEntregaComponent } from './components/modal-entrega/modal-entrega.component';
import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { ProvedoresComponent } from './pages/provedores/provedores.component';
import { ModelosComponent } from './pages/modelos/modelos.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { PlataformasComponent } from './pages/plataformas/plataformas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { TablaAlmacenesComponent } from './components/tabla-almacenes/tabla-almacenes.component';
import { TablaSucursalesComponent } from './components/tabla-sucursales/tabla-sucursales.component';
import { TablaProvedoresComponent } from './components/tabla-provedores/tabla-provedores.component';
import { TablaMarcasComponent } from './components/tabla-marcas/tabla-marcas.component';
import { TablaModelosComponent } from './components/tabla-modelos/tabla-modelos.component';
import { TablaPlataformasComponent } from './components/tabla-plataformas/tabla-plataformas.component';
import { TablaProductosComponent } from './components/tabla-productos/tabla-productos.component';
import { AddAlmacenesComponent } from './pages/add-almacenes/add-almacenes.component';
import { AddSucursalesComponent } from './pages/add-sucursales/add-sucursales.component';
import { AddProvedoresComponent } from './pages/add-provedores/add-provedores.component';
import { AddMarcasComponent } from './pages/add-marcas/add-marcas.component';
import { AddModelosComponent } from './pages/add-modelos/add-modelos.component';
import { AddPlataformasComponent } from './pages/add-plataformas/add-plataformas.component';
import { AddProductosComponent } from './pages/add-productos/add-productos.component';
import { EditAlmacenesComponent } from './pages/edit-almacenes/edit-almacenes.component';
import { EditSucursalesComponent } from './pages/edit-sucursales/edit-sucursales.component';
import { EditProvedoresComponent } from './pages/edit-provedores/edit-provedores.component';
import { EditMarcasComponent } from './pages/edit-marcas/edit-marcas.component';
import { EditModelosComponent } from './pages/edit-modelos/edit-modelos.component';
import { EditPlataformasComponent } from './pages/edit-plataformas/edit-plataformas.component';
import { EditProductosComponent } from './pages/edit-productos/edit-productos.component';
import { EquiposAsociadosComponent } from './components/equipos-asociados/equipos-asociados.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { MoverInventarioComponent } from './pages/mover-inventario/mover-inventario.component';
import { CargarInventarioComponent } from './pages/cargar-inventario/cargar-inventario.component';
import { InventarioDetalleComponent } from './pages/inventario-detalle/inventario-detalle.component';
import { TablaInventarioComponent } from './components/tabla-inventario/tabla-inventario.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { AddPedidosComponent } from './pages/add-pedidos/add-pedidos.component';
import { EditPedidosComponent } from './pages/edit-pedidos/edit-pedidos.component';
import { TablaPedidosComponent } from './components/tabla-pedidos/tabla-pedidos.component';
import { CargarInventarioSimComponent } from './pages/cargar-inventario-sim/cargar-inventario-sim.component';
import { ModalKeySoComponent } from './components/modal-key-so/modal-key-so.component';
import { ModalCambioAlmacenComponent } from './components/modal-cambio-almacen/modal-cambio-almacen.component';
import { TraspasoComponent } from './pages/traspaso/traspaso.component';
import { CambioBancoComponent } from './pages/cambio-banco/cambio-banco.component';
import { PagoManualComponent } from './pages/pago-manual/pago-manual.component';
import { ModalDesafiliacionComponent } from './components/modal-desafiliacion/modal-desafiliacion.component';
import { AddTraspasoComponent } from './pages/add-traspaso/add-traspaso.component';
import { TablaTraspasoComponent } from './components/tabla-traspaso/tabla-traspaso.component';
import { ModalAsignacionManualComponent } from './components/modal-asignacion-manual/modal-asignacion-manual.component';
import { ModalConfiguracionManualComponent } from './components/modal-configuracion-manual/modal-configuracion-manual.component';
import { TablaCambioEquipoComponent } from './components/tabla-cambio-equipo/tabla-cambio-equipo.component';
import { TablaCambioSimComponent } from './components/tabla-cambio-sim/tabla-cambio-sim.component';
import { AddCambioPosComponent } from './pages/add-cambio-pos/add-cambio-pos.component';
import { AddCambioSimComponent } from './pages/add-cambio-sim/add-cambio-sim.component';
import { CambioSimComponent } from './pages/cambio-sim/cambio-sim.component';
import { CambioPosComponent } from './pages/cambio-pos/cambio-pos.component';
import { AddCambioBancoComponent } from './pages/add-cambio-banco/add-cambio-banco.component';
import { TablaCambioBancoComponent } from './components/tabla-cambio-banco/tabla-cambio-banco.component';
import { ModalDescargarEcComponent } from './components/modal-descargar-ec/modal-descargar-ec.component';
import { ReactivacionComponent } from './pages/reactivacion/reactivacion.component';
import { DesinstalacionComponent } from './pages/desinstalacion/desinstalacion.component';
import { AddDesinstalacionComponent } from './pages/add-desinstalacion/add-desinstalacion.component';
import { AddReactivacionComponent } from './pages/add-reactivacion/add-reactivacion.component';
import { TablaReactivacionComponent } from './components/tabla-reactivacion/tabla-reactivacion.component';
import { TablaDesinstalacionComponent } from './components/tabla-desinstalacion/tabla-desinstalacion.component';
import { TablaPruebaComponent } from './components/tabla-prueba/tabla-prueba.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { ValidarPruebaComponent } from './pages/validar-prueba/validar-prueba.component';
import { ValidarPruebaFichaComponent } from './pages/validar-prueba-ficha/validar-prueba-ficha.component';
import { TablaValidarPruebaComponent } from './components/tabla-validar-prueba/tabla-validar-prueba.component';
import { ModalAsignacionPruebaComponent } from './components/modal-asignacion-prueba/modal-asignacion-prueba.component';
import { AddPlanComponent } from './pages/add-plan/add-plan.component';
import { PlanComponent } from './pages/plan/plan.component';
import { TablaPlanComponent } from './components/tabla-plan/tabla-plan.component';
import { AddPagoManualComponent } from './pages/add-pago-manual/add-pago-manual.component';
import { PagoPendienteComponent } from './pages/pago-pendiente/pago-pendiente.component';
import { TablaPagoPendienteComponent } from './components/tabla-pago-pendiente/tabla-pago-pendiente.component';
import { TablaPagoManualComponent } from './components/tabla-pago-manual/tabla-pago-manual.component';
import { ModalDiferirCuotaComponent } from './components/modal-diferir-cuota/modal-diferir-cuota.component';
import { CargaMasivaComponent } from './pages/carga-masiva/carga-masiva.component';




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
    TablaSuperAdminComponent,
    SeleccionCentralizadoComponent,
    ModalCentralizadoComponent,
    PrevisualizarArchivoComponent,
    OperacionesComponent,
    TablaOperacionesComponent,
    ModalAsignacionComponent,
    ModalParametrizacionComponent,
    ModalConfiguracionComponent,
    FichaSaleComponent,
    PagosComponent,
    AddPagosComponent,
    TablaPagosComponent,
    ModalPagoComponent,
    ValidarPagoComponent,
    TablaValidarPagosComponent,
    ModalEntregaComponent,
    AlmacenesComponent,
    SucursalesComponent,
    ProvedoresComponent,
    ModelosComponent,
    MarcasComponent,
    PlataformasComponent,
    ProductosComponent,
    TablaAlmacenesComponent,
    TablaSucursalesComponent,
    TablaProvedoresComponent,
    TablaMarcasComponent,
    TablaModelosComponent,
    TablaPlataformasComponent,
    TablaProductosComponent,
    AddAlmacenesComponent,
    AddSucursalesComponent,
    AddProvedoresComponent,
    AddMarcasComponent,
    AddModelosComponent,
    AddPlataformasComponent,
    AddProductosComponent,
    EditAlmacenesComponent,
    EditSucursalesComponent,
    EditProvedoresComponent,
    EditMarcasComponent,
    EditModelosComponent,
    EditPlataformasComponent,
    EditProductosComponent,
    EquiposAsociadosComponent,
    InventarioComponent,
    MoverInventarioComponent,
    CargarInventarioComponent,
    InventarioDetalleComponent,
    TablaInventarioComponent,
    PedidosComponent,
    AddPedidosComponent,
    EditPedidosComponent,
    TablaPedidosComponent,
    CargarInventarioSimComponent,
    ModalKeySoComponent,
    ModalCambioAlmacenComponent,
    TraspasoComponent,
    CambioBancoComponent,
    PagoManualComponent,
    ModalDesafiliacionComponent,
    AddTraspasoComponent,
    TablaTraspasoComponent,
    ModalAsignacionManualComponent,
    ModalConfiguracionManualComponent,
    TablaCambioEquipoComponent,
    TablaCambioSimComponent,
    AddCambioPosComponent,
    AddCambioSimComponent,
    CambioSimComponent,
    CambioPosComponent,
    AddCambioBancoComponent,
    TablaCambioBancoComponent,
    ModalDescargarEcComponent,
    ReactivacionComponent,
    DesinstalacionComponent,
    AddDesinstalacionComponent,
    AddReactivacionComponent,
    TablaReactivacionComponent,
    TablaDesinstalacionComponent,
    TablaPruebaComponent,
    PruebaComponent,
    ValidarPruebaComponent,
    ValidarPruebaFichaComponent,
    TablaValidarPruebaComponent,
    ModalAsignacionPruebaComponent,
    AddPlanComponent,
    PlanComponent,
    TablaPlanComponent,
    AddPagoManualComponent,
    PagoPendienteComponent,
    TablaPagoPendienteComponent,
    TablaPagoManualComponent,
    ModalDiferirCuotaComponent,
    CargaMasivaComponent,
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
