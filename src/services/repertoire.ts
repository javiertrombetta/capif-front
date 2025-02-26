import {
  AddRepertoireTitularitiesPayload,
  AddTerritoryPayload,
  CreateRepertoirePayload,
  EditRepertoirePayload,
  EditRepertoireResponse,
  GetRepertoireByIdResponse,
  GetRepertoiresResponse,
  GetRepertoireTerritorialityResponse,
  GetRepertoireTitularityResponse,
  GetSendAudioFilesResponse,
  GetTerritoriesResponse,
  UpdateSendAudiFilePayload,
  ValidateISRCResponse,
  DeclareRepertoiresBulkResponse,
} from "@/types/repertoire.types";
import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";

interface GetRepertoiresParams {
  titulo: string;
  artista: string;
  album: string;
  nombre_productora: string;
  sello_discografico: string;
  isrc: string;
  anio_lanzamiento: string;
}

export const getRepertoires = async (
  params?: Partial<GetRepertoiresParams>
) => {
  const response = await axiosInstance.get<GetRepertoiresResponse>(
    "/repertoires",
    {
      params,
    }
  );
  return response.data.data;
};

export const getRepertoireById = async (id: string) => {
  const response = await axiosInstance.get<GetRepertoireByIdResponse>(
    `/repertoires/${id}`
  );
  return response.data.data;
};

export const createRepertoire = async (
  repertoireData: CreateRepertoirePayload
) => {
  const response = await axiosInstance.post("/repertoires", repertoireData);
  return response.data.data;
};

export const uploadPhonogramFile = async (formData: FormData, id: string) => {
  await axiosInstance.post(`/repertoires/${id}/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const validateISRC = async (isrc: string) => {
  const response = await axiosInstance.post<ValidateISRCResponse>(
    "/repertoires/isrc/validate",
    {
      isrc,
    }
  );
  return response.data;
};

export const editRepertoire = async (
  id: string,
  phonogramFields: EditRepertoirePayload
) => {
  const response = await axiosInstance.put<EditRepertoireResponse>(
    `/repertoires/${id}`,
    phonogramFields
  );
  return response.data;
};

export const getRepertoireTerritoriality = async (id: string) => {
  const response = await axiosInstance.get<GetRepertoireTerritorialityResponse>(
    `/repertoires/${id}/territories`
  );

  return response.data;
};

export const updateRepertoireTerritory = async (
  id: string,
  idTerritory: string,
  isActive: boolean
) => {
  const response = await axiosInstance.put(
    `/repertoires/${id}/territories/${idTerritory}/state`,
    { is_activo: isActive }
  );
  return response;
};

export const getRepertoireTitularity = async (id: string) => {
  const response = await axiosInstance.get<GetRepertoireTitularityResponse>(
    `/repertoires/${id}/shares`
  );
  return response.data.participaciones;
};

export const addRepertoireTitularities = async (
  id: string,
  payload: AddRepertoireTitularitiesPayload
) => {
  const response = await axiosInstance.post(
    `/repertoires/${id}/shares`,
    payload
  );
  return response;
};

interface UpdateRepertoireTitularity {
  porcentaje_participacion: number;
  fecha_participacion_inicio: string;
  fecha_participacion_hasta: string;
}

export const updateRepertoireTitularity = async (
  idRepertoire: string,
  idTitularity: string,
  payload: UpdateRepertoireTitularity
) => {
  const response = await axiosInstance.put(
    `/repertoires/${idRepertoire}/shares/${idTitularity}`,
    payload
  );
  return response;
};

export const deleteRepertoireTitularity = async (
  idRepertoire: string,
  idTitularity: string
) => {
  const response = await axiosInstance.delete(
    `/repertoires/${idRepertoire}/shares/${idTitularity}`
  );
  return response;
};

interface GetSendAudioFilesParams {
  page?: number;
  limit?: number;
  nombre_tema?: string;
  estado_envio?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
}

export const getSendAudioFiles = async (params?: GetSendAudioFilesParams) => {
  const response = await axiosInstance.get<GetSendAudioFilesResponse>(
    "/repertoires/send",
    { params }
  );
  return response.data.data;
};

export const sendAudioFiles = async (fonograma_ids: string[]) => {
  const response = await axiosInstance.post("/repertoires/send", {
    fonograma_ids,
  });
  return response;
};

export const updateSendAudioFile = async (
  idRepertoire: string,
  idSend: string,
  payload: UpdateSendAudiFilePayload
) => {
  const response = await axiosInstance.put(
    `/repertoires/${idRepertoire}/send/${idSend}`,
    payload
  );
  return response;
};

export const getTerritories = async () => {
  const response =
    await axiosInstance.get<GetTerritoriesResponse>("/misc/territories");
  return response.data.data;
};

export const updateTerritoryStatus = async (
  idTerritory: string,
  payload: { is_habilitado: boolean }
) => {
  const response = await axiosInstance.put(
    `/misc/territories/${idTerritory}/status`,
    payload
  );
  return response;
};

export const addTerritory = async (payload: AddTerritoryPayload) => {
  const response = await axiosInstance.post("/misc/territories", payload);
  return response;
};

export interface DownloadTerritoriesReportParams {
  fecha_desde?: string;
  fecha_hasta?: string;
  titulo?: string;
  isrc?: string;
  productora?: string;
  tipo_modificacion?:
    | "ALTA"
    | "DATOS"
    | "ARCHIVO"
    | "TERRITORIO"
    | "PARTICIPACION";
}

export const downloadTerritoriesReport = async (
  params?: DownloadTerritoriesReportParams
) => {
  for (const key in params) {
    if (!params[key as keyof DownloadTerritoriesReportParams])
      delete params[key as keyof DownloadTerritoriesReportParams];
  }
  try {
    const response = await axiosInstance.get("/misc/territories/reports", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message ?? error.response?.data.error
      );
    } else {
      throw error;
    }
  }
};

export const declareRepertoiresBulk = async (formData: FormData) => {
  const response = (await axiosInstance.post("/repertoires/bulk", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })) as { data: DeclareRepertoiresBulkResponse };
  return response.data;
};
