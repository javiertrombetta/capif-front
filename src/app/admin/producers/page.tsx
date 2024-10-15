import React, { FC } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";

export default function page() {
  const Table: FC = () => {
    return (
      <div className="w-[100%] pl-[1rem] pr-[1rem]">
        <div className="relative mt-[2rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  NOMBRE
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  CUIT
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  VISUALIZACIÓN REPERTORIO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  TITULAR DE DERECHOS
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  AGENTE DE COBRO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ID REPERTORIO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  VERIFICADO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4">Ok Records</td>
                <td className="px-6 py-4">CUIT</td>
                <td className="px-6 py-4">NO</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">123456</td>
                <td className="px-6 py-4">NO</td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-[0.4rem] border-[#c8c8c8] border-[1px] pl-[1rem] pr-[1rem] pt-[0.2rem] pb-[0.2rem]">
                    <FaEdit size={16} /> Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <CustomLayout>
      <Header title="Productores" />
      <div className="w-[100%] flex justify-between items-center pl-[2rem] pr-[2rem] mt-[2rem]">
        <div>
          <p className="font-bold text-black">VERIFICADO</p>
          <select className="w-[20rem] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
            <option>TODOS</option>
            <option>SI</option>
            <option>NO</option>
          </select>
        </div>
        <div className="flex gap-[1rem]">
          <Link href={"/admin/new-company-file"}>
            <CustomButton>Nueva Compañía Archivo</CustomButton>
          </Link>
          <Link href={"/admin/new-company"}>
            <CustomButton>Nueva Compañía</CustomButton>
          </Link>
        </div>
      </div>
      <Table />
    </CustomLayout>
  );
}
