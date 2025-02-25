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

export const uploadTransfersFile = async (formData: FormData) => {
  await axiosInstance.post("cashflow/transfers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadSettlementsFile = async (formData: FormData) => {
  await axiosInstance.post("cashflow/settlements", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadReproductionsFile = async (formData: FormData) => {
  await axiosInstance.post("cashflow/reproductions", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadRejectionsFile = async (formData: FormData) => {
  await axiosInstance.post("cashflow/rejections", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadPaymentsFile = async (formData: FormData) => {
  await axiosInstance.post("cashflow/payments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
