import {
  GetAuditChangesResponse,
  GetAuditRepertoireResponse,
  GetAuditSessionsResponse,
  TipoAuditoria,
  TipoCambio,
} from "@/types/audits.types";
import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";

interface GetAuditChangesParams {
  page?: number;
  limit?: number;
  fecha_desde?: string;
  fecha_hasta?: string;
  emailUsuario?: string;
  tipoAuditoria?: TipoAuditoria;
  tablaDb?: string;
}

export const getAuditChanges = async (params?: GetAuditChangesParams) => {
  for (const key in params) {
    if (!params[key as keyof GetAuditChangesParams])
      delete params[key as keyof GetAuditChangesParams];
  }
  try {
    const response = await axiosInstance.get<GetAuditChangesResponse>(
      "/audits",
      {
        params,
      }
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      throw new Error(
        error.response?.data.message ?? error.response?.data.error
      );
    } else {
      throw error;
    }
  }
};

interface GetAuditsSessionsParams {
  page?: number;
  limit?: number;
  fecha_desde?: string;
  fecha_hasta?: string;
  email?: string;
  nombre?: string;
  apellido?: string;
}

export const getAuditSessions = async (params?: GetAuditsSessionsParams) => {
  for (const key in params) {
    if (!params[key as keyof GetAuditsSessionsParams])
      delete params[key as keyof GetAuditsSessionsParams];
  }
  try {
    const response = await axiosInstance.get<GetAuditSessionsResponse>(
      "/audits/sessions",
      {
        params,
      }
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      throw new Error(
        error.response?.data.message ?? error.response?.data.error
      );
    } else {
      throw error;
    }
  }
};

interface GetAuditRepertoireParams {
  page?: number;
  limit?: number;
  fecha_desde?: string;
  fecha_hasta?: string;
  emailUsuario?: string;
  isrc?: string;
  productora?: string;
  detalle?: string;
  tipoCambio?: TipoCambio;
}

export const getAuditRepertoire = async (params?: GetAuditRepertoireParams) => {
  for (const key in params) {
    if (!params[key as keyof GetAuditRepertoireParams])
      delete params[key as keyof GetAuditRepertoireParams];
  }
  try {
    const response = await axiosInstance.get<GetAuditRepertoireResponse>(
      "/audits/repertoire",
      {
        params,
      }
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error);
      throw new Error(
        error.response?.data.message ?? error.response?.data.error
      );
    } else {
      throw error;
    }
  }
};
