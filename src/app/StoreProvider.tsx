"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/store";
import { initializeModal, ModalSliceProps } from "@/store/modalSlice";
import { AuthProps } from "@/types/auth.types";
import { initializeSignup, SignupSliceProps } from "@/store/signupSlice";
import {
  initializeCreatePhonogram,
  CreatePhonogramSliceProps,
} from "@/store/createPhonogramSlice";
import { setAuthData } from "@/store/authSlice";
import { CookiesProvider } from "react-cookie";

export default function StoreProvider({
  initialModal,
  initialSignup,
  initialAuth,
  initialCreatePhonogram,
  children,
}: {
  initialAuth: AuthProps;
  children: React.ReactNode;
  initialModal: ModalSliceProps;
  initialSignup: SignupSliceProps;
  initialCreatePhonogram: CreatePhonogramSliceProps;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeModal(initialModal));
    storeRef.current.dispatch(initializeSignup(initialSignup));
    storeRef.current.dispatch(setAuthData(initialAuth));
    storeRef.current.dispatch(
      initializeCreatePhonogram(initialCreatePhonogram)
    );
  }

  return (
    <Provider store={storeRef.current}>
      <CookiesProvider>{children}</CookiesProvider>
    </Provider>
  );
}
