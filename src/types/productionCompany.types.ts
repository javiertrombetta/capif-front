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
