import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private scod: String

  constructor(private http: HttpClient) { }
  //MODELOS
  doAllModels(data) {
    var path = `/stock/allModels`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindModels(data) {
    var path = `/stock/findModels`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveModels(data) {
    var path = `/stock/saveModels`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditModels(data) {
    var path = `/stock/editModels`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeleteModels(data) {
    var path = `/stock/deleteModels`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }


  doChangeStatusModel(data) {
    var path = `/stock/changeStatusModel`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }


  //MARCAS
  doAllMarcas(data) {
    var path = `/stock/allMarcas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindMarcas(data) {
    var path = `/stock/findMarcas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveMarcas(data) {
    var path = `/stock/saveMarcas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditMarcas(data) {
    var path = `/stock/editMarcas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeleteMarcas(data) {
    var path = `/stock/deleteMarcas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doChangeStatusMarca(data) {
    var path = `/stock/changeStatusMarca`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  //ALMACENES
  doAllAlmacenes(data) {
    var path = `/stock/allAlmacenes`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindAlmacenes(data) {
    var path = `/stock/findAlmacenes`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveAlmacenes(data) {
    var path = `/stock/saveAlmacenes`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditAlmacenes(data) {
    var path = `/stock/editAlmacenes`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeleteAlmacenes(data) {
    var path = `/stock/deleteAlmacenes`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doChangeStatusAlmacen(data) {
    var path = `/stock/changeStatusAlmacen`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  //Sucursales
  doAllSucursales(data) {
    var path = `/stock/allSucursales`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSucursales(data) {
    var path = `/stock/findSucursales`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveSucursales(data) {
    var path = `/stock/saveSucursales`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditSucursales(data) {
    var path = `/stock/editSucursales`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeleteSucursales(data) {
    var path = `/stock/deleteSucursales`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doChangeStatusSucursal(data) {
    var path = `/stock/changeStatusSucursal`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  //Proveedores
  doAllProveedores(data) {
    var path = `/stock/allProveedores`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindProveedores(data) {
    var path = `/stock/findProveedores`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveProveedores(data) {
    var path = `/stock/saveProveedores`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditProveedores(data) {
    var path = `/stock/editProveedores`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeleteProveedores(data) {
    var path = `/stock/deleteProveedores`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doChangeStatusProveedor(data) {
    var path = `/stock/changeStatusProvider`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  //Plataformas
  doAllPlataformas(data) {
    var path = `/stock/allPlataformas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindPlataformas(data) {
    var path = `/stock/findPlataformas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSavePlataformas(data) {
    var path = `/stock/savePlataformas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEditPlataformas(data) {
    var path = `/stock/editPlataformas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDeletePlataformas(data) {
    var path = `/stock/deletePlataformas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doChangeStatusPlataforma(data) {
    var path = `/stock/changeStatusPlataforma`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }
  //
  doListMarcas(data) {
    var path = `/stock/listMarcas`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doListCategorias(data) {
    var path = `/stock/listCategorias`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDisponibilidadAlmacen(data) {
    var path = `/stock/disponibilidadPorAlmacen`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDetalleAlmacen(data) {
    var path = `/stock/detalleDisponibilidadPorAlmacen`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCargarInventarioDePos(data) {
    var path = `/stock/cargarInventarioDePos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doMoverInventarioDePos(data) {
    var path = `/stock/moverInventario`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doListarPosConfigurados(data) {
    var path = `/stock/listarPosConfigurados`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doConfirmarConfiguracionPos(data) {
    var path = `/stock/confirmarConfiguracionPos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doListarPedidos(data) {
    var path = `/stock/listarPedidos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEncontrarPedidos(data) {
    var path = `/stock/encontrarPedidos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCrearPedido(data) {
    var path = `/stock/crearPedido`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doPedidosAbiertos(data) {
    var path = `/stock/pedidosAbiertos`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCoprobarSerialItem(data) {
    var path = `/stock/comprobarExistenciaItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_inventario}` + path, data, { headers: headers, responseType: 'text' })
  }
}
