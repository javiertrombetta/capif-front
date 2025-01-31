"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ChangePasswordForm } from "../users/edit-user/[id]/page";

export default function page() {
  const authData = useAppSelector((state) => state.auth);

  return (
    <CustomLayout>
      <Header title="Cambiar Contraseña" />

      {authData.id_usuario && (
        <div className="w-[100%] mt-[2rem] pl-[2rem] pr-[2rem] flex justify-start">
          <ChangePasswordForm idUsuario={authData.id_usuario} />
        </div>
      )}
    </CustomLayout>
  );
}
