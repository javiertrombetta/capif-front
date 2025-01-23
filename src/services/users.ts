import {
  SendApplication,
  UpdateUserById,
  User,
  UsersResponse,
} from "@/types/user.types";
import { axiosInstance } from "./axiosInstance";
import { ProductionCompanyResponse } from "@/types/productionCompany.types";
import { AuthProps } from "@/types/auth.types";

export const getUserData = async (): Promise<AuthProps> => {
  try {
    const { data } = (await axiosInstance.get("usuarios/me")) as {
      data: {
        usuario: AuthProps;
      };
    };
    return data.usuario;
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const sendApplication = async (requestData: SendApplication) => {
  try {
    await axiosInstance.post("usuarios/aplicaciones/enviar", requestData);
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const rejectApplication = async (
  id_usuario: string,
  comentario: string
) => {
  try {
    await axiosInstance.post("usuarios/aplicaciones/rechazar", {
      id_usuario,
      comentario,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const acceptApplication = async (id_usuario: string) => {
  try {
    await axiosInstance.post("usuarios/aplicaciones/autorizar", {
      id_usuario,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const getPendingApplications = async () => {
  try {
    const response = (await axiosInstance.get(
      "usuarios/aplicaciones/pendientes",
      {}
    )) as {
      data: { user: ProductionCompanyResponse | ProductionCompanyResponse[] };
    };
    console.log(response);

    return Array.isArray(response.data.user)
      ? response.data.user
      : [response.data.user];
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const getAllUsers = async () => {
  const users: { data: UsersResponse[] } = await axiosInstance.get("usuarios/");
  return users.data.map((user) => user.user);
};

export const getUserById = async (id_usuario: string) => {
  const user: { data: User } = await axiosInstance.get(
    `usuarios/?id_usuario=${id_usuario}`
  );
  return user.data;
};

export const updateUserById = async (
  id_usuario: string,
  data: UpdateUserById
) => {
  try {
    await axiosInstance.put("usuarios/cambiar", {
      id_usuario,
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
  await axiosInstance.put("usuarios/estado/habilitacion", {
    id_usuario,
    isBlocked,
  });
};

export const changeRole = async (id_usuario: string, newRole: string) => {
  await axiosInstance.put("usuarios/rol", {
    id_usuario,
    newRole,
  });
};
