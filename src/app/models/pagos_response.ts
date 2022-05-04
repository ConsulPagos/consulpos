import { CryptoService } from "../shared/services/crypto.service"

export interface PagosResponse {
    R?: string;
    M?: string;
    t_pagos?: string;
    total_dolar?: string;
    total_Bs?: string;
    total_IGTF?: string;
    total_IVA?: string;
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
            total_dolar: this.crypto.decryptJson(value.total_dolar),
            total_Bs: this.crypto.decryptJson(value.total_Bs),
            total_IGTF: this.crypto.decryptJson(value.total_IGTF),
            total_IVA: this.crypto.decryptJson(value.total_IVA),
            session_valid: this.crypto.decryptJson(value.session_valid),
        }
        return data
    }
}