import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalNames } from "@/types/modalNames";

export interface ModalSliceProps {
  type: ModalNames | null;
  isActive: boolean;
}

export const initialStateModal: ModalSliceProps = {
  type: null,
  isActive: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialStateModal,
  reducers: {
    initializeModal(_state, action: PayloadAction<ModalSliceProps>) {
      _state = action.payload;
    },
    setModal(_state, action: PayloadAction<ModalSliceProps>) {
      return action.payload;
    },
  },
});

export const { initializeModal, setModal } = modalSlice.actions;
export default modalSlice.reducer;
