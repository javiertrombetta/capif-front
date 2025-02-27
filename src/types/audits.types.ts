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
  registranteDeAuditoria: UsuarioAuditoria;
  usuarioAuditado: UsuarioAuditoria;
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
  registranteDeSesion: UsuarioAuditoria;
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

export const TIPOS_CAMBIO = [
  "ALTA",
  "BAJA",
  "CAMBIO",
  "ERROR",
  "SISTEMA",
] as const;

export type TipoCambio = (typeof TIPOS_CAMBIO)[number];

export interface Fonograma {
  id_fonograma: string;
  isrc: string;
  titulo: string;
  artista: string;
  productoraDelFonograma: {
    nombre_productora: string;
    id_productora: string;
  };
}

export interface AuditRepertoire {
  id_auditoria: string;
  fonogramaAuditado: Fonograma;
  tipo_auditoria: TipoCambio;
  detalle: string;
  registranteDeRepertorio: UsuarioAuditoria;
  createdAt: string;
}

export interface GetAuditRepertoireResponse {
  message: string;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: AuditRepertoire[];
}
