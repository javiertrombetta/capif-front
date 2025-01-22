"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import React from "react";

export default function page() {
  return (
    <CustomLayout>
      <Header back title="Exportar Traspasos" />

      <div className="w-[100%] flex justify-end items-center mt-[2rem] pr-[1rem]">
        <CustomButton>Descargar</CustomButton>
      </div>

      <div className="w-[100%] mt-[3rem]">
        <CustomTable
          columnNames={[
            { name: "FECHA", isSortable: true },
            { name: "CUIT ORIGEN", isSortable: true },
            { name: "CUIT DESTINO", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "PORCENTAJE DE TRASPASO", isSortable: true },
            { name: "MONTO", isSortable: true },
            { name: "NUMERO DE LIQUIDACIÓN", isSortable: true },
          ]}
          columnValues={[
            [
              "05/04/24",
              "12-562856-95",
              "65-985624-52",
              "AR654987",
              "100%",
              "$1.500",
              "65321897",
            ],
            [
              "05/04/24",
              "12-562856-95",
              "65-985624-52",
              "-",
              "-",
              "$1.500",
              "65321897",
            ],
            [
              "05/04/24",
              "12-562856-95",
              "65-985624-52",
              "AR654987",
              "100%",
              "$1.500",
              "65321897",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}
