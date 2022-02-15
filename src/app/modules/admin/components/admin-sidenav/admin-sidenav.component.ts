import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PermisoRoles, RolesInterface } from 'src/app/models/rol';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {

  @Output() Toggle = new EventEmitter<boolean>();

  identity = ''
  roles: RolesInterface;

  constructor(private auth: AuthService, private storage: StorageService) {
    this.identity = localStorage.getItem("identity")
  }

  ngOnInit(): void {

  }

  loggout() {
    this.auth.loggout();
  }

  toggle() {
    this.Toggle.emit(true)
  }

  hasPermiso(modulo: string, submodulo: string, permiso: string): boolean {
    if (!this.roles) {
      this.roles = JSON.parse(this.storage.get(constant.ROLES)).roles as RolesInterface
    }
    return this.roles.permisos.filter(p => p.modulo == modulo && p.permiso == permiso && p.submodulo == submodulo).length == 1
  }


}
