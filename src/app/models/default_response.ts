import { CryptoService } from "../shared/services/crypto.service"

export interface DefaultResponse {
    R?: string;
    M?: string;
    keyS?: string;
    ivS?: string;
    keyJ?: string;
    ivJ?: string;
    permisos?: string;
}

export class DefaultDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): DefaultResponse {

        const data: DefaultResponse = {
            R: value.R,
            // M: value.M,
            M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            permisos: this.crypto.decryptJson(value.permisos),
        }
        return data
    }
}