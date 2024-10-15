import { axiosInstance } from "./axiosInstance";

interface AuthRegisterRequest {
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

export const authRegister = async (authRegisterData: AuthRegisterRequest) => {
  try {
    const { data } = await axiosInstance.post(
      "auth/register",
      authRegisterData
    );
    return data;
  } catch (error: unknown) {
    throw new Error(`${error}`);
  }
};
