"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { getAuthData } from "@/services/auth";
import { setAuthData } from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { AuthProps } from "@/types/auth.types";
interface AuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleGetUserData = async () => {
    const data = await getAuthData();
    dispatch(setAuthData(data));

    if (!data.id_usuario) {
      router.push("/login");
    } else {
      if (pathname === "/login") {
        handleVerifyRegisterType(data);
      } else {
        handleVerifyRegisterType(data);
      }
    }
    return;
  };

  const handleVerifyRegisterType = (data: AuthProps) => {
    if (data.estado === "HABILITADO") {
      router.push("/users");
    } else {
      router.push("/register-production-company");
    }
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
