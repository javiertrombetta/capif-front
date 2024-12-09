"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomTable from "@/commons/CustomTable/CustomTable";

function page() {
  return (
    <CustomLayout>
      <Header back title="Cambios Realizados" />

      <div className="w-[100%] flex justify-between pr-[1rem] pl-[2rem] mt-[2rem]">
        <CustomInput type="date" label="FECHA" />
        <CustomInput type="email" label="EMAIL DE USUARIO" />
        <CustomInput type="text" label="TABLA DB" />
        <div className="w-[12rem]">
          <p className="text-black font-bold">TIPO DE AUDITORIA</p>
          <select className="w-[100%] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
            <option>ALTA</option>
            <option>PRIMERA PRORROGA</option>
            <option>BAJA</option>
            <option>CAMBIO</option>
            <option>ERROR</option>
            <option>SISTEMA</option>
          </select>
        </div>
      </div>
      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "FECHA", isSortable: true },
            { name: "EMAIL DE USUARIO", isSortable: true },
            { name: "TABLA DB", isSortable: true },
            { name: "TIPO DE AUDITORIA", isSortable: true },

            { name: "DETALLE", isSortable: true },
          ]}
          columnValues={[
            [
              "10/10/24",
              "productor@gmail.com",
              "REPERTORIO",
              "CAMBIO",
              "Editar",
            ],
            [
              "10/10/24",
              "productor@gmail.com",
              "REPERTORIO",
              "CAMBIO",
              "Editar",
            ],
            [
              "10/10/24",
              "productor@gmail.com",
              "REPERTORIO",
              "CAMBIO",
              "Editar",
            ],
            [
              "10/10/24",
              "productor@gmail.com",
              "REPERTORIO",
              "CAMBIO",
              "Editar",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;

/*

 { name: "USUARIO ORIGINARIO", isSortable: true },
            { name: "USUARIO DESTINO", isSortable: true },

  "admin@gmail.com",
              "producer@gmail.com",
            */
