import {
  CreatePhonogramRequest,
  GetRepertoriesResponse,
} from "@/types/repertoire.types";
import { axiosInstance } from "./axiosInstance";

interface GetRepertoriesParams {
  titulo: string;
  artista: string;
  album: string;
  nombre_productora: string;
  sello_discografico: string;
  isrc: string;
  anio_lanzamiento: string;
}

export const getRepertoires = async (
  params?: Partial<GetRepertoriesParams>
) => {
  const response = await axiosInstance.get<GetRepertoriesResponse>(
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
