import { CryptoService } from "../shared/services/crypto.service"

export interface PagosResponse {
    R?: string;
    M?: string;
    t_pagos?: string;
    total?: string;
    session_valid?: string;
}

export class PagosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): PagosResponse {

        const data: PagosResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            
            t_pagos: this.crypto.decryptJson(value.t_pagos),
            total: this.crypto.decryptJson(value.total),
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        return data
    }
}