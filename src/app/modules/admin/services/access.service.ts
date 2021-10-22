import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  //super admin access_level 99
  //vendedor access_level 98
  //depositario access_level 97

  private _inventario = [99]
  private _salidas = [99, 97]
  private _cobros = [99, 98]
  private _sku = [99]
  private _crm = [99, 98]
  private _clientes = [99, 98]
  private _historial = [99, 98]
  private _pedidos = [99, 98]
  private _super = [99]
  private _dashboard = [99]
  private _detalle_pedidos = [99, 98, 97]
  private _venta_manual = [99, 98]

  constructor(private auth:AuthService) { }

  inventario(){
    return this._inventario.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  cobros(){
    return this._cobros.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  salidas(){
    return this._salidas.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  sku(){
    return this._sku.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  crm(){
    return this._crm.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  clientes(){
    return this._clientes.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  historial(){
    return this._historial.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  pedidos(){
    return this._pedidos.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  detalle_pedidos(){
    return this._detalle_pedidos.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  super(){
    return this._super.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  dashboard(){
    return this._dashboard.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

  venta_manual(){
    return this._venta_manual.find(n => n === this.auth.getAccessLevel()) ? true : false;
  }

}