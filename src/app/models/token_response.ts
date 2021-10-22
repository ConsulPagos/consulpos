import { AddressInterface } from './address';

export interface TokenResponseInterface {
    id?: number;
    identity?: string;
    access_level?: string;
    access_token?: string;
    refresh_token?: string;
    estado?:string;
    addresses?: AddressInterface[];
    state?: string;
}