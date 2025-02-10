import { axiosInstance } from "./axiosInstance";
import { GetUsersResponse, SendApplication } from "@/types/user.types";
import {
  GetAuthDataResponse,
  AuthProps,
  AuthSecondarySignUpRequest,
} from "@/types/auth.types";
import { authDefaultState } from "@/store/authSlice";

interface AuthSignUpRequest {
  email: string;
  password: string;
  // nombre: string;
  // apellido: string;
  // cuit: string;
  // tipo_persona_descripcion: string;
  // domicilio: string;
  // ciudad: string;
  // provincia: string;
  // pais: string;
  // codigo_postal: string;
  // telefono: string;
}

interface AuthLoginRequest {
  email: string;
  password: string;
}

export const authSignUp = async (authSignUpData: AuthSignUpRequest) => {
  try {
    const { data } = await axiosInstance.post(
      "auth/prods/primary/step-one",
      authSignUpData
    );
    return data;
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const authSecondarySignup = async (
  type: "prods" | "admins",
  formValues: AuthSecondarySignUpRequest
) => {
  await axiosInstance.post(`auth/${type}/secondary`, formValues);
};

export const authLogin = async (authLoginData: AuthLoginRequest) => {
  try {
    const { data } = await axiosInstance.post("auth/login", authLoginData);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};

export const authLogout = async () => {
  try {
    await axiosInstance.post("auth/logout");
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const getAuthData = async (): Promise<AuthProps> => {
  try {
    const { data } = await axiosInstance.get<GetAuthDataResponse>("users/me");
    return {
      ...data.usuario,
      id_usuario: data.usuario.id,
      productoras: data.productoras,
      vistas: data.vistas.map((vista) => ({
        nombre: vista.nombre_vista,
        nombre_vista_superior: vista.nombre_vista_superior,
      })),
      productoraActiva: data.usuario.productora_activa || data.productoras[0], //ToDo: traer productora activa eventualmente
      loading: false,
    };
  } catch (error: unknown) {
    console.error(error);
    return { ...authDefaultState, loading: false };
  }
};

export const validateEmail = async (token: string) => {
  try {
    await axiosInstance.put(`auth/validate/${token}`);
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const resetPasswordRequest = async (email: string) => {
  try {
    const { data } = await axiosInstance.put("auth/password/request-reset", {
      email,
    });
    return data;
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const passwordRecovery = async (token: string, newPassword: string) => {
  try {
    await axiosInstance.put("auth/password/reset", {
      token,
      newPassword,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const verifyAccount = async (token: string) => {
  try {
    await axiosInstance.put(`auth/validate/${token}`);
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const selectProductionCompany = async (productoraId: string) => {
  await axiosInstance.post("auth/me/" + productoraId, {});
};

export const sendApplication = async (requestData: SendApplication) => {
  try {
    const response = (await axiosInstance.post(
      "auth/prods/primary/step-two",
      requestData
    )) as {
      data: {
        productora: string;
        message: string;
      };
    };
    return response.data;
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const rejectApplication = async (
  id_usuario: string,
  comentario: string
) => {
  try {
    await axiosInstance.post(`auth/prods/primary/${id_usuario}/authorize`, {
      comentario,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const acceptApplication = async (id_usuario: string) => {
  try {
    await axiosInstance.post(`auth/prods/primary/${id_usuario}/authorize`, {
      usuarioId: id_usuario,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const getPendingApplications = async (id_usuario: string) => {
  try {
    const { data } = await axiosInstance.get<GetUsersResponse>("auth/pending", {
      params: {
        usuarioId: id_usuario,
      },
    });

    return data.data[0];
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};
