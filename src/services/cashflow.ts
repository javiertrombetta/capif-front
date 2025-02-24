import { GetCashflowResponse, TipoTransaccion } from "@/types/cashflow";
import { axiosInstance } from "./axiosInstance";

interface GetCashflowParams {
  cuit?: string;
  tipo_transaccion?: TipoTransaccion;
  fecha_desde?: string;
  fecha_hasta?: string;
}

export const getCashflow = async (params?: GetCashflowParams) => {
  const companies = await axiosInstance.get<GetCashflowResponse>("producers", {
    params,
  });
  return companies.data.transactions;
};
