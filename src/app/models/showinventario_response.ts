import { CryptoService } from "../shared/services/crypto.service";
import { InventarioRequestInterface } from "./invnetario_request";

export interface ShowInventarioResponse {
    R?: string;
    M?: string;
    session_valid: string;
    inventario?: InventarioRequestInterface[];
    total_row: string;
}

export class ShowInventarioDecrypter {

    constructor(private crypto: CryptoService) {

    }

    deserialize(value: any): ShowInventarioResponse {

        const verify: ShowInventarioResponse = {
            R: value.R,
            M: this.crypto.decryptJson(value.M),
            session_valid: this.crypto.decryptJson(value.session_valid),
            inventario:JSON.parse(this.crypto.decryptJson(value.inventario)) as InventarioRequestInterface[],
            total_row: this.crypto.decryptJson(value.total_row),
        }
        
        console.log(verify)
        return verify
    }
}