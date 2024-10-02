import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React, { FC } from "react";
import { FaEye, FaRegFileExcel, FaSearch } from "react-icons/fa";

export default function page() {
  const SearchForm: FC = () => {
    return (
      <div className="w-[100%]  mt-[2rem] flex flex-col gap-[1rem]">
        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
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
            label="TEMA"
          />
        </div>

        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="ALBUM"
          />
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="ISRC"
          />
        </div>

        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="NRO. CONFLICTO"
          />

          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="ESTADO"
          />
        </div>
        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="FECHA INICIO DESDE"
          />
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="FECHA INICIO HASTA"
          />
        </div>
        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="PARTES"
          />
        </div>
        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <button className="text-white w-[100%] h-[2.5rem] bg-mainblue text-[1rem] font-bold flex justify-center items-center gap-[0.3rem]">
            <FaSearch />
            Buscar
          </button>
        </div>
      </div>
    );
  };

  const Table: FC = () => {
    return (
      <div className="w-[100%] pl-[1rem] pr-[1rem]">
        <div className="relative mt-[2rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  #
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  FECHA INICIO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  FECHA VENCIMIENTO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ESTADO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4">245</td>
                <td className="px-6 py-4">28-11-2022</td>
                <td className="px-6 py-4">20-12-2022</td>
                <td className="px-6 py-4">Resuelto</td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-[0.4rem] border-[#c8c8c8] border-[1px] pl-[1rem] pr-[1rem] pt-[0.2rem] pb-[0.2rem]">
                    <FaEye size={16} /> Visualizar
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
      <Header title="Conflictos Resueltos" />
      <SearchForm />
      <Table />
      <button className="text-black mt-[3rem] ml-[3rem] border-[1px] border-[#c8c8c8] p-[0.4rem] flex justify-center items-center gap-[0.3rem]">
        <FaRegFileExcel color="black" size={20} />
        Descargar conflictos
      </button>
    </CustomLayout>
  );
}
