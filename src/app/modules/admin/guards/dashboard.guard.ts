import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AccessService } from '../services/access.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(public router: Router, private access: AccessService, private auth: AuthService) { }
  canActivate(): boolean {
    if (!this.access.dashboard()) {
      if (this.auth.getAccessLevel() == 97) {
        this.router.navigateByUrl("/admin/app/(adr:salida-pedidos)")
        return false;
      } else if (this.auth.getAccessLevel() == 98) {
        this.router.navigateByUrl("/admin/app/(adr:crm)")
        return false;
      }
    }
    return true;
  }

}
