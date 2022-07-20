import {AlmacenesRequestInterface} from './almacenes_request';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowFraccionResponse {
    R?: string;
    M?: string;
    session_valid: string;
    configuracion: any[];
    total_row: string;
}

export class ShowFraccionDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowFraccionResponse {

        const verify: ShowFraccionResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            configuracion:JSON.parse(this.crypto.decryptJson(value.configuracion)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}