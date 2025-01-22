import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignupSliceProps {
  // name: string;
  // lastname: string;
  // phone: string;
  email: string;
}

export const initialStateSignup: SignupSliceProps = {
  // name: "",
  // lastname: "",
  // phone: "",
  email: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState: initialStateSignup,
  reducers: {
    initializeSignup(_state, action: PayloadAction<SignupSliceProps>) {
      _state = action.payload;
    },
    setSignupData(_state, action: PayloadAction<SignupSliceProps>) {
      return action.payload;
    },
  },
});

export const { initializeSignup, setSignupData } = signupSlice.actions;
export default signupSlice.reducer;
