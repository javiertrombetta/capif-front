export interface ProductionCompanyResponse {
  apellido: string;
  createdAt: Date;
  email: string;
  fecha_ultimo_cambio_registro: Date;
  id_usuario: string;
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
