import { CryptoService } from "../shared/services/crypto.service"

export interface PagosResponse {
    R?: string;
    M?: string;
    keyS?: string;
    ivS?: string;
    keyJ?: string;
    ivJ?: string;
    t_pagos?: string;
    total?: string;
}

export class PagosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): PagosResponse {

        const data: PagosResponse = {
            R: value.R,
            // M: value.M,
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            t_pagos: this.crypto.decryptJson(value.t_pagos),
            total: this.crypto.decryptJson(value.total),
        }
        return data
    }
}