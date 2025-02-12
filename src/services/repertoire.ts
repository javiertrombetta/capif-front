import {
  CreatePhonogramRequest,
  EditRepertoireRequest,
  EditRepertoireResponse,
  GetRepertoireByIdResponse,
  GetRepertoiresResponse,
} from "@/types/repertoire.types";
import { axiosInstance } from "./axiosInstance";

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

export const createPhonogram = async (
  repertoireData: CreatePhonogramRequest
) => {
  const response = await axiosInstance.post("/repertoires", repertoireData);
  console.log(response.data);
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
  const response = (await axiosInstance.post("/repertoires/isrc/validate", {
    isrc,
  })) as {
    data: {
      isrc: string;
      available: boolean;
      message: string;
    };
  };
  return response.data.available;
};

export const getPhonogramById = async (id: string) => {
  const response = (await axiosInstance.get(`/repertoires/${id}`)) as {
    data: { data: GetRepertoireByIdResponse; message: string };
  };
  return response.data.data;
};

export const getPrefixIsrc = async () => {
  const response = (await axiosInstance.get("/repertoires/isrc/prefix")) as {
    data: {
      message: string;
      data: string;
    };
  };
  return response.data;
};

export const editRepertoire = async (
  id: string,
  phonogramFields: EditRepertoireRequest
) => {
  const response = await axiosInstance.put<EditRepertoireResponse>(
    `/repertoires/${id}`,
    phonogramFields
  );
  return response.data.data;
};
