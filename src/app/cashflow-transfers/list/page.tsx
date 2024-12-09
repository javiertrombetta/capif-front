"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();
  return (
    <CustomLayout>
      <Header back title="Listado de Traspasos Importados" />

      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-end mt-[2rem]">
        <CustomButton onClick={() => router.push("/cashflow-transfers")}>
          Aceptar
        </CustomButton>
      </div>
      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "CUIT ORIGEN", isSortable: true },
            { name: "CUIT DESTINO", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "PORCENTAJE DE TRASPASO", isSortable: true },
            { name: "MONTO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "NUMERO DE LIQUIDACIÓN", isSortable: true },
          ]}
          columnValues={[
            [
              "12-562856-95",
              "65-985624-52",
              "AR654987",
              "100%",
              "$1.500",
              "05/04/24",
              "65321897",
            ],
            [
              "12-562856-95",
              "65-985624-52",
              "-",
              "-",
              "$1.500",
              "05/04/24",
              "65321897",
            ],
            [
              "12-562856-95",
              "65-985624-52",
              "AR654987",
              "100%",
              "$1.500",
              "05/04/24",
              "65321897",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
