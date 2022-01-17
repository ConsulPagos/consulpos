export class Permiso {
    id_permiso: number;
    modulo: string;
    id_modulo: number;
}

export class RolInterface {
    rol_id: number;
    permisos: Permiso[];
    rol_name: string;
}