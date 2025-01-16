"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/store";
import { initializeUser } from "../store/userSlice";
import { initializeModal, ModalSliceProps } from "@/store/modalSlice";
import { FakeUserProps, AuthProps } from "@/types/auth.types";
import { initializeSignup, SignupSliceProps } from "@/store/signupSlice";
import { setAuthData } from "@/store/authSlice";
import { CookiesProvider } from "react-cookie";

export default function StoreProvider({
  initialUser,
  initialModal,
  initialSignup,
  initialAuth,
  children,
}: {
  initialUser: FakeUserProps;
  initialAuth: AuthProps;
  children: React.ReactNode;
  initialModal: ModalSliceProps;
  initialSignup: SignupSliceProps;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeUser(initialUser));
    storeRef.current.dispatch(initializeModal(initialModal));
    storeRef.current.dispatch(initializeSignup(initialSignup));
    storeRef.current.dispatch(setAuthData(initialAuth));
  }

  return (
    <Provider store={storeRef.current}>
      <CookiesProvider>{children}</CookiesProvider>
    </Provider>
  );
}
