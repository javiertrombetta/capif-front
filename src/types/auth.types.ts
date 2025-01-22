type person_description = "Persona Física" | "Persona Jurídica";

export interface AuthSecondarySignUpRequest {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  // password: string;
}

export interface UserProps {
  TipoPersona: {
    createdAt?: Date;
    description: person_description;
    id_tipo_persona: string;
    updatedAt?: Date;
  };
  apellido: string;
  nombre: string;
  ciudad: string;
  provincia: string;
  pais: string;
  domicilio: string;
  clave: string;
  codigo_postal: string;
  createdAt?: Date;
  updatedAt?: Date;
  cuit: string;
  email: string;
  estado_id: string;
  id_usuario: string;
  intentos_fallidos: number;
  isHabilitado: boolean;
  isRegistro_pendiente: boolean;
  telefono: string;
  tipo_persona_id: string;
}

// export enum ROLES {
//   SUPER_ADMIN = "SuperAdmin",
//   CAPIF_ADMIN = "CapifAdming",
//   USER_PRODUCER = "UserProducer",
//   EMPLOYEE = "Employee",
// }

export enum ROLES {
  SUPER_ADMIN = "admin_principal",
  CAPIF_ADMIN = "admin_secundario",
  USER_PRODUCER = "productor_principal",
  EMPLOYEE = "productor_secundario",
  // USER = "usuario",
}
export interface AuthDataResponse {
  user: {
    id_usuario: string;
    rol: ROLES;
    tipo_registro: string;
    email: string;
    nombre: string;
    apellido: string;
    telefono: string;
  };
  maestros: [
    {
      productora: {
        id_productora: string;
        nombre_productora: string;
      };
    },
  ];
  vistas: [
    {
      nombre_vista: string;
      nombre_vista_superior: string;
    },
  ];
}

export interface AuthProps {
  id_usuario: string | null;
  email: string | null;
  telefono: string | null;
  nombre: string | null;
  apellido: string | null;
  tipo_registro: string | null;
  rol: ROLES | null;
  productoras?: {
    id: string;
    nombre: string;
  }[];
  vistas: { nombre: string; nombre_vista_superior: string }[];
  productoraActiva: { id: string; nombre: string } | null;
}

export interface GetProductorasResponse {
  productoras: { id: string; nombre: string }[];
}
