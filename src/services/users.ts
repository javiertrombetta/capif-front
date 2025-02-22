import {
  UpdateUserByIdPayload,
  GetUsersResponse,
  UpdateViewsPayload,
} from "@/types/user.types";
import { axiosInstance } from "./axiosInstance";

interface GetUsersParams {
  email?: string;
  nombre?: string;
  apellido?: string;
  estado?: string;
  productoraId?: string;
}

export const getUsers = async (params?: GetUsersParams) => {
  const users = await axiosInstance.get<GetUsersResponse>("users", {
    params,
  });
  return users.data.data;
};

export const getUserById = async (id_usuario: string) => {
  const users: { data: GetUsersResponse } = await axiosInstance.get(
    `users?usuarioId=${id_usuario}`
  );
  return users.data.data[0];
};

export const updateUserById = async (
  id_usuario: string,
  data: UpdateUserByIdPayload
) => {
  try {
    await axiosInstance.put("users/" + id_usuario, {
      datosUsuario: data,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const updateUserViews = async (
  id_usuario: string,
  views: UpdateViewsPayload
) => {
  try {
    await axiosInstance.put("users/" + id_usuario + "/views/status", views);
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const blockOrUnlockUser = async (
  id_usuario: string,
  isBlocked: boolean
) => {
  await axiosInstance.put(`users/${id_usuario}/status/login`, {
    isBlocked,
  });
};

export const removeUserFromProducer = async (id_usuario: string) => {
  await axiosInstance.delete(`users/${id_usuario}/relationship`);
};

export const changePassword = async (data_request: {
  id_usuario: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    await axiosInstance.put(`users/${data_request.id_usuario}/password`, {
      newPassword: data_request.newPassword,
      confirmPassword: data_request.confirmPassword,
    });
  } catch (error) {
    console.log(error);
  }
};
