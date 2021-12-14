export interface GeneracionResponse {
    cuotas: [];
    cantidad_cuotas: number;
    decimales: number;
    tipo_archivo: string;
    usar_coma: number;
    id_archivo: number;
    total: number;
    total_bolivares: number;

    R?: string;
    M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
}

import { CryptoService } from "../shared/services/crypto.service";

export class GeneracionDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): GeneracionResponse {

        const verify: GeneracionResponse = {
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            cuotas: JSON.parse(this.crypto.decryptJson(value.cuotas)),
            cantidad_cuotas: parseInt(this.crypto.decryptJson(value.cantidad_cuotas)),
            decimales: parseInt(this.crypto.decryptJson(value.decimales)),
            tipo_archivo: this.crypto.decryptJson(value.tipo_archivo),
            usar_coma: parseInt(this.crypto.decryptJson(value.usar_coma)),
            id_archivo: parseInt(this.crypto.decryptJson(value.id_archivo)),
            total: parseFloat(this.crypto.decryptJson(value.total)),
            total_bolivares: parseFloat(this.crypto.decryptJson(value.total_bolivares)),
        }
        //console.log(verify)
        return verify
    }
}