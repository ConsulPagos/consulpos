import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationGuard implements CanActivate {
  constructor(public router: Router, private auth: AuthService) { }
  canActivate(): boolean {
    if (this.auth.getAccessLevel() == 4 || this.auth.getAccessLevel() == 2) {
      this.router.navigateByUrl("/afiliado/app/(afr:portafolio)")
      return false;
    }
    return true;
  }
}