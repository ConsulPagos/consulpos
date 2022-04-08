export interface SearchPosResponse {
    R?: string;
    M?: string;
    items: any;
    session_valid: string;
    value_exists: string;
    total_row: string;
}

import { CryptoService } from "../shared/services/crypto.service";

export class SearchPosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): SearchPosResponse {

        const verify: SearchPosResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            value_exists: this.crypto.decryptJson(value.value_exists),
            session_valid: this.crypto.decryptJson(value.session_valid),
            items:JSON.parse(this.crypto.decryptJson(value.items)) as any[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        // console.log(verify)
        return verify
    }
}