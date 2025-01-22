import { FakeUserProps, ROLES } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const defaultUser: FakeUserProps = {
  names: "Admin",
  email: "superadmin@gmail.com",
  phone: "+54 11-234567",
  rol: ROLES.SUPER_ADMIN,
  activeProduction: "WARNER",
};

const getInitialState = (): FakeUserProps => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser) as FakeUserProps;
      } catch {
        console.error("Error parsing user data from localStorage.");
      }
    }
  }
  return defaultUser;
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultUser,
  reducers: {
    initializeUser(_state, action: PayloadAction<FakeUserProps>) {
      return action.payload;
    },
    setUser(_state, action: PayloadAction<FakeUserProps>) {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("@@INIT", () => getInitialState());
  },
});

export const { initializeUser, setUser } = userSlice.actions;
export default userSlice.reducer;

/*
export const initialStateUser: { user: UserProps } = {
  user: {
    TipoPersona: {
      description: "Persona Física",
      id_tipo_persona: "",
    },
    apellido: "",
    nombre: "",
    ciudad: "",
    provincia: "",
    pais: "",
    domicilio: "",
    clave: "",
    codigo_postal: "",
    cuit: "",
    email: "",
    estado_id: "",
    id_usuario: "",
    intentos_fallidos: 0,
    isHabilitado: false,
    isRegistro_pendiente: false,
    telefono: "",
    tipo_persona_id: "",
  },
};
*/
