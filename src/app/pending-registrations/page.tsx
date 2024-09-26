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

      <div className="mt-[1rem] pl-[1rem]">
        <label className="font-bold text-black">Buscar:</label>
        <CustomInput className="ml-[0.5rem]" type="text" />
      </div>
      <RegistrationsTable />
    </div>
  );
}
