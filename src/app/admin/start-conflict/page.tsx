"use client";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React, { FC } from "react";
import { FaSearch, FaRegFileExcel } from "react-icons/fa";
import { IoIosWarning, IoMdSettings } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const SearchForm: FC = () => {
    return (
      <div className="w-[100%]  mt-[2rem] flex flex-col gap-[1rem]">
        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="ISRC"
          />
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="ALBUM"
          />
        </div>

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
            label="PARTES"
          />
        </div>

        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="DESDE"
          />
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="HASTA"
          />
        </div>
        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="AGRUPAR"
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

  const ActionButtons: FC = () => {
    return (
      <div className="w-[100%] mt-[2rem] flex justify-center items-center gap-[2rem]">
        <div className="cursor-pointer flex justify-center items-center flex-col border-[#c8c8c8] hover:border-[black] border-[1px] rounded-[0.5rem] h-[6rem] w-[16rem]">
          <IoIosWarning color="black" size={25} />
          <p className="text-black text-center text-[0.8rem]">
            Ver conflictos a iniciar
          </p>
        </div>
        <div
          onClick={() => router.push("/admin/process-conflicts")}
          className="cursor-pointer flex justify-center items-center flex-col border-[#c8c8c8] hover:border-[black] border-[1px] rounded-[0.5rem] h-[6rem] w-[16rem]"
        >
          <IoMdSettings color="black" size={25} />
          <p className="text-black text-center text-[0.8rem]">
            Ver conflictos del proceso
          </p>
        </div>
      </div>
    );
  };

  const Table: FC = () => {
    return (
      <div className="w-[100%] pl-[1rem] pr-[1rem]">
        <div className="relative overflow-x-auto mt-[2rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  <input type="checkbox" />
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ISRC
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  TEMA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ARTISTA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ALBUM
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  PARTES
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  PERIODO
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  };

  return (
    <CustomLayout>
      <Header title="Iniciar Conflicto" />
      <SearchForm />
      <ActionButtons />
      <Table />
      <button className="text-black mt-[3rem] ml-[3rem] border-[1px] border-[#c8c8c8] p-[0.4rem] flex justify-center items-center gap-[0.3rem]">
        <FaRegFileExcel color="black" size={20} />
        Descargar conflictos
      </button>
    </CustomLayout>
  );
}
