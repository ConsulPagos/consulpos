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
import { RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './modules/admin/pages/dashboard/dashboard.component';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { ChangePasswordDialogComponent } from './shared/components/change-password-dialog/change-password-dialog.component';
import { EditphoneComponent } from './shared/components/editphone/editphone.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordDialogComponent,
    EditphoneComponent
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
    /* AngularFireModule.initializeApp({
      apiKey: "AIzaSyAjz1qfKLyU34V0ExgnH969c9t4-cAiKzc",
      authDomain: "g-altius.firebaseapp.com",
      databaseURL: "https://g-altius.firebaseio.com",
      projectId: "g-altius",
      storageBucket: "g-altius.appspot.com",
      messagingSenderId: "301996780499",
      appId: "1:301996780499:web:0c858330142efc5a259d26",
      measurementId: "G-9WHJ3FEJ9S"
    }), */
    AngularFireStorageModule,
    NgxIntlTelInputModule,
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  providers: [AffiliateGuard, AdminGuard, HomeGuard, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
