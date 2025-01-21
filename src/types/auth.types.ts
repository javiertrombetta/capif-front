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

export enum ROLES {
  SUPER_ADMIN = "SuperAdmin",
  CAPIF_ADMIN = "CapifAdming",
  USER_PRODUCER = "UserProducer",
  EMPLOYEE = "Employee",
}

export enum ROLES_NOMBRES {
  SUPER_ADMIN = "admin_principal",
  CAPIF_ADMIN = "admin_secundario",
  USER_PRODUCER = "productor_principal",
  EMPLOYEE = "productor_secundario",
  USER = "usuario",
}

export interface FakeUserProps {
  names: string;
  phone: string;
  email: string;
  activeProduction: string;
  rol: ROLES;
}

export interface AuthProps {
  id_usuario: string | null;
  email: string | null;
  telefono: string | null;
  nombre: string | null;
  apellido: string | null;
  tipo_registro: string | null;
  rol_id: string | null;
  rol_nombre: ROLES_NOMBRES | null;
  productionCompany?: {
    id: string;
    nombre: string;
  };
}

export interface GetProductorasResponse {
  productoras: { id: string; nombre: string }[];
}
