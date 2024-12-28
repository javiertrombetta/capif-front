"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomTable from "@/commons/CustomTable/CustomTable";
import CustomButton from "@/commons/CustomButton/CustomButton";

export default function page() {
  return (
    <CustomLayout>
      <Header back title="Exportar Liquidaciones" />

      <div className="w-[100%] mt-[2rem] flex justify-end">
        <CustomButton>Descargar</CustomButton>
      </div>

      <div className="mt-[2rem] w-[100%]">
        <CustomTable
          columnNames={[
            { name: "FECHA", isSortable: true },
            { name: "CUIT", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "PASADAS LIQUIDACIÓN", isSortable: true },
            { name: "NOMBRE FONOGRAMA", isSortable: true },
            { name: "ARTISTA", isSortable: true },
            { name: "SELLO", isSortable: true },
            { name: "CUENTA CORRIENTE", isSortable: true },
            { name: "CONCEPTO", isSortable: true },
            { name: "RETENCIÓN IVA", isSortable: false },
            { name: "TIPO", isSortable: true },
          ]}
          columnValues={[
            [
              "13/05/24",
              "15659665",
              "AR651654",
              "-",
              "Cae el Sol",
              "Airbag",
              "Sony Music",
              "98237423",
              "Pago",
              "SI",
              "-",
            ],
            [
              "13/05/24",
              "15659665",
              "AR651654",
              "-",
              "Cae el Sol",
              "Airbag",
              "Sony Music",
              "98237423",
              "Pago",
              "SI",
              "-",
            ],
            [
              "13/05/24",
              "15659665",
              "AR651654",
              "-",
              "Cae el Sol",
              "Airbag",
              "Sony Music",
              "98237423",
              "Pago",
              "SI",
              "-",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}
