import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AffiliateGuard implements CanActivate {
  constructor(public router: Router, private auth: AuthService) { }
  //revisa si el usuario es logueado, sino lo redirige al login
  canActivate(): boolean {

    if (!this.auth.isAuth()) {
      this.router.navigateByUrl("/ingresar)")
      return false;
    }

    if (this.auth.getAccessLevel() == 97) {
      this.router.navigateByUrl("/admin/app/(adr:salida-pedidos)")
      return false;
    } else if (this.auth.getAccessLevel() == 98) {
      this.router.navigateByUrl("/admin/app/(adr:crm)")
      return false;
    } else if (this.auth.getAccessLevel() == 99) {
      this.router.navigateByUrl("/admin/app/(adr:dashboard)")
      return false;
    }

    return true;
  }
}