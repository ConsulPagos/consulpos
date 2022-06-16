import {AlmacenesRequestInterface} from './almacenes_request';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowPlanResponse {
    value_exists: string;
    R?: string;
    M?: string;
    session_valid: string;
    configuracion: any[];
    total_row: string;
}

export class ShowPlanDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowPlanResponse {

        const verify: ShowPlanResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            configuracion:JSON.parse(this.crypto.decryptJson(value.configuracion)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}