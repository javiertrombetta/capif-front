export interface GetCashflowResponse {
  total: number;
  page: number;
  limit: number;
  cashflows: {
    id_cashflow: string;
    productora_id: string;
    saldo_actual_productora: number;
    createdAt: string;
    updatedAt: string;
    productoraDeCC: {
      id_productora: string;
      nombre_productora: string;
      tipo_persona: string;
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
      cantidad_fonogramas: number;
      denominacion_sello: string | null;
      datos_adicionales: string | null;
      fecha_alta: string | null;
      fecha_ultimo_fonograma: string | null;
      nombres: string | null;
      apellidos: string | null;
      razon_social: string;
      apellidos_representante: string;
      nombres_representante: string;
      cuit_representante: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export const TIPOS_TRANSACCION = [
  "LIQUIDACION",
  "PAGO",
  "RECHAZO",
  "TRASPASO",
  "ACTUALIZACION",
] as const;

export type TipoTransaccion = (typeof TIPOS_TRANSACCION)[number];

export interface GetCashflowTransactionsResponse {
  total: number;
  page: number;
  limit: number;
  transactions: {
    id_transaccion: string;
    cashflow_id: string;
    tipo_transaccion: TipoTransaccion;
    liquidacion_id: string | null;
    pago_id: string | null;
    rechazo_id: string | null;
    traspaso_id: string | null;
    monto: string;
    saldo_resultante: string;
    numero_lote: number;
    referencia: string;
    fecha_transaccion: string;
    createdAt: string;
    updatedAt: string;
    cashflow: {
      id_cashflow: string;
      productora_id: string;
      saldo_actual_productora: string;
      createdAt: string;
      updatedAt: string;
    };
    liquidacion: {
      id_liquidacion: string;
      cashflow_maestro_id: string;
      concepto: string;
      nacionalidad_fonograma: string;
      monto: string;
      isRetencion: boolean;
      cuit: string;
      isrc: string;
      pasadas: number;
      nombre_fonograma: string;
      nombre_artista: string;
      sello_discografico: string;
      fecha_liquidacion: string;
      createdAt: string;
      updatedAt: string;
    };
    pago: {
      id_pago: string;
      cashflow_maestro_id: string;
      concepto: string;
      monto: string;
      isRetencion: boolean;
      cuit: string;
      isrc: string | null;
      fecha_pago: string;
      createdAt: string;
      updatedAt: string;
    };
    rechazo: {
      id_rechazo: string;
      cashflow_maestro_id: string;
      monto: string;
      referencia: string;
      fecha_rechazo: string;
      createdAt: string;
      updatedAt: string;
    };
    traspaso: {
      id_traspaso: string;
      cashflow_maestro_id: string;
      tipo_traspaso: string;
      isrc: string | null;
      cuit_origen: string;
      cuit_destino: string;
      porcentaje_traspaso: string | null;
      monto: string;
      fecha_traspaso: string;
      createdAt: string;
      updatedAt: string;
    } | null;
  }[];
}

export interface GetPendingSettlementsResponse {
  message: string;
  data: {
    isrc: string;
    monto: number;
  }[];
}
