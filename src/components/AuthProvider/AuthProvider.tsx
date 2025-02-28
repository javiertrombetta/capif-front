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
  const noUserPathnames: string[] = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
    "/verify-account/:token",
    "/confirm-account/:token",
    "/password-recovery/:token",
    "/privacy-policy",
  ];

  const isNoUserPathname = (): boolean => {
    return noUserPathnames.some((path) => {
      const regex = new RegExp(
        "^" + path.replace(/:([^/]+)/g, "([^/]+)") + "$"
      );
      return regex.test(pathname);
    });
  };

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

    if (pathname === "/privacy-policy") {
      return;
    }
    if (!data.id_usuario && !isNoUserPathname()) {
      router.push("/login");
    } else {
      if (pathname === "/login" && data.estado === "HABILITADO") {
        router.push("/users");
        return;
      }
      if (data.estado && data.estado !== "HABILITADO") {
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
