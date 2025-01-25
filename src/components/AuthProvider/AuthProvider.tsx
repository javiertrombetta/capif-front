"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { getAuthData } from "@/services/auth";
import { setAuthData } from "@/store/authSlice";
import { useRouter } from "next/navigation";
interface AuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGetUserData = async () => {
    const data = await getAuthData();
    dispatch(setAuthData(data));

    if (!data.id_usuario) {
      router.push("/login");
    }
    return;
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
