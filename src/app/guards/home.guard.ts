import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service'

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }
  //mantiene el estado logueado
  //si el usuario esta logueado y es admin se le redirige al area de admins
  //si el usuario esta logueado y no es admin se le redirige al area de afiliados
  canActivate(): boolean {
    if (this.auth.isAuth()) {
      if(this.auth.getAccessLevel() < 90) {
          this.router.navigateByUrl("/afiliado/app/(afr:portafolio)")
        return false;
      } else {
        this.router.navigateByUrl("/admin/app/(adr:dashboard)")
        return false;
      }
    }
    return true;
  }
}