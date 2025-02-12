import {
  CreatePhonogramRequest,
  EditPhonogramRequest,
  EditPhonogramResponse,
  GetPhonogramByIdResponse,
  GetRepertoiresResponse,
} from "@/types/repertoire.types";
import { axiosInstance } from "./axiosInstance";

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

export const getRepertoires = async () => {
  const response = (await axiosInstance.get("/repertoires/")) as {
    data: GetRepertoiresResponse;
  };
  return response.data;
};

export const getPhonogramById = async (id: string) => {
  const response = (await axiosInstance.get(`/repertoires/${id}`)) as {
    data: { data: GetPhonogramByIdResponse; message: string };
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

export const editPhonogram = async (
  id: string,
  phonogramFields: EditPhonogramRequest
) => {
  const response = (await axiosInstance.put(
    `/repertoires/${id}`,
    phonogramFields
  )) as {
    data: {
      message: string;
      data: EditPhonogramResponse;
    };
  };
  return response.data;
};
