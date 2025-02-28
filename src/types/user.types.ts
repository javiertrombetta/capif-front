import { TipoPersona } from "./producers.types";

export interface SendApplication {
  nombre: string;
  apellido: string;
  telefono: string;
  productoraData: {
    id_productora?: string;
    tipo_persona: TipoPersona;
    nombre_productora: string;
    cuit_cuil: string;
    email: string;
    calle: string;
    numero: string;
    ciudad: string;
    localidad: string;
    provincia: string;
    codigo_postal: string;
    telefono: string;
    nacionalidad: string;
    cbu: string;
    denominacion_sello?: string;
    datos_adicionales?: string;
    nombres?: string;
    apellidos?: string;
    razon_social?: string;
    nombres_representante?: string;
    apellidos_representante?: string;
    cuit_representante?: string;
  };
}

export const ESTADOS = [
  "DEPURAR",
  "NUEVO",
  "CONFIRMADO",
  "PENDIENTE",
  "ENVIADO",
  "HABILITADO",
  "RECHAZADO",
  "DESHABILITADO",
] as const;

export type ESTADO = (typeof ESTADOS)[number];

export interface User {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  estado: ESTADO;
  isBloqueado: boolean;
  rol: string;
  vistas: {
    id_vista: string;
    nombre: string;
    superior: string;
    habilitado: boolean;
  }[];
  productoras: {
    id: string;
    nombre: string;
  }[];
}

export interface GetUsersResponse {
  currentPage: number;
  data: User[];
  total: number;
  totalPages: number;
}

export interface UpdateUserByIdPayload {
  apellido?: string;
  nombre?: string;
  telefono?: string;
  email?: string;
}

export interface UpdateViewsPayload {
  vistas: {
    nombre_vista: string;
    is_habilitado: boolean;
  }[];
}

export interface GetPendingApplicationsResponse extends GetUsersResponse {
  documentos: {
    nombre: string;
    ruta: string;
  };
}
