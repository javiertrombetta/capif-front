import { axiosInstance } from "./axiosInstance";
import {
  AuthDataResponse,
  AuthProps,
  AuthSecondarySignUpRequest,
  GetProductorasResponse,
} from "@/types/auth.types";

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
      "auth/registro/primario",
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
  await axiosInstance.post("auth/registro/secundario", formValues);
};

export const authLogin = async (authLoginData: AuthLoginRequest) => {
  try {
    const { data } = await axiosInstance.post("auth/login", authLoginData);
    return data;
  } catch (error: unknown) {
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
    const { data } = await axiosInstance.get<AuthDataResponse>("auth/me");
    return {
      ...data.user,
      productoras: data.maestros.map(
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
    };
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const validateEmail = async (token: string) => {
  try {
    await axiosInstance.get(`auth/validate-email/${token}`);
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const resetPasswordRequest = async (email: string) => {
  try {
    const { data } = await axiosInstance.post("auth/clave/mail/reseteo", {
      email,
    });
    return data;
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const passwordRecovery = async (token: string, newPassword: string) => {
  try {
    await axiosInstance.post("auth/clave/mail/cambio", {
      token,
      newPassword,
    });
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const verifyAccount = async (token: string) => {
  try {
    await axiosInstance.put(`auth/clave/mail/validacion/${token}`);
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const changePassword = async (data_request: {
  id_usuario: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    await axiosInstance.post("auth/clave/cambio", {
      id_usuario: data_request.id_usuario,
      newPassword: data_request.newPassword,
      confirmPassword: data_request.confirmPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAssociatedProductionCompanies =
  async (): Promise<GetProductorasResponse> => {
    const productoras = await axiosInstance.get("auth/productora");
    return productoras.data;
  };

export const selectProductionCompany = async (productoraId: string) => {
  await axiosInstance.post("auth/productora/activa", { productoraId });
};
