import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './modules/home/pages/landing-page/landing-page.component';
import { LoginComponent } from './modules/home/pages/login/login.component';
import { SignUpComponent } from './modules/home/pages/sign-up/sign-up.component';
import { AffiliateGuard } from './guards/affiliate.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'afiliarme', component: SignUpComponent  },
  { path: 'afiliado', loadChildren: () => import(`./modules/affiliate/affiliate.module`).then(m => m.AfiliadoModule)   },
  { path: 'admin', loadChildren: () => import(`./modules/admin/admin.module`).then(m => m.AdminModule) },
  { path: '**', redirectTo: '' , pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
