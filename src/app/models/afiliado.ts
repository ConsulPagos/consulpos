export interface AfiliadoInterface {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    email?: string;
    access_level?: number;
    monto_descuento?:number;
    limite_descuento?:Date;
    limite_credito?:Date;
    id_estado?: number;
}

export interface AffiliateDetailsInterface {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    id_afiliado?: number;
    nombre_empresa?: string;
    presencia_online?: string;
    direccion_despacho?: string;
    representante?: string;
    cedula_representante?: string;
    rif_empresa?: string;
    registro_mercantil?: string;
    telefono?: string;
    telefono_auxiliar?: string;
}

export interface AffiliateDetailJoinInterface {
    access_level?: number;
    created_at?: Date;
    email?: string;
    id?: number;
    monto_descuento?:number;
    limite_descuento?:Date;
    limite_credito?:Date;
    nombre_empresa?: string;
    representante?: string;
    presencia_online?: string;
    cedula_representante?: string;
    rif_empresa?: string;
    registro_mercantil?: string;
    telefono?: string;
    telefono_auxiliar?: string;
    id_estado?: number;
}