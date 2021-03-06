import {TelefonoInterface} from './telefono';
import {ClienteNaturalInterface} from './cliente_natural';
import {ClienteLegalInterface} from './cliente_legal';

export interface ClienteRequestInterface {
solicitudes_banco?: any;
a_c_des?:string; 
ciudad?:string; 
ciudad_id?:string; 
cod_postal?:string; 
comercio?:string; 
contribuyente?:string; 
contribuyente_id?:string; 
correo?:string; 
direccion?:string; 
estado?:string; 
id_estado?:string; 
fecha_registro?:string; 
id_actividad_comercial?:string; 
localidad?:string; 
m_contacto?:string; 
m_contacto_id?:string; 
municipio?:string; 
id_municipio?:string; 
parroquia?:string; 
parroquia_id?:string; 
pto_ref?:string; 
razon_social?:string; 
rif?:string; 
status_desc?:string; 
status_id?:string; 
t_c_letra?:string; 
t_cliente?:string; 
t_cliente_id?:string; 
t_doc?:string; 
t_doc_desc?:string; 
t_doc_id?:string; 
telefonos?: TelefonoInterface[];
c_natural?: ClienteNaturalInterface;
legal?: ClienteLegalInterface;
red_social_a?:string; 
red_social_b?:string; 
}