import { CryptoService } from "../shared/services/crypto.service";
import { ArchivoInterface } from "./archivo";

export interface ConciliacionResponse {
    archivos:ArchivoInterface[];
    R?: string;
   

}

export class ConciliacionDecrypter {

    constructor(private crypto: CryptoService) {}

    deserialize(value: any): ConciliacionResponse {

        const data: ConciliacionResponse = {
            
            archivos: JSON.parse(this.crypto.decryptJson(value.archivos)),
            R: value.R
        }
        return data
    }
}