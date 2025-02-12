export interface CreatePhonogramRequest {
  productora_id: string | null;
  titulo: string | null;
  artista: string | null;
  album: string | null;
  duracion: string | null;
  anio_lanzamiento: number | null;
  sello_discografico: string | null;
  codigo_designacion: string | null;
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
  titulo: string;
  isrc: string;
  artista: string;
  album: string;
  anio_lanzamiento: number;
  sello_discografico: string;
  nombre_productora: string;
  estado_fonograma: ESTADO_FONOGRAMA;
}
export interface GetRepertoiresResponse {
  data: Repertoire[];
  total: number;
}

export interface GetRepertoireByIdResponse {
  id_fonograma: string;
  titulo: string;
  isrc: string;
  artista: string;
  album: string;
  duracion: string;
  anio_lanzamiento: number;
  sello_discografico: string;
  is_dominio_publico: boolean;
  estado_fonograma: ESTADO_FONOGRAMA;
  archivos: {
    id_fonograma_archivo: string;
    ruta_archivo_audio: string;
  }[];
  participaciones: {
    id_fonograma_participacion: string;
    productora_id: string;
    porcentaje_participacion: number;
    fecha_participacion_inicio: string;
    fecha_participacion_hasta: string;
  }[];
  territorios: {
    id_territorio_maestro: string;
    territorio_id: string;
    is_activo: boolean;
  }[];
}

export interface EditRepertoireRequest {
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
