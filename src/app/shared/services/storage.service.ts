import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { share } from 'rxjs/operators';
import { CryptoService } from './crypto.service';

@Injectable()
export class StorageService implements OnDestroy {
    private onSubject = new Subject<{ key: string, value: any }>();
    public changes = this.onSubject.asObservable().pipe(share());

    constructor(private crypto: CryptoService) {
        this.start();
    }

    ngOnDestroy() {
        this.stop();
    }

    public getStorage() {
        let s = [];
        for (let i = 0; i < localStorage.length; i++) {
            s.push({
                key: localStorage.key(i),
                value: JSON.parse(localStorage.getItem(localStorage.key(i)))
            });
        }
        return s;
    }

    public store(key: string, data: any): void {
        localStorage.setItem(key, this.crypto.encryptStringStorage(JSON.stringify(data)));
        // the local application doesn't seem to catch changes to localStorage...
        this.onSubject.next({ key: key, value: data })
    }

    public storeJson(key: string, data: {}): void {
        for (var clave in data) {
            data[clave] = this.crypto.encryptJsonStorage(data[clave])
        }
        localStorage.setItem(key, this.crypto.encryptStringStorage(JSON.stringify(data)));
        // the local application doesn't seem to catch changes to localStorage...
        this.onSubject.next({ key: key, value: data })
    }

    public get(key: string): any {
        var data;
        try {
            data = JSON.parse(this.crypto.decryptStringStorage(localStorage.getItem(key)))
        } catch (error) {
            data = null
        }
        return data
    }

    public getJson(key: string): any {
        var data = JSON.parse(this.crypto.decryptStringStorage(localStorage.getItem(key)))
        for (var clave in data) {
            data[clave] = this.crypto.decryptJsonStorage(data[clave])
        }
        return data
    }

    public clear(key) {
        localStorage.removeItem(key);
        // the local application doesn't seem to catch changes to localStorage...
        this.onSubject.next({ key: key, value: null });
    }


    private start(): void {
        window.addEventListener("storage", this.storageEventListener.bind(this));
    }

    private storageEventListener(event: StorageEvent) {
        if (event.storageArea == localStorage) {
            let v;
            try {
                v = JSON.parse(event.newValue);
            } catch (e) {
                v = event.newValue;
            }
            this.onSubject.next({ key: event.key, value: v });
        }
    }

    private stop(): void {
        window.removeEventListener("storage", this.storageEventListener.bind(this));
        this.onSubject.complete();
    }
}