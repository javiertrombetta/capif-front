import React from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { usersFakeData } from "@/utils/usersFakeData";

export default function page() {
  return (
    <div className="h-[100vh] max-w-[100%] min-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <div className="border-b-[#4444] border-[2px] pb-[1rem]">
        <h1 className="w-[100%] text-start text-black text-[1.5rem] ml-[1rem] mt-[1rem]">
          Listado General
        </h1>
      </div>

      <div className="mt-[2rem] pl-[1rem]">
        <label className="font-bold text-black">Buscar:</label>
        <CustomInput clasName="ml-[0.5rem]" type="text" />
      </div>

      <div className="relative overflow-x-auto mt-[2rem]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
                EMAIL / USUARIO
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
                ESTADO REGISTRADO
              </th>
              <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
                CANTIDAD DE TRÁMITES
              </th>
            </tr>
          </thead>
          <tbody>
            {usersFakeData.map((element, index: number) => (
              <tr key={index} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-[#1280e1]"
                >
                  {element.email}
                </th>
                <td className="px-6 py-4">CONFIRMADO</td>
                <td className="px-6 py-4">1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
