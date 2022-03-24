import { CryptoService } from "../shared/services/crypto.service";
import { InventarioRequestInterface } from "./invnetario_request";

export interface ShowInventarioDetalleResponse {
    R?: string;
    M?: string;
    session_valid: string;
    inventario?: any[];
}

export class ShowInventarioDetalleDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowInventarioDetalleResponse {

        const verify: ShowInventarioDetalleResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            inventario: JSON.parse(this.crypto.decryptJson(value.inventario)) as any[],
        }

        console.log(verify)
        return verify
    }
}