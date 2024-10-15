import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import Link from "next/link";
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
                  TIPO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ARCHIVO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  USUARIO CREACIÓN
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  FECHA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  FECHA CREACIÓN
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4">Repertorio</td>
                  <td className="px-6 py-4 text-mainblue">Descargar</td>
                  <td className="px-6 py-4">user1234@gmail.com</td>
                  <td className="px-6 py-4">01//01/24</td>
                  <td className="px-6 py-4">01//01/24</td>
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
      <Header title="Alta Masiva" />

      <div className="w-[100%] pr-[2rem] flex justify-end mt-[2rem]">
        <Link href={"/admin/mass-registration/new-file"}>
          <CustomButton>Nuevo Archivo</CustomButton>
        </Link>
      </div>

      <div className="w-[100%] pl-[2rem] pr-[2rem] flex justify-start mt-[2rem]">
        <CustomInput label="Buscar" type="text"></CustomInput>
      </div>

      <Table />
    </CustomLayout>
  );
}
