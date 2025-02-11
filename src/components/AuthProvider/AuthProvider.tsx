"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import { getAuthData } from "@/services/auth";
import { setAuthData } from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";

interface AuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleGetUserData = async () => {
    const data = await getAuthData();
    let activeCompany = null;

    if (window && window.localStorage) {
      activeCompany = localStorage.getItem("company");
    }
    if (activeCompany) {
      dispatch(
        setAuthData({ ...data, productoraActiva: JSON.parse(activeCompany) })
      );
    } else {
      dispatch(setAuthData(data));
    }

    if (!data.id_usuario) {
      router.push("/login");
    } else {
      if (pathname === "/login" && data.estado === "HABILITADO") {
        router.push("/users");
        return;
      }
      if (data.estado !== "HABILITADO") {
        router.push("/producers/register");
      }
    }
    return;
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
