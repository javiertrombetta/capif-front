import CustomInput from "@/commons/CustomInput/CustomInput";
import Header from "@/commons/Header/Header";
import React from "react";

export default function page() {
  return (
    <div className="h-[100vh] max-w-[100%] min-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <Header title="Reportes por ISRC" />
      <div className="mt-[2rem] ml-[2rem] flex flex-col">
        <h1 className="text-black font-bold ">
          Cargue aquí el archivo en formato .xlsx con el listado de ISRC desde
          el campo A2 a Axxx
        </h1>
        <input type="file" className="mt-[1rem]" />

        <div className="flex gap-[2rem] mt-[2rem]">
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

        <button className="text-white w-[9rem] h-[2.5rem] bg-[#1280e1] text-[0.9rem] mt-[2rem]">
          Solicitar Reporte
        </button>
      </div>
    </div>
  );
}
