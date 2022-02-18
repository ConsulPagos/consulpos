import { CryptoService } from "../shared/services/crypto.service";
import { ArchivoInterface } from "./archivo";

export interface ActualizacionResponse {
    archivos: ArchivoInterface[];
    R?: string;

    tipo_archivo?: string;
    n_pagina?: number;

}

export class ActualizacionDecrypter {

    constructor(private crypto: CryptoService) { }

    deserialize(value: any): ActualizacionResponse {

        const data: ActualizacionResponse = {

            archivos: JSON.parse(this.crypto.decryptJson(value.archivos)),
            tipo_archivo: this.crypto.decryptJson(value.tipo_archivo),
            n_pagina: parseInt(this.crypto.decryptJson(value.n_pagina)),
            R: value.R
        }
        return data
    }
}