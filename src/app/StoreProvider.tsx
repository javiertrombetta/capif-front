"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/store";
import { initializeUser } from "../store/userSlice";

export default function StoreProvider({
  initialUser,
  children,
}: {
  initialUser: { id: number; email: string; fullName: string }[];
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeUser(initialUser));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
