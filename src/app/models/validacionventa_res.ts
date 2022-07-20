export interface ValidacionventaRese {
    R?: string;
    M?: string;
    // documentos: any[];
    modelos: any[];
    solicitud: any[];
    solicitud_banco: any[];
}

import { CryptoService } from "../shared/services/crypto.service";

export class ValidacionventadosDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ValidacionventaRese {

        const verify: ValidacionventaRese = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            // documentos: JSON.parse(this.crypto.decryptJson(value.documentos)) as any[],
            modelos: JSON.parse(this.crypto.decryptJson(value.modelos)) as any[],
            solicitud: JSON.parse(this.crypto.decryptJson(value.solicitud)) as any[],
            solicitud_banco: JSON.parse(this.crypto.decryptJson(value.solicitud_banco)) as any[],
        }
        console.log(verify)
        return verify
    }
}