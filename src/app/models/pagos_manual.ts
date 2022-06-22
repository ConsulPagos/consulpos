import {SaleRequestInterface} from './sales';
import { CryptoService } from "../shared/services/crypto.service";

export interface PagosManualResponse {
    R?: string;
    M?: string;
   
    pagos: SaleRequestInterface[];
    total_row: string;
    session_valid?: string;
}

export class PagosManualDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): PagosManualResponse {

        const verify: PagosManualResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            pagos:JSON.parse(this.crypto.decryptJson(value.pagos)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        // console.log(verify)
        return verify
    }
}