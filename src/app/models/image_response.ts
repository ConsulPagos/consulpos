import { CryptoService } from "../shared/services/crypto.service"

export interface ImageResponse {
    R?: string;
    M?: string;
    path?: string;
    nombre?: string;
    attached?: string;
    t_sol_id?: string;
    base64: string;
}

export class ImageDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ImageResponse {

        const data: ImageResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            path: this.crypto.decryptJson(value.path),
            nombre: this.crypto.decryptJson(value.nombre),
            attached: this.crypto.decryptJson(value.attached),
            t_sol_id: this.crypto.decryptJson(value.t_sol_id),
            base64: this.crypto.decryptJson(value.base64),
        }
        return data
    }
}