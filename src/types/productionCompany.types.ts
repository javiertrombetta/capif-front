export interface ProductionCompanyResponse {
  id_usuario: string | null;
  id_productora: string | null;
  cuit_cuil: string;
  apellido: string;
  razon_social: string | null;
  createdAt: Date;
  email: string;
  fecha_ultimo_cambio_registro: Date;
  intentos_fallidos: number;
  is_bloqueado: boolean;
  nombre: string;
  rol_id: string;
  telefono: string;
  tipo_registro: string;
  updatedAt: Date;
  // email_verification_token: null;
  // email_verification_token_expires: null;
  // fecha_ultimo_cambio_rol: null;
  // fecha_ultimo_inicio_sesion: null;
  // reset_password_token: null;
  // reset_password_token_expires: null;
}

export interface ProductionCompanyByIdResponse {
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
}
