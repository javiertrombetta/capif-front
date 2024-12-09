"use client";
import React from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import RegistrationsTable from "@/components/RegistrationsTable/RegistrationsTable";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomButton from "@/commons/CustomButton/CustomButton";

export default function page() {
  const userData = useAppSelector((state) => state.user);

  return (
    <div className="h-[100vh] w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <Header back title="Buscar Productora" />

      <div className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
        <CustomInput label="Buscar:" type="text" />
        {userData.rol === ROLES.SUPER_ADMIN ||
        userData.rol === ROLES.CAPIF_ADMIN ? (
          <>
            <select className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
              <option>Registrados</option>
              <option>Pendientes de Registro</option>
              <option>Incompleto</option>
            </select>

            <CustomInput
              className="w-[15rem]"
              label="FECHA CREACIÓN DESDE"
              type="date"
            />
            <CustomInput
              className="w-[15rem]"
              label="FECHA CREACIÓN HASTA"
              type="date"
            />
          </>
        ) : (
          <></>
        )}
      </div>

      <RegistrationsTable />
      <div className="w-[100%] mt-[2rem] mb-[2rem] pr-[2rem] pl-[2rem] flex justify-end">
        <CustomButton>Descargar CVS</CustomButton>
      </div>
    </div>
  );
}
