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

export interface GetRepertoiresResponse {
  data: {
    id_fonograma: string;
    titulo: string;
    isrc: string;
    artista: string;
    album: string;
    anio_lanzamiento: number;
    estado_fonograma: "ACTIVO" | "BAJA";
  }[];
  total: number;
}

export interface GetPhonogramByIdResponse {
  id_fonograma: string;
  titulo: string;
  isrc: string;
  artista: string;
  album: string;
  duracion: string;
  anio_lanzamiento: number;
  sello_discografico: string;
  is_dominio_publico: boolean;
  estado_fonograma: "ACTIVO" | "BAJA";
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

export interface EditPhonogramRequest {
  titulo?: string;
  artista?: string;
  album?: string;
  duracion?: string;
  anio_lanzamiento?: number;
  sello_discografico?: string;
  estado_fonograma?: string;
}

export interface EditPhonogramResponse {
  id_fonograma: string;
  titulo: string;
  artista: string;
  album: string;
  duracion: string;
  anio_lanzamiento: number;
  sello_discografico: string;
  estado_fonograma: string;
}
