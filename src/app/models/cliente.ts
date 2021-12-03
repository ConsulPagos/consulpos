export interface ClienteInterface {
    rif?: number;
    email?: string;
    id_tipo_cliente?: number;
    id_tipo_doc?: number;
    comercio?: string;
    direccion?: string;
    id_status?: number;
    razon_social?: string;
    codigo_postal?: number;
    localidad?: string;
    punto_referencia?: string;
    id_actividad_comercial?: number;
    id_medio_contacto?: number;
    id_contribuyente?: number;
    id_parroquia?: number;
    id_ciudad?: number;
    fecha_registro?: Date;
}