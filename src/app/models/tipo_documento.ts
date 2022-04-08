export interface TipodocumentoInterface {
  id: number;
  t_doc: string;
  t_doc_desc: string;
  clientes_por_documento: ClienteDocumentoInterface[];
}

export interface ClienteDocumentoInterface {
  id: number;
  identificador: string;
  t_cliente: string;
}
