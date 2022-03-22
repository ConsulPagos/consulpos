import {ProvedoresRequestInterface} from './provedores_request';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowProvedoresResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    proveedores: ProvedoresRequestInterface[];
    total_row: string;
}

export class ShowProvedoresDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowProvedoresResponse {

        const verify: ShowProvedoresResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            proveedores:JSON.parse(this.crypto.decryptJson(value.proveedores)) as ProvedoresRequestInterface[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}