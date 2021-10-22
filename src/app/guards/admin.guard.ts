import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public router: Router, private auth: AuthService) { }
  //revisa si el usuario es logueado, sino lo redirige al login
  canActivate(): boolean {
    /* if (!this.auth.isAuth()) {
      this.router.navigateByUrl("/ingresar)")
      return false;
    }
    if (this.auth.getAccessLevel() < 90) {
      this.router.navigateByUrl("/afiliado/app/(afr:portafolio)")
      return false;
    } */
    return true;
  }
}
