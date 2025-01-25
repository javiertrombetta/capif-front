"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { getAuthData } from "@/services/auth";
import { setAuthData } from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
interface AuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGetUserData = async () => {
    try {
      const data = await getAuthData();
      dispatch(setAuthData(data));

      if (data.id_usuario) {
        localStorage.setItem("isLoged", "true");
      } else {
        localStorage.removeItem("isLoged");
        router.push("/login");
      }
      return data;
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
