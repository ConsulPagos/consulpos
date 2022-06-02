import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private scod: String

  constructor(private http: HttpClient) { }

  doSale(data) {
    var path = `/sell/saveSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doDesafiliateSale(data) {
    var path = `/sell/disaffiliateSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doVerifyItem(data) {
    var path = `/sell/verifyItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doVerifyStatusAccount(data) {
    var path = `/sell/verifyStatusAccount`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doAllSale(data) {
    var path = `/sell/allSales`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSales(data) {
    var path = `/sell/findSale`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSalesByStatus(data) {
    var path = `/sell/findSaleByStatus`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doOccUser(data) {
    var path = `/sell/occByUser`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSimModels(data) {
    var path = `/sell/simModels`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindPos(data) {
    var path = `/sell/findPosToAssing`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doFindSim(data) {
    var path = `/sell/findSimToAssing`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doSaveConfig(data) {
    var path = `/sell/salesConfig`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doAutomaticAssingItem(data) {
    var path = `/sell/automaticAssingItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doEndAssingItem(data) {
    var path = `/sell/endAssingItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doOperacionDeTraspaso(data) {
    var path = `/sell/operacionDeTraspaso`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doOperacionCambioBanco(data) {
    var path = `/sell/operacionCambioBanco`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCrearTraspaso(data) {
    var path = `/sell/crearTraspaso`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  ///////////////////////////////////////////////////////////////

  solicitudesPorTipo(data) {
    var path = `/sell/solicitudesPorTipo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  estadoCuentaEquipo(data) {
    var path = `/sell/estadoCuentaEquipo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  equiposPorCliente(data) {
    var path = `/sell/equiposPorCliente`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  desafiliar(data) {
    var path = `/sell/desafiliar`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  crearTraspaso(data) {
    var path = `/sell/crearTraspaso`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  asignacionManual(data) {
    var path = `/sell/asignacionManual`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  parametrizacionManual(data) {
    var path = `/sell/ParametrizacionManual`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  configuracionManual(data) {
    var path = `/sell/configuracionManual`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  liberarSim(data) {
    var path = `/sell/liberarItem`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCambioDeEquipo(data) {
    var path = `/sell/crearCambioDeEquipo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCambioDeBanco(data) {
    var path = `/sell/crearCambioDeBanco`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  doCambioDeSim(data) {
    var path = `/sell/crearCambioDeSim`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  informacionDeEquipo(data) {
    var path = `/sell/InformacionDeEquipo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  informacionDeSim(data) {
    var path = `/sell/InformacionDeSim`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  crearDesinstalacionDeEquipo(data) {
    var path = `/sell/crearDesinstalacionDeEquipo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  crearReactivacionDeEquipo(data) {
    var path = `/sell/crearReactivacionDeEquipo`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  equiposPorSolicitud(data) {
    var path = `/sell/equiposPorSolicitud`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

  actualizarPosPorTest(data) {
    var path = `/sell/actualizarPosPorTest`;
    var headers = new HttpHeaders()
    headers.set('Content-Type', 'text/plain')
    headers.set('Accept', 'text/plain');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post(`${environment.apiHost}${environment.divider}${environment.puerto_ventas}` + path, data, { headers: headers, responseType: 'text' })
  }

}
