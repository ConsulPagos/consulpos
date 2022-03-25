export interface TipoclienteInterface {
    id?: number;
    t_cliente?: string;
    t_c_letra?: string;
    t_naturales?: TipoNaturaInterface[];
}

export interface TipoNaturaInterface {
    id?: number;
    t_natural?: string;
}