import React, { FC } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { FaSearch } from "react-icons/fa";

export default function page() {
  const Table: FC = () => {
    return (
      <div className="w-[100%] pl-[1rem] pr-[1rem] mt-[2rem]">
        <div className="relative mt-[2rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  #
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  FECHA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  TIPO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ESTADO
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
      <Header title="Descargar Reportes" />

      <div className="mt-[2rem] w-[100%] pr-[2rem] pl-[2rem] flex justify-center items-center gap-[3rem]">
        <CustomInput
          containerClassName="grow"
          className="w-[100%]"
          label="NRO. REPORTE"
          type="text"
        />
        <CustomInput
          containerClassName="grow"
          className="w-[100%]"
          label="FECHA INICIO DESDE"
          type="text"
        />
        <CustomInput
          containerClassName="grow"
          className="w-[100%]"
          label="FECHA INICIO HASTA"
          type="text"
        />
        <CustomInput
          containerClassName="grow"
          className="w-[100%]"
          label="TIPO"
          type="text"
        />
        <div className="flex h-[3.3rem] items-end">
          <CustomButton className="gap-[0.3rem]">
            <FaSearch color="white" size={14} /> Buscar
          </CustomButton>
        </div>
      </div>

      <Table />
    </CustomLayout>
  );
}
