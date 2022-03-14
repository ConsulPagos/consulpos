import {SucursalesRequestInterface} from './sucursales_request';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowSucursalesResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    sucursales: SucursalesRequestInterface[];
    total_row: string;
}

export class ShowSucursalesDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowSucursalesResponse {

        const verify: ShowSucursalesResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            sucursales:JSON.parse(this.crypto.decryptJson(value.sucursales)) as SucursalesRequestInterface[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}