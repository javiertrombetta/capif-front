interface Document {
  nombre_documento: string;
  ruta_archivo_documento: string;
}

export interface SendApplication {
  id_usuario: string;
  nombre: string;
  apellido: string;
  telefono: string;
  documentos: Document[];
  productoraData: {
    id_productora?: string;
    tipo_persona: "FISICA" | "JURIDICA";
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
    alias_cbu: string;
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
    id_vista_maestro: string;
    nombre_vista: string;
    nombre_vista_superior: string;
    is_habilitado: boolean;
  }[];
  productoras: {
    id: string;
    productora: string;
  }[];
}

export interface GetUsersResponse {
  currentPage: number;
  data: User[];
  total: number;
  totalPages: number;
}

export interface UpdateUserById {
  apellido?: string;
  nombre?: string;
  telefono?: string;
  email?: string;
}
