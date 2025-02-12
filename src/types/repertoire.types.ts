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

export interface Repertoire {
  id_fonograma: string;
  titulo: string;
  isrc: string;
  artista: string;
  album: string;
  anio_lanzamiento: number;
  estado_fonograma: string;
  sello_discografico: string;
  nombre_productora: string;
}

export interface GetRepertoriesResponse {
  data: Repertoire[];
  total: number;
}
