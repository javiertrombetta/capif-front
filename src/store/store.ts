import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";
import signupSlice from "./signupSlice";
import createPhonogramSlice from "./createPhonogramSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      modal: modalSlice,
      signup: signupSlice,
      createPhonogram: createPhonogramSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
