import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/home/pages/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', loadChildren: () => import(`./modules/admin/admin.module`).then(m => m.AdminModule) },
  { path: '**', redirectTo: '' , pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
