import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AccessService } from '../services/access.service';

@Injectable({
  providedIn: 'root'
})
export class InventarioGuard implements CanActivate {
  constructor(public router: Router, private access: AccessService) { }
  canActivate(): boolean {
    if (!this.access.inventario()){
      this.router.navigateByUrl("/admin/app/(afr:dashboard)")
      return false;
    }
    return true;
  }
}
