import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ClientelaComponent } from './pages/clientela/clientela.component';
import { ConciliarArchivoComponent } from './pages/conciliar-archivo/conciliar-archivo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NuevoAdminComponent } from './pages/nuevo-admin/nuevo-admin.component';
import { GenerarArchivoComponent } from './pages/generar-archivo/generar-archivo.component';
import { SuperAdminComponent } from './pages/super-admin/super-admin.component';

import { AdminChangePwdComponent } from './pages/admin-change-pwd/admin-change-pwd.component';
import { AddClientComponent } from './pages/add-client/add-client.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { AddVentaComponent } from './pages/add-venta/add-venta.component';
import { EditAdminComponent } from './pages/edit-admin/edit-admin.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { PrevArchivoComponent } from './pages/prev-archivo/prev-archivo.component';

import { VentaConsulposComponent } from './pages/venta-consulpos/venta-consulpos.component';
import { FichaClienteComponent } from './pages/ficha-cliente/ficha-cliente.component';
import { ValidadorVentaComponent } from './pages/validador-venta/validador-venta.component';
import { ActualizarArchivoComponent } from './pages/actualizar-archivo/actualizar-archivo.component';
import { HistoricoConciliacionComponent } from './pages/historico-conciliacion/historico-conciliacion.component';
import { ConfigComponent } from './pages/config/config.component';
import { TasasComponent } from './pages/tasas/tasas.component';
import { AddTasasComponent } from './pages/add-tasas/add-tasas.component';
import { FichaUserComponent } from './pages/ficha-user/ficha-user.component';
import { CobroCentralizadoComponent } from './pages/cobro-centralizado/cobro-centralizado.component';
import { AddRolComponent } from './pages/add-rol/add-rol.component';
import { EditRolComponent } from './pages/edit-rol/edit-rol.component';
import { RolesComponent } from './pages/roles/roles.component';
import { SeleccionCentralizadoComponent } from './pages/seleccion-centralizado/seleccion-centralizado.component';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { FichaSaleComponent } from './pages/ficha-sale/ficha-sale.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { AddPagosComponent } from './pages/add-pagos/add-pagos.component';
import { ValidarPagoComponent } from './pages/validar-pago/validar-pago.component';
import { AddAlmacenesComponent } from './pages/add-almacenes/add-almacenes.component';
import { AddMarcasComponent } from './pages/add-marcas/add-marcas.component';
import { AddModelosComponent } from './pages/add-modelos/add-modelos.component';
import { AddPlataformasComponent } from './pages/add-plataformas/add-plataformas.component';
import { AddProductosComponent } from './pages/add-productos/add-productos.component';
import { AddProvedoresComponent } from './pages/add-provedores/add-provedores.component';
import { AddSucursalesComponent } from './pages/add-sucursales/add-sucursales.component';
import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { EditAlmacenesComponent } from './pages/edit-almacenes/edit-almacenes.component';
import { EditMarcasComponent } from './pages/edit-marcas/edit-marcas.component';
import { EditModelosComponent } from './pages/edit-modelos/edit-modelos.component';
import { EditPlataformasComponent } from './pages/edit-plataformas/edit-plataformas.component';
import { EditProductosComponent } from './pages/edit-productos/edit-productos.component';
import { EditProvedoresComponent } from './pages/edit-provedores/edit-provedores.component';
import { EditSucursalesComponent } from './pages/edit-sucursales/edit-sucursales.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { ModelosComponent } from './pages/modelos/modelos.component';
import { PlataformasComponent } from './pages/plataformas/plataformas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProvedoresComponent } from './pages/provedores/provedores.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { CargarInventarioComponent } from './pages/cargar-inventario/cargar-inventario.component';
import { InventarioDetalleComponent } from './pages/inventario-detalle/inventario-detalle.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { MoverInventarioComponent } from './pages/mover-inventario/mover-inventario.component';
import { AddPedidosComponent } from './pages/add-pedidos/add-pedidos.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { EditPedidosComponent } from './pages/edit-pedidos/edit-pedidos.component';
import { CargarInventarioSimComponent } from './pages/cargar-inventario-sim/cargar-inventario-sim.component';
import { PagoManualComponent } from './pages/pago-manual/pago-manual.component';
import { TraspasoComponent } from './pages/traspaso/traspaso.component';
import { CambioBancoComponent } from './pages/cambio-banco/cambio-banco.component';
import { AddTraspasoComponent } from './pages/add-traspaso/add-traspaso.component';
import { AddCambioPosComponent } from './pages/add-cambio-pos/add-cambio-pos.component';
import { AddCambioSimComponent } from './pages/add-cambio-sim/add-cambio-sim.component';
import { CambioSimComponent } from './pages/cambio-sim/cambio-sim.component';
import { CambioPosComponent } from './pages/cambio-pos/cambio-pos.component';
import { AddCambioBancoComponent } from './pages/add-cambio-banco/add-cambio-banco.component';
import { ReactivacionComponent } from './pages/reactivacion/reactivacion.component';
import { DesinstalacionComponent } from './pages/desinstalacion/desinstalacion.component';
import { AddDesinstalacionComponent } from './pages/add-desinstalacion/add-desinstalacion.component';
import { AddReactivacionComponent } from './pages/add-reactivacion/add-reactivacion.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { ValidarPruebaComponent } from './pages/validar-prueba/validar-prueba.component';
import { ValidarPruebaFichaComponent } from './pages/validar-prueba-ficha/validar-prueba-ficha.component';
import { PlanComponent } from './pages/plan/plan.component';
import { AddPlanComponent } from './pages/add-plan/add-plan.component';
import { AddPagoManualComponent } from './pages/add-pago-manual/add-pago-manual.component';
import { PagoPendienteComponent } from './pages/pago-pendiente/pago-pendiente.component';
import { CargaMasivaComponent } from './pages/carga-masiva/carga-masiva.component';
import { FichaTraspasoComponent } from './pages/ficha-traspaso/ficha-traspaso.component';
import { FichaCambioEquipoComponent } from './pages/ficha-cambio-equipo/ficha-cambio-equipo.component';
import { ListarArchivosComponent } from './pages/listar-archivos/listar-archivos.component';
import { HasPermisoGuard } from '../admin/guards/has-permiso.guard';

const routes: Routes = [
  {
    path: 'app',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
        outlet: 'adr',
        // canActivate: [HasPermisoGuard],
        data: {
          modulo: "Cobranza",
          submodulo: "Cobro Centralizado",
          permiso: "Leer"
        }
      },
      {
        path: 'config', component: ConfigComponent, outlet: 'adr',
        // canActivate: [HasPermisoGuard],
        //  data: {
        //    modulo: "Cobranza",
        //    submodulo: "Cobro Centralizado",
        //    permiso: "Leer"
        //  }
      },
      {
        path: 'clientela', component: ClientelaComponent, outlet: 'adr',
        // canActivate: [HasPermisoGuard],
        data: {
          modulo: "Clientes",
          submodulo: "Listado",
          permiso: "Leer"
        }
      },
      {
        path: 'edit-client', component: EditClientComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Clientes",
          submodulo: "Listado",
          permiso: "Editar"
        }
      },
      {
        path: 'add-client', component: AddClientComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Clientes",
          submodulo: "Listado",
          permiso: "Crear"
        }
      },
      {
        path: 'ficha-cliente', component: FichaClienteComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Clientes",
          submodulo: "Ficha",
          permiso: "Leer"
        }
      },
      {
        path: 'super-admin-panel', component: SuperAdminComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Usuarios",
          permiso: "Leer"
        }
      },
      {
        path: 'ficha-user', component: FichaUserComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Usuarios",
          permiso: "Leer"
        }
      },
      {
        path: 'edit-admin', component: EditAdminComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Usuarios",
          permiso: "Editar"
        }
      },
      {
        path: 'cambiar-contraseña', component: AdminChangePwdComponent, outlet: 'adr'
      },
      {
        path: 'nuevo-admin', component: NuevoAdminComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Usuarios",
          permiso: "Crear"
        }
      },
      {
        path: 'generar-archivo', component: GenerarArchivoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Domiciliacion",
          submodulo: "Generar Archivo",
          permiso: "Generar Archivo"
        }
      },
      {
        path: 'actualizar-archivo', component: ActualizarArchivoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Domiciliacion",
          submodulo: "Cargar Respuesta",
          permiso: "Cargar Archivo"
        }
      },
      {
        path: 'conciliar-archivo', component: ConciliarArchivoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Conciliacion",
          submodulo: "Conciliar Archivo",
          permiso: "Conciliar Archivo"
        }
      },
      {
        path: 'historico-conciliacion', component: HistoricoConciliacionComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Conciliacion",
          submodulo: "Historico",
          permiso: "Leer"
        }
      },
      {
        path: 'cobro-centralizado', component: CobroCentralizadoComponent,
        outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Cobro Centralizado",
          submodulo: "Cobro Centralizado",
          permiso: "Generar Archivo"
        }
      },
      {
        path: 'previsualizar-archivo/:id', component: PrevArchivoComponent, outlet: 'adr'
      },
      {
        path: 'seleccion-centralizado', component: SeleccionCentralizadoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Cobro Centralizado",
          submodulo: "Cobro Centralizado",
          permiso: "Cargar Archivo"
        }
      },
      {
        path: 'roles', component: RolesComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Roles",
          permiso: "Leer"
        }
      },
      {
        path: 'add-rol', component: AddRolComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Roles",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-rol', component: EditRolComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Roles",
          permiso: "Editar"
        }
      },

      {
        path: 'ventas', component: VentasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Ventas",
          submodulo: "Listado",
          permiso: "Leer"
        }
      },
      {
        path: 'ficha-sale', component: FichaSaleComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Ventas",
          submodulo: "Ficha",
          permiso: "Leer"
        }
      },
      {
        path: 'validador-venta/:id', component: ValidadorVentaComponent, outlet: 'adr'
      },
      {
        path: 'add-venta', component: AddVentaComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Ventas",
          submodulo: "Listado",
          permiso: "Crear"
        }
      },
      {
        path: 'venta-consulpos', component: VentaConsulposComponent, outlet: 'adr'
      },
      {
        path: 'operaciones/:tipo_operacion', component: OperacionesComponent, outlet: 'adr'
      },
      {
        path: 'pagos', component: PagosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Pagos",
          submodulo: "Listado",
          permiso: "Leer"
        }
      },
      {
        path: 'add-pagos', component: AddPagosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Pagos",
          submodulo: "Listado",
          permiso: "Crear"
        }
      },
      {
        path: 'validar-pago', component: ValidarPagoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Pagos",
          submodulo: "Validar Pago",
          permiso: "Leer"
        }
      },
      {
        path: 'tasas', component: TasasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Leer"
        }
      },
      {
        path: 'add-tasas', component: AddTasasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-almacenes', component: AddAlmacenesComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-marcas', component: AddMarcasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-modelos', component: AddModelosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-plataformas', component: AddPlataformasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-productos', component: AddProductosComponent, outlet: 'adr',
        // canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-provedores', component: AddProvedoresComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-sucursales', component: AddSucursalesComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'almacenes', component: AlmacenesComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-almacenes', component: EditAlmacenesComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-marcas', component: EditMarcasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-modelos', component: EditModelosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-plataformas', component: EditPlataformasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-productos', component: EditProductosComponent, outlet: 'adr',
        // canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-provedores', component: EditProvedoresComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-sucursales', component: EditSucursalesComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'marcas', component: MarcasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'modelos', component: ModelosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'plataformas', component: PlataformasComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'productos', component: ProductosComponent, outlet: 'adr',
        // canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'provedores', component: ProvedoresComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'sucursales', component: SucursalesComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },

      {
        path: 'inventario', component: InventarioComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },

      {
        path: 'mover-inventario', component: MoverInventarioComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'cargar-inventario', component: CargarInventarioComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'inventario/detalle/:id', component: InventarioDetalleComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'pedidos', component: PedidosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-pedidos', component: AddPedidosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'edit-pedidos', component: EditPedidosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'cargar-inventario-sim', component: CargarInventarioSimComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'mover-inventario', component: MoverInventarioComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'pago-manual', component: PagoManualComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'traspaso', component: TraspasoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'cambio-banco', component: CambioBancoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-traspaso', component: AddTraspasoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-cambio-banco', component: AddCambioBancoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-cambio-pos', component: AddCambioPosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-cambio-sim', component: AddCambioSimComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'cambio-pos', component: CambioPosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'cambio-sim', component: CambioSimComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'reactivacion', component: ReactivacionComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'desinstalacion', component: DesinstalacionComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-desinstalacion', component: AddDesinstalacionComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-reactivacion', component: AddReactivacionComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'prueba', component: PruebaComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'validar-prueba', component: ValidarPruebaComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'validar-prueba-ficha/:id', component: ValidarPruebaFichaComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-plan', component: AddPlanComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'plan', component: PlanComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'pago-manual', component: PagoManualComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-pago-manual', component: AddPagoManualComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'add-pago-manual', component: AddPagoManualComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'pago-pendiente', component: PagoPendienteComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Configuracion",
          submodulo: "Tasas",
          permiso: "Crear"
        }
      },
      {
        path: 'carga-masiva', component: CargaMasivaComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Domiciliacion",
          submodulo: "Generar Archivo",
          permiso: "Generar Archivo"
        }
      },
      {
        path: 'ficha-traspaso', component: FichaTraspasoComponent, outlet: 'adr',
      },
      {
        path: 'listar-archivos', component: ListarArchivosComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Domiciliacion",
          submodulo: "Generar Archivo",
          permiso: "Generar Archivo"
        }
      },
      {
        path: 'ficha-cambio-equipo', component: FichaCambioEquipoComponent, outlet: 'adr',
        //  canActivate: [HasPermisoGuard],
        data: {
          modulo: "Domiciliacion",
          submodulo: "Generar Archivo",
          permiso: "Generar Archivo"
        }
      },



    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
