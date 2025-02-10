"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { ChangePasswordView } from "@/components/ChangePasswordView/ChangePasswordView";
import { useAppSelector } from "@/hooks/storeHooks";

export default function page() {
  const authData = useAppSelector((state) => state.auth);

  return (
    <CustomLayout>
      <Header title="Cambiar Contraseña" />

      {authData.id_usuario && (
        <div className="w-[100%] mt-[2rem] pl-[2rem] pr-[2rem] flex justify-start">
          <ChangePasswordView idUsuario={authData.id_usuario} />
        </div>
      )}
    </CustomLayout>
  );
}
