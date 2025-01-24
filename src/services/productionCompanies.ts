import { ProductionCompanyByIdResponse } from "@/types/productionCompany.types";
import { axiosInstance } from "./axiosInstance";
import { CompanyValues } from "@/components/UserProfileView/UserProfileView";

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

export const updateCompany = async (
  id: string,
  companyData: CompanyValues
): Promise<ProductionCompanyByIdResponse> => {
  const updatedCompany = await axiosInstance.put(`producers/${id}`, {
    companyData,
  });
  return updatedCompany.data;
};
