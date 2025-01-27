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
  codigosDeLaProductora?: {
    codigo_productora: string;
    createdAt: string;
    id_productora_isrc: string;
    productora_id: string;
    tipo: string;
    updatedAt: Date;
  }[];
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

export interface NominationsResponse {
  id_premio: string;
  productora_id: string;
  codigo_postulacion: string;
  fecha_asignacion: Date;
  createdAt: Date;
  updatedAt: Date;
  productoraDelPremio: {
    id_productora: string;
    nombre_productora: string;
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
    denominacion_sello: string | null;
    datos_adicionales: string | null;
    fecha_alta: Date | null;
    fecha_ultimo_fonograma: Date | null;
    nombres: string | null;
    apellidos: string | null;
    razon_social: string | null;
    apellidos_representante: string | null;
    nombres_representante: string | null;
    cuit_representante: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}
