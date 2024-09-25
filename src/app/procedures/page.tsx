import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import React, { FC } from "react";

export default function page() {
  const Form: FC = () => {
    const procedureTypes: string[] = [
      "TRÁMITE NO PRESENTADO",
      "TRÁMITE INGRESADO - A REVISAR",
      "TRÁMITE INGRESADO INCOMPLETO",
      "TRÁMITE PRESENTADO",
      "TRÁMITE PRESENTADO INCOMPLETO",
      "TRÁMITE EN ESPERA",
      "TRÁMITE PRE-LIQUIDADO",
      "TRÁMITE LIQUIDADO A ABONAR",
      "TRÁMITE ABONADO",
      "TRÁMITE RECHAZADO",
      "TRÁMITE DESISTIDO",
    ];

    return (
      <div className="w-[100%] p-[1rem] mt-[2rem]">
        <div className="grid grid-cols-2 gap-4 ]">
          <div id="procedure-type">
            <p className="text-black font-bold">ESTADO</p>
            <select className="w-[100%] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
              {procedureTypes.map((procedure: string, index: number) => (
                <option key={index}>{procedure}</option>
              ))}
            </select>
          </div>

          <div id="procedure-number">
            <p className="text-black font-bold">NÚMERO DE TRÁMITE</p>
            <CustomInput type="number" className="w-[100%]" />
          </div>

          <div id="procedure-number">
            <p className="text-black font-bold">FECHA CREACIÓN DESDE</p>
            <CustomInput type="date" className="w-[100%]" />
          </div>

          <div id="procedure-number">
            <p className="text-black font-bold">FECHA CREACIÓN HASTA</p>
            <CustomInput type="date" className="w-[100%]" />
          </div>
        </div>

        <button className="bg-mainblue w-[100%] font-bold h-[2rem] mt-[2rem]">
          GENERAR NUEVO TRÁMITE
        </button>
      </div>
    );
  };

  const ProceduresTable: FC = () => {
    return (
      <div className="relative overflow-x-auto mt-[3rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                NÚMERO TRÁMITE
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                ESTADO
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                USUARIO CREACIÓN
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                CUIT/CUIL
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                PERIODO
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                FECHA CREACIÓN
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                FECHA VENCIMIENTO
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                ANTICIPO
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                PREVIAMENTE
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                ASIGNADO
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  };

  return (
    <CustomLayout>
      <Form />
      <ProceduresTable />
    </CustomLayout>
  );
}
