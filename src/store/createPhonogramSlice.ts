import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreatePhonogramSliceProps {
  productora_id: string | null;
  titulo: string | null;
  artista: string | null;
  album: string | null;
  duracion: string | null;
  anio_lanzamiento: number | null;
  sello_discografico: string | null;
  isrc: string | null;
  id_repertorio: string | null;
  participaciones:
    | {
        cuit: string | null;
        porcentaje_participacion: number | null;
        fecha_inicio: string;
        fecha_hasta: string;
      }[]
    | null;
  territorios: string[];
}

export const initialStateCreatePhonogram: CreatePhonogramSliceProps = {
  productora_id: null,
  titulo: null,
  artista: null,
  album: null,
  duracion: null,
  anio_lanzamiento: null,
  sello_discografico: null,
  isrc: null,
  id_repertorio: null,
  participaciones: null,
  territorios: [],
};

const createPhonogramSlice = createSlice({
  name: "createPhonogram",
  initialState: initialStateCreatePhonogram,
  reducers: {
    initializeCreatePhonogram(
      _state,
      action: PayloadAction<CreatePhonogramSliceProps>
    ) {
      _state = action.payload;
    },
    setCreatePhonogram(
      _state,
      action: PayloadAction<CreatePhonogramSliceProps>
    ) {
      return action.payload;
    },
  },
});

export const { initializeCreatePhonogram, setCreatePhonogram } =
  createPhonogramSlice.actions;
export default createPhonogramSlice.reducer;
