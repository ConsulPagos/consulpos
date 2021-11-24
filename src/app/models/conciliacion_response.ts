import { CryptoService } from "../shared/services/crypto.service";
import { ArchivoInterface } from "./archivo";

export interface ConciliacionResponse {
    archivos:ArchivoInterface[];
    // R?: string;
    // M?: string;
    keyS: string;
    ivS: string;
    keyJ: string;
    ivJ: string;
}

export class ConciliacionDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ConciliacionResponse {

        const verify: ConciliacionResponse = {
            // M: this.crypto.decryptJson(value.M),
            keyS: this.crypto.decryptString(value.keyS),
            ivS: this.crypto.decryptString(value.ivS),
            keyJ: this.crypto.decryptJson(value.keyJ),
            ivJ: this.crypto.decryptJson(value.ivJ),
            archivos: JSON.parse(this.crypto.decryptJson(value.archivos)),
        }
        console.log(verify)
        return verify
    }
}