"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomTable from "@/commons/CustomTable/CustomTable";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { FaSearch } from "react-icons/fa";

function page() {
  return (
    <CustomLayout>
      <Header title="Cambios en Repertorios" />

      <div className="w-[100%] flex justify-center pr-[1rem] pl-[2rem] ">
        <div className="w-[100%] flex flex-col justify-between">
          <div className="w-[100%] mt-[2rem] flex flex-col  items-center">
            <div className="w-[100%] flex justify-center gap-[1rem]">
              <CustomInput
                containerClassName="w-[100%]"
                className="w-[100%]"
                type="date"
                label="FECHA"
              />
              <CustomInput
                containerClassName="w-[100%]"
                className="w-[100%]"
                type="text"
                label="ISRC"
              />
              <CustomInput
                containerClassName="w-[100%]"
                className="w-[100%]"
                type="email"
                label="EMAIL USUARIO"
              />
            </div>
            <div className="w-[100%] flex justify-center gap-[1rem] mt-[1rem]">
              <CustomInput
                containerClassName="w-[100%]"
                className="w-[100%]"
                type="text"
                label="PRODUCTORA"
              />
              <CustomInput
                containerClassName="w-[100%]"
                className="w-[100%]"
                type="text"
                label="TIPO DE CAMBIO"
              />
              <CustomInput
                containerClassName="w-[100%]"
                className="w-[100%]"
                type="text"
                label="DETALLE"
              />
            </div>
            <div className="w-[100%] mt-[1rem]">
              <CustomButton className="w-full h-[2.5rem] pt-[1.2rem] pb-[1.2rem] text-[1rem] font-bold gap-[0.3rem]">
                <FaSearch />
                Buscar
              </CustomButton>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "FECHA", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "EMAIL USUARIO", isSortable: true },
            { name: "PRODUCTORA", isSortable: true },
            { name: "DETALLE", isSortable: true },
          ]}
          columnValues={[
            [
              "23/06/24",
              "21349781409",
              "productor@gmail.com",
              "Warner",
              "Artista: Airbag",
            ],
            [
              "23/06/24",
              "21349781409",
              "productor@gmail.com",
              "Warner",
              "Artista: Airbag",
            ],
            [
              "23/06/24",
              "21349781409",
              "productor@gmail.com",
              "Warner",
              "Artista: Airbag",
            ],
            [
              "23/06/24",
              "21349781409",
              "productor@gmail.com",
              "Warner",
              "Artista: Airbag",
            ],
            [
              "23/06/24",
              "21349781409",
              "productor@gmail.com",
              "Warner",
              "Artista: Airbag",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
