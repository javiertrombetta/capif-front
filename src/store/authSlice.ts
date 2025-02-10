import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthProps } from "@/types/auth.types";

export const authDefaultState: AuthProps = {
  id_usuario: null,
  email: null,
  nombre: null,
  telefono: null,
  apellido: null,
  estado: null,
  rol: null,
  productoras: [],
  vistas: [],
  productoraActiva: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authDefaultState,
  reducers: {
    setAuthData(_state, action: PayloadAction<AuthProps>) {
      return action.payload;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
