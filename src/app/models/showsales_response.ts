import {SaleRequestInterface} from './sales';
import { CryptoService } from "../shared/services/crypto.service";

export interface ShowSalesResponse {
    R?: string;
    M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    ventas: SaleRequestInterface[];
    total_row: string;
    session_valid?: string;
}

export class ShowSalesDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowSalesResponse {

        const verify: ShowSalesResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            ventas:JSON.parse(this.crypto.decryptJson(value.ventas)) as SaleRequestInterface[],
            total_row: this.crypto.decryptJson(value.total_row),
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        // console.log(verify)
        return verify
    }
}