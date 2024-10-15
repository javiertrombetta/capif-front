import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";

export default function page() {
  const SearchForm: FC = () => {
    return (
      <>
        <div className="w-[100%] mt-[1rem] flex flex-col gap-[1rem]">
          <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ARTISTA"
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
              label="TEMA"
            />
          </div>
          <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
            <button className="text-white w-[100%] h-[2.5rem] bg-mainblue text-[1rem] font-bold flex justify-center items-center gap-[0.3rem]">
              <FaSearch />
              Buscar
            </button>
          </div>
        </div>

        <div className="w-[100%] mt-[2rem] pl-[2rem]">
          <CustomInput className="w-[15rem]" type="text" label="Buscar:" />
        </div>
      </>
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
                  ISRC
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  TITULO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ARTISTA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ALBUM
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  PERIODO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  RESUELTO
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
      <Header title="Conflicto N° 1689 - Resolución Automática" />
      <div className="w-[100%] flex justify-end mt-[2rem]">
        <CustomButton>Volver a la lista</CustomButton>
      </div>
      <SearchForm />
      <Table />
    </CustomLayout>
  );
}
