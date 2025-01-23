"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { getUserRol } from "@/services/auth";
import { setAuthData } from "@/store/authSlice";
import { getUserData } from "@/services/users";
interface AuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleGetUserData = async () => {
    try {
      const data = await getUserData();
      let dataToSet = data;
      dispatch(setAuthData(data));
      if (data.rol_id) {
        const rol = await getUserRol();
        dataToSet = { ...data, rol };
      }
      dispatch(setAuthData(dataToSet));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
