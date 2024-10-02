import React from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import RegistrationsTable from "@/components/RegistrationsTable/RegistrationsTable";
import Header from "@/commons/Header/Header";

export default function page() {
  return (
    <div className="h-[100vh] w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <Header title="Registros" />

      <div className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
        <CustomInput label="Buscar:" type="text" />

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
      </div>

      <RegistrationsTable />
    </div>
  );
}
