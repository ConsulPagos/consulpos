import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ExcelReaderService {

  finished = new Subject();

  constructor() { }

  async read(binarystr, p): Promise<any> {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('../admin.worker', { type: 'module' });
      worker.postMessage({ binarystr: binarystr, n_pagina: p });
      return worker.onmessage = ({ data }) => {
        console.log(data)
        this.finished.next(data)
      };
    } else {
      throw new Error(' Web Workers are not supported in this environment.');
    }
  }
}
