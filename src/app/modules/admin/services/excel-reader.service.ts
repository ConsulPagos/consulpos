import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelReaderService {

  finished = new Subject();

  constructor(private toaster: ToasterService) { }

  async read(str: any, type: any, p?: any, plantilla?: any): Promise<any> {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('../admin.worker', { type: 'module' });
      worker.postMessage({ str: str, type: type, n_pagina: p, plantilla: plantilla });
      worker.onerror = ({ error }) => {
        this.toaster.error("Error al procesar el archivo")
        this.finished.next(null)
      };
      return worker.onmessage = ({ data }) => {
        console.log(data)
        this.finished.next(data)
      };
    } else {
      throw new Error(' Web Workers are not supported in this environment.');
    }
  }

  async slice(array: any[], start: number, end: Number): Promise<any> {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('../workers/slice.worker', { type: 'module' });
      worker.postMessage({ array: array, start: start, end: end });
      worker.onerror = ({ error }) => {
        this.toaster.error("Error inesperado")
        this.finished.next(null)
      };
      return worker.onmessage = ({ data }) => {
        console.log(data)
        this.finished.next(data)
      };
    } else {
      throw new Error(' Web Workers are not supported in this environment.');
    }
  }
}
