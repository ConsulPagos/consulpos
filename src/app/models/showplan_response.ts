import {AlmacenesRequestInterface} from './almacenes_request';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowPlanResponse {
    R?: string;
    M?: string;
    session_valid: string;
    planes: any[];
    total_row: string;
}

export class ShowPlanDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowPlanResponse {

        const verify: ShowPlanResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            planes:JSON.parse(this.crypto.decryptJson(value.planes)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}