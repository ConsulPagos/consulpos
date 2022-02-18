import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesInterface } from 'src/app/models/rol';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class HasPermisoGuard implements CanActivate {
  constructor(private storage: StorageService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const permisos = JSON.parse(this.storage.get(constant.PERMISOS))
    const data = next.data
    return permisos.filter(p => p.modulo == data.modulo && p.permiso == data.permiso && p.submodulo == data.submodulo).length == 1
  }

}
