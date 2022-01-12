import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DetalleCobrosComponent } from './components/detalle-cobros/detalle-cobros.component';
import { EditInventarioComponent } from './components/edit-inventario/edit-inventario.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AplicarCreditoComponent } from './pages/aplicar-credito/aplicar-credito.component';
import { AplicarDescuentoComponent } from './pages/aplicar-descuento/aplicar-descuento.component';
import { ClientelaComponent } from './pages/clientela/clientela.component';
import { CobrosComponent } from './pages/cobros/cobros.component';
import { ConciliarArchivoComponent } from './pages/conciliar-archivo/conciliar-archivo.component';
import { CrmComponent } from './pages/crm/crm.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistorialCobrosComponent } from './pages/historial-cobros/historial-cobros.component';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';
import { IngresosComponent } from './pages/ingresos/ingresos.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { LectorComponent } from './pages/lector/lector.component';
import { NuevoAdminComponent } from './pages/nuevo-admin/nuevo-admin.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { GenerarArchivoComponent } from './pages/generar-archivo/generar-archivo.component';
import { SalidaPedidosComponent } from './pages/salida-pedidos/salida-pedidos.component';
import { SalidasComponent } from './pages/salidas/salidas.component';
import { SkuComponent } from './pages/sku/sku.component'
import { SuperAdminComponent } from './pages/super-admin/super-admin.component';
import { InventarioGuard } from './guards/inventario.guard'
import { SkuGuard } from './guards/sku.guard'
import { CrmGuard } from './guards/crm.guard'
import { ClientesGuard } from './guards/clientes.guard'
import { SalidasGuard } from './guards/salidas.guard'
import { PedidosGuard } from './guards/pedidos.guard'
import { CobrosGuard } from './guards/cobros.guard'
import { HistorialGuard } from './guards/historial.guard'
import { SuperGuard } from './guards/super.guard'
import { DashboardGuard } from './guards/dashboard.guard'
import { AdminChangePwdComponent } from './pages/admin-change-pwd/admin-change-pwd.component';
import { VentaManualComponent } from './pages/venta-manual/venta-manual.component';
import { VentaManualGuard } from './guards/venta-manual.guard'
import { AddClientComponent } from './pages/add-client/add-client.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';
import { EditAdminComponent } from './pages/edit-admin/edit-admin.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { PrevArchivoComponent } from './pages/prev-archivo/prev-archivo.component';
import { VerifyKeysGuard } from './guards/verify-keys.guard'
import { VentaConsulposComponent } from './pages/venta-consulpos/venta-consulpos.component';
import { FichaClienteComponent } from './pages/ficha-cliente/ficha-cliente.component';
import { ValidadorVentaComponent } from './pages/validador-venta/validador-venta.component';
import { ActualizarArchivoComponent } from './pages/actualizar-archivo/actualizar-archivo.component';
import { HistoricoConciliacionComponent } from './pages/historico-conciliacion/historico-conciliacion.component';
import { ConfigComponent } from './pages/config/config.component';
import { TasasComponent } from './pages/tasas/tasas.component';
import { AddTasasComponent } from './pages/add-tasas/add-tasas.component';
import { FichaUserComponent } from './pages/ficha-user/ficha-user.component';

const routes: Routes = [
  {
    path: 'app', canActivate: [VerifyKeysGuard],
    component: AdminComponent,
    children: [
      { path: 'venta-manual', component: VentaManualComponent, outlet: 'adr', canActivate: [VentaManualGuard] },
      { path: 'sku', component: SkuComponent, outlet: 'adr', canActivate: [SkuGuard] },
      { path: 'sku/:id_product', component: EditProductComponent, outlet: 'adr', canActivate: [SkuGuard] },
      { path: 'crm', component: CrmComponent, outlet: 'adr', canActivate: [CrmGuard] },
      { path: 'generar-archivo', component: GenerarArchivoComponent, outlet: 'adr', canActivate: [CobrosGuard] },
      { path: 'actualizar-archivo', component: ActualizarArchivoComponent, outlet: 'adr', canActivate: [CrmGuard] },
      { path: 'conciliar-archivo', component: ConciliarArchivoComponent, outlet: 'adr', canActivate: [CrmGuard] },
      { path: 'historico-conciliacion', component: HistoricoConciliacionComponent, outlet: 'adr', canActivate: [CrmGuard] },
      { path: 'aplicar-descuento/:id_afiliado', component: AplicarDescuentoComponent, outlet: 'adr', canActivate: [CrmGuard] },
      { path: 'reportes', component: AplicarCreditoComponent, outlet: 'adr', canActivate: [CrmGuard] },
      { path: 'clientela', component: ClientelaComponent, outlet: 'adr', canActivate: [ClientesGuard] },
      { path: 'venta-consulpos', component: VentaConsulposComponent, outlet: 'adr'},
      { path: 'inventario', component: InventarioComponent, outlet: 'adr', canActivate: [InventarioGuard] },
      { path: 'inventario/:id_product', component: EditInventarioComponent, outlet: 'adr', canActivate: [InventarioGuard] },
      { path: 'ingresos', component: IngresosComponent, outlet: 'adr', canActivate: [InventarioGuard] },
      { path: 'salidas', component: SalidasComponent, outlet: 'adr', canActivate: [InventarioGuard] },
      { path: 'lector/:id_pedido/:id_afiliado', component: LectorComponent, outlet: 'adr', canActivate: [SalidasGuard] },
      { path: 'pedidos', component: PedidosComponent, outlet: 'adr', canActivate: [PedidosGuard] },
      { path: 'salida-pedidos', component: SalidaPedidosComponent, outlet: 'adr', canActivate: [SalidasGuard] },
      { path: 'dashboard', component: DashboardComponent, outlet: 'adr', canActivate: [DashboardGuard] },
      { path: 'cobros', component: CobrosComponent, outlet: 'adr', canActivate: [CobrosGuard] },
      { path: 'cobros/:id_afiliado', component: DetalleCobrosComponent, outlet: 'adr', canActivate: [CobrosGuard] },
      { path: 'historial-cobros', component: HistorialCobrosComponent, outlet: 'adr', canActivate: [CobrosGuard] },
      { path: 'historial-pedidos', component: HistorialPedidosComponent, outlet: 'adr', canActivate: [HistorialGuard] },
      { path: 'super-admin-panel', component: SuperAdminComponent, outlet: 'adr', canActivate: [SuperGuard] },
      { path: 'nuevo-admin', component: NuevoAdminComponent, outlet: 'adr', canActivate: [SuperGuard] },
      { path: 'cambiar-contraseña', component: AdminChangePwdComponent, outlet: 'adr' },
      { path: 'add-client', component: AddClientComponent, outlet: 'adr' },
      { path: 'add-venta', component: AddVentaComponent, outlet: 'adr' },
      { path: 'edit-admin', component: EditAdminComponent, outlet: 'adr' },
      { path: 'edit-client', component: EditClientComponent, outlet: 'adr' },
      { path: 'ventas', component: VentasComponent, outlet: 'adr' },
      { path: 'previsualizar-archivo/:id', component: PrevArchivoComponent, outlet: 'adr' },
      { path: 'ficha-cliente', component: FichaClienteComponent, outlet: 'adr' },
      { path: 'ficha-user', component: FichaUserComponent, outlet: 'adr' },
      { path: 'validador-venta/:id', component: ValidadorVentaComponent, outlet: 'adr' },
      { path: 'config', component: ConfigComponent, outlet: 'adr' },
      { path: 'tasas', component: TasasComponent, outlet: 'adr' },
      { path: 'add-tasas', component: AddTasasComponent, outlet: 'adr' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
