import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliateComponent } from './affiliate.component';
import { AreaPersonalComponent } from './pages/area-personal/area-personal.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { PedidoConfirmadoComponent } from './pages/pedido-confirmado/pedido-confirmado.component';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';
import { PortafolioCarruselComponent } from './pages/portafolio-carrusel/portafolio-carrusel.component';
import { AccountVerificationComponent } from './pages/account-verification/account-verification.component';
import { ValidationGuard } from "../../guards/validation.guard";

const routes: Routes = [
  {
    path: 'app',
    component: AffiliateComponent,
    children: [
      { path: 'portafolio', component: PortafolioComponent, outlet: 'afr' },
      { path: 'portafolio-carrusel', component: PortafolioCarruselComponent, outlet: 'afr' },
      { path: 'historial', component: HistorialComponent, outlet: 'afr' },
      { path: 'contacto', component: ContactoComponent, outlet: 'afr' },
      { path: 'verifique-su-cuenta', component: AccountVerificationComponent, outlet: 'afr', canActivate: [ValidationGuard] },
      { path: 'producto/:id', component: ProductoComponent, outlet: 'afr' },
      { path: 'area-personal', component: AreaPersonalComponent, outlet: 'afr' },
      { path: 'pedido-confirmado', component: PedidoConfirmadoComponent, outlet: 'afr' },
      { path: 'pedido/:id', component: DetallePedidoComponent, outlet: 'afr' },
      { path: '**', redirectTo: 'portafolio' }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffiliateRoutingModule { }
