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

export interface User {
  apellido: string;
  email: string;
  id_usuario: string;
  is_bloqueado: boolean;
  nombre: string;
  rol_id: string;
  telefono: string;
  tipo_registro: string;
  createdAt: Date;
  updatedAt: Date;
  rol?: {
    id_rol: string;
    nombre_rol: string;
  };
}

export interface UsersResponse {
  hasSingleMaestro: boolean;
  maestros: [];
  user: User;
  vistas: { id_vista: string; is_habilitado: boolean }[];
}
export interface UpdateUserById {
  apellido?: string;
  nombre?: string;
}
