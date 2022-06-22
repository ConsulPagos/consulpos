import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeGuard } from './guards/home.guard';
import { MatBadgeModule } from '@angular/material/badge'
import { MatMenuModule } from '@angular/material/menu'
import { SharedModule } from "./shared/modules/shared/shared.module";
import { AffiliateGuard } from './guards/affiliate.guard';
import { AdminGuard } from './guards/admin.guard';
import { StorageService } from './shared/services/storage.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MatDividerModule } from '@angular/material/divider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { ChangePasswordDialogComponent } from './shared/components/change-password-dialog/change-password-dialog.component';
import { EditphoneComponent } from './shared/components/editphone/editphone.component';
import { AngularFireModule } from '@angular/fire';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordDialogComponent,
    EditphoneComponent,
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
    SharedModule,
    MatProgressSpinnerModule,
    CollapseModule,
    MatDividerModule,
    MatStepperModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAP-9HvAxZF2GxyruXkydTNoTD-uEAWzuQ",
      authDomain: "sgapos-desarrollo.firebaseapp.com",
      projectId: "sgapos-desarrollo",
      storageBucket: "sgapos-desarrollo.appspot.com",
      messagingSenderId: "167186511211",
      appId: "1:167186511211:web:0ed20fd34c595462f0482e"
    }),
    AngularFireStorageModule,
    NgxIntlTelInputModule,
    ChartsModule
  ],
  providers: [AffiliateGuard, AdminGuard, HomeGuard, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
