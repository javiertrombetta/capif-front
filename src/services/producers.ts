import {
  EstadoProductora,
  GetCompaniesResponse,
  GetDocumentsResponse,
  GetNominationsResponse,
  NominationsResponse,
  ProductionCompanyByIdResponse,
  UpdateProducerByIdResponse,
  UpdateProducerPayload,
} from "@/types/productionCompany.types";
import { axiosInstance } from "./axiosInstance";

interface GetProducersParams {
  nombre?: string;
  cuit?: string;
  estado?: EstadoProductora;
}

export const getProducers = async (params?: GetProducersParams) => {
  const companies = await axiosInstance.get<GetCompaniesResponse>("producers", {
    params,
  });
  return companies.data.data;
};

export const getProducerById = async (id: string) => {
  const companies = await axiosInstance.get<ProductionCompanyByIdResponse>(
    `producers/${id}`
  );
  return companies.data.productora;
};

export const updateProducer = async (
  id: string,
  companyData: UpdateProducerPayload
): Promise<UpdateProducerByIdResponse> => {
  const updatedCompany = await axiosInstance.put(
    `producers/${id}`,
    companyData
  );
  return updatedCompany.data;
};

interface GetNominationsParams {
  productoraName?: string;
  startDate?: string;
  endDate?: string;
}

export const getNominations = async (params?: GetNominationsParams) => {
  for (const key in params) {
    if (!params[key as keyof GetNominationsParams])
      delete params[key as keyof GetNominationsParams];
  }
  const { data } = await axiosInstance.get<GetNominationsResponse>(
    "producers/awards",
    { params }
  );

  return data.data;
};

export const deleteAllNominations = async () => {
  await axiosInstance.delete("producers/awards");
};

export const getProducerDocuments = async (companyId: string) => {
  const { data } = await axiosInstance.get<GetDocumentsResponse>(
    `producers/${companyId}/docs`
  );
  return data.documentos;
};

export const uploadProducerDocument = async (
  formData: FormData,
  companyId: string
) => {
  await axiosInstance.post(`producers/${companyId}/docs`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadProducerDocuments = async (companyId: string) => {
  const { data } = await axiosInstance.get(`producers/${companyId}/docs/zip`, {
    responseType: "blob",
  });
  return data;
};
