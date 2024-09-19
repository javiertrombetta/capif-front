import React from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import RegistrationsTable from "@/components/RegistrationsTable/RegistrationsTable";

export default function page() {
  return (
    <div className="h-[100vh] max-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <div className="border-b-[#4444] border-[2px] pb-[1rem]">
        <h1 className="w-[100%] text-start text-black text-[1.5rem] ml-[1rem] mt-[1rem]">
          Registrados
        </h1>
      </div>

      <div className="flex items-center mt-[1rem] gap-[2rem]">
        <div className=" pl-[1rem]">
          <label className="font-bold text-black">Buscar:</label>
          <CustomInput clasName="ml-[0.5rem]" type="text" />
        </div>

        <select className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
          <option>Registrados</option>
          <option>Pendientes de Registro</option>
        </select>
      </div>

      <RegistrationsTable />
    </div>
  );
}
