import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AccessService } from '../services/access.service';

@Injectable({
  providedIn: 'root'
})
export class VentaManualGuard implements CanActivate {
  constructor(public router: Router, private access: AccessService) { }
  canActivate(): boolean {
    if (!this.access.venta_manual()){
      this.router.navigateByUrl("/admin/app/(afr:dashboard)")
      return false;
    }
    return true;
  }
  
}
