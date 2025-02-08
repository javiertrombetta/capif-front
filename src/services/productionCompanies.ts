import {
  NominationsResponse,
  ProductionCompanyByIdResponse,
  UpdateProducerByIdResponse,
  UpdateProducerPayload,
} from "@/types/productionCompany.types";
import { axiosInstance } from "./axiosInstance";

export const getAllCompanies = async () => {
  const companies = await axiosInstance.get("producers/");
  return companies.data.productoras;
};

export const getCompanyById = async (
  id: string
): Promise<ProductionCompanyByIdResponse> => {
  const companies = await axiosInstance.get(`producers/${id}`);
  return companies.data.productora as ProductionCompanyByIdResponse;
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

export const getAllNominations = async () => {
  const nominations: { data: { postulaciones: NominationsResponse[] } } =
    await axiosInstance.get("producers/postulaciones");
  return nominations.data.postulaciones;
};

export const getFilteredNominations = async (filters: {
  productoraName?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
}): Promise<NominationsResponse[]> => {
  const params = new URLSearchParams();

  if (filters.productoraName) {
    params.append("productoraName", filters.productoraName);
  }
  if (filters.startDate) {
    params.append("startDate", filters.startDate.toISOString());
  }
  if (filters.endDate) {
    params.append("endDate", filters.endDate.toISOString());
  }

  const url = `producers/postulaciones?${params.toString()}`;

  const { data } = await axiosInstance.get<{
    postulaciones: NominationsResponse[];
  }>(url);

  return data.postulaciones;
};

export const deleteAllNominations = async () => {
  await axiosInstance.delete("producers/postulaciones");
};

export const uploadCompanyDocument = async (
  formData: FormData,
  companyId: string
) => {
  await axiosInstance.post(`producers/${companyId}/documentos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
