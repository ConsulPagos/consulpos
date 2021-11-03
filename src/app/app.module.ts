import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AffiliateComponent } from './modules/affiliate/affiliate.component';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { SignUpComponent } from './modules/home/pages/sign-up/sign-up.component';
import { NavbarHomeComponent } from './modules/home/components/navbar-home/navbar-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './modules/home/pages/landing-page/landing-page.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeGuard } from './guards/home.guard';
import { AfiliadoNavbarComponent } from './modules/affiliate/components/afiliado-navbar/afiliado-navbar.component'
import { MatBadgeModule } from '@angular/material/badge'
import { MatMenuModule } from '@angular/material/menu'
import { AfiliadoModule } from './modules/affiliate/affiliate.module';
import { SharedModule } from './shared/modules/shared/shared.module';
import { AffiliateGuard } from './guards/affiliate.guard';
import { AdminGuard } from './guards/admin.guard';
import { StorageService } from './shared/services/storage.service';
import { BottomImageComponent } from './shared/components/bottom-image/bottom-image.component';
import { AuthInterceptorService } from './shared/interceptors/auth_interceptor';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarritoComponent } from './modules/affiliate/pages/carrito/carrito.component';
import { MatDividerModule } from '@angular/material/divider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignupSuccessfulDialogComponent } from './modules/home/components/signup-successful-dialog/signup-successful-dialog.component';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireModule } from '@angular/fire';
import { ChangePasswordDialogComponent } from './shared/components/change-password-dialog/change-password-dialog.component';
import { EditAddressComponent } from './shared/components/edit-address/edit-address.component';
import { HagaSuPedidoDialogComponent } from './modules/home/components/haga-su-pedido-dialog/haga-su-pedido-dialog.component';
import { CarruselLandingComponent } from './modules/home/components/carrusel-landing/carrusel-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    AffiliateComponent,
    LoginComponent,
    SignUpComponent,
    NavbarHomeComponent,
    LandingPageComponent,
    AfiliadoNavbarComponent,
    BottomImageComponent,
    CarritoComponent,
    SignupSuccessfulDialogComponent,
    ChangePasswordDialogComponent,
    EditAddressComponent,
    HagaSuPedidoDialogComponent,
    CarruselLandingComponent,

],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatButtonModule,
    MatBadgeModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    AfiliadoModule,
    SharedModule,
    MatProgressSpinnerModule,
    CollapseModule,
    MatDividerModule,
    MatStepperModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAjz1qfKLyU34V0ExgnH969c9t4-cAiKzc",
      authDomain: "g-altius.firebaseapp.com",
      databaseURL: "https://g-altius.firebaseio.com",
      projectId: "g-altius",
      storageBucket: "g-altius.appspot.com",
      messagingSenderId: "301996780499",
      appId: "1:301996780499:web:0c858330142efc5a259d26",
      measurementId: "G-9WHJ3FEJ9S"
    }),
    AngularFireStorageModule
  ],
  providers: [AffiliateGuard, AdminGuard, HomeGuard, StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
