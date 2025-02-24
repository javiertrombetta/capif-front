export const TIPOS_AUDITORIA = [
  "ALTA",
  "BAJA",
  "CAMBIO",
  "ERROR",
  "SISTEMA",
  "AUTH",
] as const;

export type TipoAuditoria = (typeof TIPOS_AUDITORIA)[number];

export interface UsuarioAuditoria {
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
  usuario_originario: UsuarioAuditoria;
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

export interface Sesion {
  id_sesion: string;
  usuario: UsuarioAuditoria;
  ip_origen: string;
  navegador: string;
  fecha_inicio_sesion: string;
  fecha_fin_sesion: string;
}

export interface GetAuditSessionsResponse {
  message: string;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Sesion[];
}
