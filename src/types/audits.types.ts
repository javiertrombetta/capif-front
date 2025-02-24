export const TIPOS_AUDITORIA = [
  "ALTA",
  "BAJA",
  "CAMBIO",
  "ERROR",
  "SISTEMA",
  "AUTH",
] as const;

export type TipoAuditoria = (typeof TIPOS_AUDITORIA)[number];

export interface UsuarioOriginario {
  id_usuario: string;
  email: string;
  nombre: string;
  apellido: string;
}

export interface AuditChange {
  id_auditoria: string;
  modelo: string;
  tipo_auditoria: TipoAuditoria;
  detalle: string;
  usuario_originario: UsuarioOriginario;
  createdAt: string;
}

export interface GetAuditChangesResponse {
  message: string;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: AuditChange[];
}
