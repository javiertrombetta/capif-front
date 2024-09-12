import React from "react";

export default function page() {
  return (
    <div className="h-[100vh] max-w-[100%] min-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <div className="border-b-[#4444] border-[2px] pb-[1rem]">
        <h1 className="w-[100%] text-start text-black text-[1.5rem] ml-[1rem] mt-[1rem]">
          Reportes por ISRC
        </h1>
      </div>
      <div className="mt-[2rem] ml-[2rem] flex flex-col">
        <h1 className="text-black font-bold ">
          Cargue aquí el archivo en formato .xlsx con el listado de ISRC desde
          el campo A2 a Axxx
        </h1>
        <input type="file" className="mt-[1rem]" />

        <button className="text-white w-[9rem] h-[2.5rem] bg-[#1280e1] text-[0.9rem] mt-[2rem]">
          Solicitar Reporte
        </button>
      </div>
    </div>
  );
}
