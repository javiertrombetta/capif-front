import {
  EstadoConflicto,
  GetConflictoResponse,
  GetConflictResponse,
} from "@/types/conflicts.types";
import { axiosInstance } from "./axiosInstance";

interface GetConflictsParams {
  fecha_desde?: string;
  fecha_hasta?: string;
  estado?: EstadoConflicto;
  isrc?: string;
  productora_id?: string;
  page?: string;
  limit?: string;
}

export const getConflicts = async (params?: GetConflictsParams) => {
  for (const key in params) {
    if (!params[key as keyof GetConflictsParams])
      delete params[key as keyof GetConflictsParams];
  }
  const response = await axiosInstance.get<GetConflictoResponse>("/conflicts", {
    params,
  });

  return response.data;
};

export const getConflict = async (id: string) => {
  const response = (await axiosInstance(`/conflicts/${id}`)) as {
    data: {
      message: string;
      data: GetConflictResponse;
    };
  };
  return response.data;
};

export const grantExtension = async (id: string) => {
  const response = (await axiosInstance.post(`/conflicts/${id}/extension`)) as {
    data: {
      message: string;
      data: {
        id_conflicto: string;
        estado_conflicto: string;
      };
    };
  };

  return response.data;
};

export const desistConflict = async (id: string) => {
  const response = (await axiosInstance.post(`/conflicts/${id}/desist`)) as {
    data: {
      message: string;
      data: {
        id_conflicto: string;
        estado_conflicto: string;
      };
    };
  };

  return response.data;
};

export const confirmPercentage = async (
  conflict_id: string,
  participacion_id: string,
  porcentaje_confirmado: number
) => {
  const response = (await axiosInstance.post(
    `/conflicts/${conflict_id}/validate-porcentage`,
    {
      participacion_id,
      porcentaje_confirmado,
    }
  )) as {
    data: {
      message: string;
      data: {
        id_conflicto: string;
        estado_conflicto: string;
      };
    };
  };

  return response.data;
};
