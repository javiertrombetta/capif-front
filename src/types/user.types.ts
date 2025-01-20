/*
interface SendApplication {
  id_usuario: string;
  nombre: string;
  apellido: string;
  telefono: string;
  productoraData: {
    nombre: string;
    apellido: string;
    telefono_usuario: string;
    nombre_productor: string;
    apellido_productor: string;
    tipo_persona: "FISICA" | "JURIDICA";
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
    datos_adicionales?: string;
    denominacion_sello?: string;
    razon_social?: string;
    apellidos_representante?: string;
    nombres_representante?: string;
    cuit_representante?: string;
  };
}
*/
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
