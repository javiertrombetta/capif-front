import React, { FC } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { FaEdit } from "react-icons/fa";

export default function page() {
  const Table: FC = () => {
    return (
      <div className="w-[100%] pl-[1rem] pr-[1rem] mt-[2rem]">
        <div className="relative mt-[2rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  TEMA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ARTISTA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ISRC
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  SELLO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  AÑO DE PUBLICACIÓN
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ALBUM
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ¿ENVÍO A MONITOREO DESDE GIT?
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((_, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4">Por Mil Noches</td>
                  <td className="px-6 py-4">Airbag</td>
                  <td className="px-6 py-4 text-mainblue">AR2572400001</td>
                  <td className="px-6 py-4">Airbag</td>
                  <td className="px-6 py-4">2024</td>
                  <td className="px-6 py-4">Libertad</td>
                  <td className="px-6 py-4">Si</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-[0.4rem] border-[#c8c8c8] border-[1px] pl-[1rem] pr-[1rem] pt-[0.2rem] pb-[0.2rem]">
                      <FaEdit size={16} /> Detalle
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
      <Header title="Depuración de Repertorio" />

      <div className="mt-[2rem] w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="ORIGEN"
        />

        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="PRODUCTOR"
        />
      </div>
      <div className="mt-[2rem] w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="TITULAR"
        />

        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="AGENTE"
        />
      </div>
      <div className="mt-[2rem] w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="ARTISTA"
        />

        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="SELLO"
        />
      </div>
      <div className="mt-[2rem] w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="TEMA"
        />

        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="AÑO DE PUBLICACIÓN"
        />
      </div>
      <Table />
    </CustomLayout>
  );
}
