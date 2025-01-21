import { axiosInstance } from "./axiosInstance";

export const getAllCompanies = async () => {
  const companies = await axiosInstance.get("productoras/");
  return companies.data.productoras;
};
