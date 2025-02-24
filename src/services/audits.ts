import { GetAuditChangesResponse, TipoAuditoria } from "@/types/audits.types";
import { axiosInstance } from "./axiosInstance";

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
  const response = await axiosInstance.get<GetAuditChangesResponse>("/audits", {
    params,
  });

  return response.data.data;
};
