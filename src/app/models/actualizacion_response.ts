import { CryptoService } from "../shared/services/crypto.service";
import { ArchivoInterface } from "./archivo";

export interface ActualizacionResponse {
    archivos:ArchivoInterface[];
    R?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
    tipo_archivo?:string;
    n_pagina?:number;

}

export class ActualizacionDecrypter {

    constructor(private crypto: CryptoService) {}

    deserialize(value: any): ActualizacionResponse {

        const data: ActualizacionResponse = {
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            archivos: JSON.parse(this.crypto.decryptJson(value.archivos)),
            tipo_archivo: this.crypto.decryptJson(value.tipo_archivo),
            n_pagina: parseInt(this.crypto.decryptJson(value.n_pagina)),
            R: value.R
        }
        return data
    }
}