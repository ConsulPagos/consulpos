export interface VentaFirebase {
    data: DataVentaFirebase;
    id: string;
}

export interface DataVentaFirebase {
    fecha_registro_facturado: FechaRe;
    fecha_registro_facturacion: string;
    estatus: string;
    comision: string;
    cargo_domiciliacion: string;
    ejecutivo_entrego: string;
    fecha_registro_transando: FechaRe;
    rif: string;
    enviadoPor: string;
    zona: string;
    nombre_vendedor: string;
    total_usd: number;
    tasa_dia: number;
    id_entrego: string;
    vendedor: string;
    fecha_registro_entregado: FechaRe;
    archivo_generado: string;
    contrato_servicio: string;
    numero_venta: number;
    total_bs: string;
    fecha_registro_configuracion: string;
    observacion_entregado: string;
    reserva: string;
    fecha_registro_confirmar: string;
    vendedor_correo: string;
    alicuota: string;
    iva: string;
    recibe: string;
    numero_factura: string;
    equipos: any;
    observacion_factura: string;
    sincronizada: boolean;
    procesado: boolean;
    recibidoPor: string;
    razon: string;
    fecha_registro: string;
    fecha_recepcion_sucursal_aliado: FechaRe;
    vendedor_grupo: string;
    sucursal: string;
    fecha_registro_asignacion: FechaRe;
    acta_entrega: string;
    nombre_comercial: string;
    subtotal: string;
    fecha_registro_pago: FechaRe;
}

export interface Equipo {
    asignado?: boolean,
    banco?: string,
    comunicacion?: string,
    cuenta?: string,
    dias_cobro_plan?: string,
    entregar?: string,
    marca?: string,
    modelo?: string,
    modo_pago_plan?: string,
    monto_plan?: string,
    mp?: string,
    nombre_plan?: string,
    numero?: string,
    numero_periodos_plan?: string,
    numero_promo?: number,
    operadora?: string,
    precio?: string,
    reserva?: boolean,
    serial_sim?: string
}


export interface Equipo1 {
    operadora: string;
    monto_plan: string;
    fechaRecibido: FechaRe;
    nombre_plan: string;
    recibido: boolean;
    entregar_en: string;
    serial_sim_2: string;
    dias_cobro_plan: number;
    referencia_bancaria: ReferenciaBancaria;
    terminal: string;
    mp: string;
    serial_sim: string;
    comunicacion: string;
    numero_periodos_plan: string;
    numero: string;
    precio: string;
    numero_promo: number;
    operadora_linea_2: string;
    marca: string;
    asignado: boolean;
    serial_pos: string;
    reserva: boolean;
    modelo: string;
    cuenta: string;
    banco: string;
    modo_pago_plan: string;
}

export interface FechaRe {
    _seconds: number;
    _nanoseconds: number;
}

export interface ReferenciaBancaria {
    tipo_documento: string;
    file: string;
}