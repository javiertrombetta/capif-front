import { UpdateUserById, User, UsersResponse } from "@/types/user.types";
import { axiosInstance } from "./axiosInstance";

interface GetUsersParams {
  email?: string;
  nombre?: string;
  apellido?: string;
  estado?: string;
}

export const getUsers = async (params?: GetUsersParams) => {
  const users: { data: UsersResponse[] } = await axiosInstance.get("users", {
    params,
  });
  return users.data.map((user) => user.user);
};

export const getUserById = async (id_usuario: string) => {
  const users: { data: { user: User } } = await axiosInstance.get(
    `users?usuarioId=${id_usuario}`
  );
  return users.data;
};

export const updateUserById = async (
  id_usuario: string,
  data: UpdateUserById
) => {
  try {
    await axiosInstance.put("users/" + id_usuario, {
      datosUsuario: data,
    });
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
