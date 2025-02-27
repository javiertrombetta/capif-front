export const CONFLICTS_STATES = [
  "PENDIENTE CAPIF",
  "PRIMERA INSTANCIA",
  "PRIMERA PRORROGA",
  "SEGUNDA INSTANCIA",
  "SEGUNDA PRORROGA",
  "VENCIDO",
  "CERRADO",
] as const;

export type EstadoConflicto = (typeof CONFLICTS_STATES)[number];

export interface FonogramaConflicto {
  id_fonograma: string;
  isrc: string;
  titulo: string;
  artista: string;
}

export interface ProductoraConflicto {
  id_productora: string;
  nombre_productora: string;
}

export interface ParteConflicto {
  id_conflicto_participacion: string;
  estado: string;
  porcentaje_declarado: number;
  porcentaje_confirmado: number | null;
  is_documentos_enviados: boolean;
  participacionDeLaParte: {
    id_participacion: string;
  };
}
export interface Conflicto {
  id_conflicto: string;
  productora_conflicto_id: string;
  fonograma_id: string;
  estado_conflicto: string;
  fecha_periodo_desde: string;
  fecha_periodo_hasta: string;
  porcentaje_periodo: number;
  fecha_inicio_conflicto: string;
  fecha_segunda_instancia: string | null;
  fecha_fin_conflicto: string | null;
  createdAt: string;
  updatedAt: string;
  fonogramaDelConflicto: FonogramaConflicto;
  productoraDelConflicto: ProductoraConflicto;
  partesDelConflicto: ParteConflicto[];
}
export interface GetConflictoResponse {
  message: string;
  total: number;
  page: number;
  limit: number;
  data: Conflicto[];
}

export interface GetConflictResponse {
  id_conflicto: string;
  productora_conflicto_id: string;
  fonograma_id: string;
  estado_conflicto: EstadoConflicto;
  fecha_periodo_desde: string | null;
  fecha_periodo_hasta: string | null;
  porcentaje_periodo: number;
  fecha_inicio_conflicto: string | null;
  fecha_segunda_instancia: string | null;
  fecha_fin_conflicto: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  productoraDelConflicto: {
    id_productora: string;
    nombre_productora: string;
  };
  fonogramaDelConflicto: {
    id_fonograma: string;
    isrc: string;
    titulo: string;
    artista: string;
    sello_discografico: string;
    anio_lanzamiento: number;
  };
  partesDelConflicto: {
    id_conflicto_participacion: string;
    estado: string;
    porcentaje_declarado: number;
    porcentaje_confirmado: number | null;
    is_documentos_enviados: boolean;
    fecha_respuesta_confirmacion: string | null;
    fecha_respuesta_documentacion: string | null;
    participacion_id: string;
    participacionDeLaParte: {
      id_participacion: string;
      porcentaje_participacion: number;
      fecha_participacion_inicio: string;
      fecha_participacion_hasta: string;
      productoraDeParticipante: {
        id_productora: string;
        nombre_productora: string;
      };
    };
  }[];
}

export interface ConfirmPercentageResponse {
  id_conflicto: string;
  estado_conflicto: EstadoConflicto;
}
