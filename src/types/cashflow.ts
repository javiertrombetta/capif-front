export const TIPOS_TRANSACCION = [
  "LIQUIDACION",
  "PAGO",
  "RECHAZO",
  "TRASPASO",
  "ACTUALIZACION",
] as const;

export type TipoTransaccion = (typeof TIPOS_TRANSACCION)[number];

export interface GetCashflowResponse {
  total: number;
  page: number;
  limit: number;
  transactions: {
    id_transaccion: string;
    cashflow_id: string;
    tipo_transaccion: TipoTransaccion;
    monto: number;
    saldo_resultante: number;
    referencia: string;
    fecha_transaccion: string;
  }[];
}

export interface GetPendingSettlementsResponse {
  message: string;
  data: {
    isrc: string;
    monto: number;
  }[];
}
