import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffiliateRoutingModule } from './affiliate-routing.module';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { AreaPersonalComponent } from './pages/area-personal/area-personal.component';
import { PedidoConfirmadoComponent } from './pages/pedido-confirmado/pedido-confirmado.component';
import { AfiliadoErrorComponent } from './components/afiliado-error/afiliado-error.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';
import { PortafolioCarruselComponent } from './pages/portafolio-carrusel/portafolio-carrusel.component';
import { OwlModule } from 'ngx-owl-carousel';
import { EditAffiliateComponent } from './components/edit-affiliate/edit-affiliate.component';
import { DocumentValidationComponent } from './components/document-validation/document-validation.component';
import { ConfirmPedidoDialogComponent } from './components/confirm-pedido-dialog/confirm-pedido-dialog.component';
import { AccountVerificationComponent } from './pages/account-verification/account-verification.component';
import { MatBadgeModule } from '@angular/material/badge';
import { EditAddressDialogComponent } from './components/edit-address-dialog/edit-address-dialog.component';




@NgModule({
  declarations: [
    PortafolioComponent,
    HistorialComponent,
    ContactoComponent,
    ProductoComponent,
    AreaPersonalComponent,
    PedidoConfirmadoComponent,
    AfiliadoErrorComponent,
    DetallePedidoComponent,
    PortafolioCarruselComponent,
    EditAffiliateComponent,
    DocumentValidationComponent,
    ConfirmPedidoDialogComponent,
    AccountVerificationComponent,
    EditAddressDialogComponent
   ],
  imports: [
    CommonModule,
    AffiliateRoutingModule,
    SharedModule,
    MatDividerModule,
    MatButtonToggleModule,
    OwlModule,
    MatBadgeModule
  ]

})
export class AfiliadoModule { }
