type person_description = "Persona Física" | "Persona Jurídica";

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

export interface FakeUserProps {
  names: string;
  phone: string;
  email: string;
  activeProduction: string;
  rol: ROLES;
}
