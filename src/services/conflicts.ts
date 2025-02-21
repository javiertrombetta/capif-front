import {
  GetConflictoResponse,
  GetConflictResponse,
} from "@/types/conflicts.types";
import { axiosInstance } from "./axiosInstance";

export const getConflicts = async () => {
  const response = (await axiosInstance.get("/conflicts")) as {
    data: GetConflictoResponse;
  };

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
  participacion_id: string,
  porcentaje_confirmado: number
) => {
  const response = (await axiosInstance.post(
    `/conflicts/${participacion_id}/validate-porcentage`,
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
