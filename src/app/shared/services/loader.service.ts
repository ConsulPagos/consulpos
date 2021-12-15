import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private onSubject = new Subject<boolean>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor() { }

  loading() {
    this.onSubject.next(true);
  }

  stop() {
    this.onSubject.next(false);
  }


}
