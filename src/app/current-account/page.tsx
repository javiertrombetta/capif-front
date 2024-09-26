import React from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { FaSearch } from "react-icons/fa";

import "./current-account.css";
export default function page() {
  return (
    <div className="h-[100vh] max-w-[100%] min-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <div className="border-b-[#4444] border-[2px] pb-[1rem]">
        <h1 className="w-[100%] text-start text-black text-[1.5rem] ml-[1rem] mt-[1rem]">
          Cuenta Corriente
        </h1>
      </div>

      <div className="ml-[2rem] mr-[2rem] mt-[1rem] W-[100%] flex justify-between gap-[2rem]">
        <div className="w-[50%]">
          <p className="font-bold text-black">PRODUCTOR</p>
          <CustomInput type="text" className="w-[100%]" />
        </div>

        <div className="w-[50%]">
          <p className="font-bold text-black">PERÍODO</p>
          <CustomInput type="text" className="w-[100%]" />
        </div>
      </div>

      <div className="ml-[2rem] mr-[2rem] mt-[1.5rem] W-[100%] flex justify-between gap-[2rem]">
        <div className="w-[50%]">
          <p className="font-bold text-black">CONCEPTO</p>
          <CustomInput type="text" className="w-[100%]" />
        </div>

        <div className="w-[50%]">
          <p className="font-bold text-black">TIPO</p>
          <CustomInput type="text" className="w-[100%]" />
        </div>
      </div>

      <div className="ml-[2rem] mr-[2rem] mt-[1.5rem] W-[100%] flex justify-between gap-[2rem]">
        <div className="w-[50%]">
          <p className="font-bold text-black">FECHA DESDE</p>
          <CustomInput type="date" className="w-[100%] h-[2.3rem]" />
        </div>

        <div className="w-[50%]">
          <p className="font-bold text-black">FECHA HASTA</p>
          <CustomInput type="date" className="w-[100%] h-[2.3rem]" />
        </div>
      </div>
      <div className="w-[100%] flex justify-center pl-[2rem] pr-[2rem]">
        <button className="text-white w-[100%] h-[2.5rem] bg-mainblue text-[1rem] mt-[1.5rem] font-bold flex justify-center items-center gap-[0.3rem]">
          <FaSearch />
          Buscar
        </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-[4rem]">
        <thead className="text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              FECHA
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              PERIODO
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              COMPROBANTE
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              TIPO
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              CONCEPTO
            </th>
            <th scope="col" className="px-6 py-3 font-bold text-[0.9rem]">
              IMPORTE
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((_, index: number) => (
            <tr key={index} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              ></th>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"> </td>
              <td className="px-6 py-4"> </td>
              <td className="px-6 py-4"> </td>
              <td className="px-6 py-4"> </td>
              <td className="px-6 py-4"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
