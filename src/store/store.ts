import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";
import signupSlice from "./signupSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      modal: modalSlice,
      signup: signupSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
