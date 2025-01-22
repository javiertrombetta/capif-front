"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { getAuthData } from "@/services/auth";
import { setAuthData } from "@/store/authSlice";

interface AuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleGetUserData = async () => {
    try {
      const data = await getAuthData();
      dispatch(setAuthData(data));
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
