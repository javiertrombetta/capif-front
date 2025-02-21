export type TipoPersona = "FISICA" | "JURIDICA";

export type EstadoProductora = "Autorizada" | "Pendiente";

export const TIPO_DOCUMENTOS = [
  "dni_persona_fisica",
  "contrato_social",
  "dni_representante_legal",
  "comprobante_ISRC",
] as const;

export type TipoDocumento = (typeof TIPO_DOCUMENTOS)[number];

export interface Document {
  id_documento: string;
  ruta_archivo_documento: string;
  tipo_documento: TipoDocumento;
}

export interface ProductionCompany {
  id_productora: string | null;
  usuarioPrincipal: string | null;
  estado: EstadoProductora;
  documentos: Document[];
  cuit_cuil: string;
  nombre_productora: string;
  tipo_persona: TipoPersona;
  apellidos: string;
  nombres: string;
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
  cantidad_fonogramas: number;
  razon_social: string | null;
  denominacion_sello: string;
  datos_adicionales: string;
  fecha_alta: Date;
  fecha_ultimo_fonograma: Date;
  apellidos_representante: string;
  nombres_representante: string;
  cuit_represenante: string;
  createdAt: Date;
  updatedAt: Date;
  codigosDeLaProductora?: {
    tipo: string;
    codigo_productora: string;
  }[];
}

export interface ProductionCompanyByIdResponse {
  productora: {
    id_productora?: string;
    usuarioPrincipal: {
      apellido: string;
      email: string;
      id_usuario: string;
      nombre: string;
    };
    cuit_cuil: string;
    nombre_productora: string;
    tipo_persona: TipoPersona;
    apellidos: string;
    nombres: string;
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
    cantidad_fonogramas: number;
    razon_social: string;
    denominacion_sello: string;
    datos_adicionales: string;
    fecha_alta: Date;
    fecha_ultimo_fonograma: Date;
    apellidos_representante: string;
    nombres_representante: string;
    cuit_representante: string;
    createdAt: Date;
    updatedAt: Date;
    codigosDeLaProductora?: {
      tipo: string;
      codigo_productora: string;
    }[];
  };
}

export interface GetCompaniesResponse {
  total: number;
  totalPages: number;
  currentPage: number;
  data: ProductionCompany[];
}

export interface UpdateProducerPayload {
  nombre_productora: string;
  tipo_persona: TipoPersona;
  telefono: string;
  email: string;
  cuit_cuil: string;
  calle: string;
  numero: string;
  ciudad: string;
  localidad: string;
  provincia: string;
  codigo_postal: string;
  nacionalidad: string;
  datos_adicionales?: string;
  denominacion_sello?: string;
  nombres?: string;
  apellidos?: string;
  razon_social?: string;
  nombres_representante?: string;
  apellidos_representante?: string;
  cuit_representante?: string;
  cbu?: string;
  alias_cbu?: string;
}

export interface UpdateProducerByIdResponse {
  message: string;
  productora: {
    nombre_productora: string;
    direccion: string;
    telefono: string;
    email: string;
    cuit_cuil: string;
  };
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
    tipo_persona: TipoPersona;
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

export interface GetDocumentsResponse {
  message: string;
  documentos: Document[];
}
