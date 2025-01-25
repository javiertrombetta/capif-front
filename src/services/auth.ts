import { ProductionCompanyResponse } from "@/types/productionCompany.types";
import { SendApplication } from "@/types/user.types";
import { axiosInstance } from "./axiosInstance";
import {
  GetAuthDataResponse,
  AuthProps,
  AuthSecondarySignUpRequest,
} from "@/types/auth.types";
import { AxiosError } from "axios";

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
  formValues: AuthSecondarySignUpRequest
) => {
  await axiosInstance.post("auth/prods/secondary", formValues);
};

export const authLogin = async (authLoginData: AuthLoginRequest) => {
  try {
    const { data } = await axiosInstance.post("auth/login", authLoginData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.status === 409) {
      return true;
    }
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
      productoras: data.productoras.map(
        ({ productora: { nombre_productora: nombre, id_productora: id } }) => ({
          id,
          nombre,
        })
      ),
      vistas: data.vistas.map((vista) => ({
        nombre: vista.nombre_vista,
        nombre_vista_superior: vista.nombre_vista_superior,
      })),
      productoraActiva: null, //ToDo: traer productora activa eventualmente
      loading: false,
    };
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`${error}`);
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
    await axiosInstance.post("auth/prods/primary/step-two", requestData);
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

export const getPendingApplications = async () => {
  try {
    const response = (await axiosInstance.get("auth/pending", {})) as {
      data: { user: ProductionCompanyResponse | ProductionCompanyResponse[] };
    };

    return Array.isArray(response.data.user)
      ? response.data.user
      : [response.data.user];
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};
