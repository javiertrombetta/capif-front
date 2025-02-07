import { CreatePhonogramRequest } from "@/types/repertoire.types";
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
