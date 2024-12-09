import { axiosInstance } from "./axiosInstance";
import { UserProps } from "@/types/auth.types";

interface AuthSignUpRequest {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  cuit: string;
  tipo_persona_descripcion: string;
  domicilio: string;
  ciudad: string;
  provincia: string;
  pais: string;
  codigo_postal: string;
  telefono: string;
}

interface AuthLoginRequest {
  email: string;
  password: string;
}

export const authSignUp = async (authSignUpData: AuthSignUpRequest) => {
  try {
    const { data } = await axiosInstance.post("auth/register", authSignUpData);
    return data;
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const authLogin = async (authLoginData: AuthLoginRequest) => {
  try {
    const { data } = await axiosInstance.post("auth/login", authLoginData);
    return data;
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};

export const getUserData = async (token: string): Promise<UserProps> => {
  try {
    const { data } = (await axiosInstance.get("auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as {
      data: {
        user: UserProps;
      };
    };
    return data.user;
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
