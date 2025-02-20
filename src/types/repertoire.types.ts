export interface CreateRepertoirePayload {
  productora_id: string | null;
  titulo: string | null;
  artista: string | null;
  album: string | null;
  duracion: string | null;
  anio_lanzamiento: number | null;
  sello_discografico: string | null;
  isrc: string;
  participaciones:
    | {
        cuit: string | null;
        porcentaje_participacion: number | null;
        fecha_inicio: string;
        fecha_hasta: string;
      }[]
    | null;
  territorios: string[] | [];
}

export type ESTADO_FONOGRAMA = "ACTIVO" | "BAJA";

export interface Repertoire {
  id_fonograma: string;
  estado_fonograma: ESTADO_FONOGRAMA;
  isrc: string;
  titulo: string;
  artista: string;
  album: string;
  duracion: string;
  anio_lanzamiento: number;
  sello_discografico: string;
  is_dominio_publico: boolean;
  cantidad_conflictos_activos: number;
  archivoDelFonograma: string;
  participantesDelFonograma: {
    id_participacion: string;
    productora_id: string;
    fecha_participacion_inicio: string;
    fecha_participacion_hasta: string;
    porcentaje_participacion: number;
  }[];
  vinculosDelFonograma: {
    id_territorio_maestro: string;
    territorio_id: string;
    is_activo: boolean;
    territorioDelVinculo: {
      id_territorio: string;
      nombre_pais: string;
      codigo_iso: string;
      is_habilitado: boolean;
    };
  }[];
  productoraDelFonograma: {
    id_productora: string;
    nombre_productora: string;
    cuit_cuil: string;
  };
}

export interface GetRepertoiresResponse {
  data: Repertoire[];
  total: number;
}

export interface GetRepertoireByIdResponse {
  data: Repertoire;
  message: string;
}

export interface EditRepertoirePayload {
  titulo?: string;
  artista?: string;
  album?: string;
  duracion?: string;
  anio_lanzamiento?: number;
  sello_discografico?: string;
  estado_fonograma?: string;
}

export interface EditRepertoireResponse {
  message: string;
  data: {
    id_fonograma: string;
    titulo: string;
    artista: string;
    album: string;
    duracion: string;
    anio_lanzamiento: number;
    sello_discografico: string;
    estado_fonograma: ESTADO_FONOGRAMA;
  };
}

export interface GetRepertoireTerritorialityResponse {
  fonograma_id: string;
  territorios: {
    id_territorio_maestro: string;
    id_territorio: string;
    nombre_pais: string;
    codigo_iso: string;
    is_habilitado: boolean;
    is_activo: boolean;
  }[];
}

export interface GetRepertoireTitularityResponse {
  fonograma_id: string;
  participaciones: {
    porcentaje_participacion: number;
    fecha_participacion_inicio: string;
    fecha_participacion_hasta: string;
    id_participacion: string;
    fonograma_id: string;
    productora_id: string;
    createdAt: Date;
    updatedAt: Date;
    productoraDeParticipante: {
      id_productora: string;
      nombre_productora: string;
      cuit_cuil: string;
    };
  }[];
  momentosClave: Record<string, number>;
}

export interface AddRepertoireTitularitiesPayload {
  participaciones: {
    cuit?: string;
    porcentaje_participacion: number;
    fecha_inicio: string;
    fecha_hasta: string;
  }[];
}

export const ESTADOS_ENVIO = [
  "PENDIENTE DE ENVIO",
  "ENVIADO SIN AUDIO",
  "ENVIADO CON AUDIO",
  "RECHAZADO POR VERICAST",
  "ERROR EN EL ENVIO",
] as const;

export type EstadoEnvio = (typeof ESTADOS_ENVIO)[number];

export interface GetSendAudioFilesResponse {
  message: string;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  data: {
    id_envio_vericast: string;
    fonogramaDelEnvio: {
      id_fonograma: string;
      isrc: string;
      titulo: string;
      artista: string;
      album: string;
      duracion: string;
      sello_discografico: string;
      anio_lanzamiento: number;
    };
    tipo_estado: EstadoEnvio;
    fecha_envio_inicial: string;
    fecha_envio_ultimo: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface UpdateSendAudiFilePayload {
  nuevoEstado: EstadoEnvio;
  comentario?: string;
}

export interface GetTerritoriesResponse {
  message: string;
  data: {
    id_territorio: string;
    nombre_pais: string;
    codigo_iso: string;
    is_habilitado: boolean;
  }[];
}

export interface AddTerritoryPayload {
  nombre_pais: string;
  codigo_iso: string;
  is_habilitado: boolean;
}

export interface DeclareRepertoiresBulkResponse {
  message: string;
  registrosCreados: {
    titulo: string;
    isrc: string;
  }[];
  isrcExistentes: string[];
  conflictos: string[];
  errores: string[];
}

export interface ValidateISRCResponse {
  available?: boolean;
  isrc?: string;
  id_repertorio?: string;
  message: string;
}
