"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomTable from "@/commons/CustomTable/CustomTable";

function page() {
  return (
    <CustomLayout>
      <Header back title="Cambios en Repertorios" />

      <div className="w-[100%] flex justify-center pr-[1rem] pl-[2rem] mt-[2rem]">
        <div className="w-[100%] flex flex-col justify-between">
          <div className="w-[100%] mt-[2rem] flex gap-[2rem] items-center">
            <CustomInput className="w-[11rem]" type="date" label="FECHA" />
            <CustomInput className="w-[11rem]" type="text" label="ISRC" />
            <CustomInput
              className="w-[11rem]"
              type="email"
              label="EMAIL USUARIO"
            />
            <CustomInput className="w-[11rem]" type="text" label="PRODUCTORA" />
            <CustomInput
              className="w-[11rem]"
              type="text"
              label="TIPO DE CAMBIO"
            />
            <CustomInput className="w-[11rem]" type="text" label="DETALLE" />
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
