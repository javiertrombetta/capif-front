import {
  GetCashflowResponse,
  GetPendingSettlementsResponse,
  TipoTransaccion,
} from "@/types/cashflow";
import { axiosInstance } from "./axiosInstance";

interface GetCashflowParams {
  cuit?: string;
  tipo_transaccion?: TipoTransaccion;
  fecha_desde?: string;
  fecha_hasta?: string;
}

export const getCashflow = async (params?: GetCashflowParams) => {
  for (const key in params) {
    if (!params[key as keyof GetCashflowParams])
      delete params[key as keyof GetCashflowParams];
  }

  const companies = await axiosInstance.get<GetCashflowResponse>("cashflow", {
    params,
  });
  return companies.data.transactions;
};

export const getPendingSettlements = async () => {
  const response = await axiosInstance.get<GetPendingSettlementsResponse>(
    "cashflow/settlements/pending"
  );
  return response.data.data;
};
