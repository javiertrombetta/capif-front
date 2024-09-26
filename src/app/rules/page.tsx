import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React, { FC } from "react";
import { FaEdit } from "react-icons/fa";

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
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-[1rem]"
                ></th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4">Galaxia Records</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-[0.4rem] border-[#c8c8c8] border-[1px] pl-[1rem] pr-[1rem] pt-[0.2rem] pb-[0.2rem]">
                      <FaEdit size={16} /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <CustomLayout>
      <Header title="Reglas" />

      <div className="w-[100%] flex justify-end mt-[2rem] pr-[1rem]">
        <CustomButton>Nueva Regla</CustomButton>
      </div>

      <div className="w-[100%] flex pl-[2rem] justify-start">
        <CustomInput label="Buscar" type="text" />
      </div>

      <Table />
    </CustomLayout>
  );
}
