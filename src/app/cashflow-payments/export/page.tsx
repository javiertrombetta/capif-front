"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import React from "react";

export default function page() {
  return (
    <CustomLayout>
      <Header back title="Exportar Pagos" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-end items-center mt-[2rem]">
        <CustomButton>Descargar</CustomButton>
      </div>

      <div className="mt-[2rem] w-[100%]">
        <CustomTable
          columnNames={[
            { name: "FECHA", isSortable: true },
            { name: "CUIT", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "CUENTA CORRIENTE", isSortable: true },
            { name: "PAGO", isSortable: true },
            { name: "RETENCIÓN", isSortable: false },
            { name: "CONCEPTO", isSortable: true },
          ]}
          columnValues={[
            [
              "22/08/24",
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "SI",
              "Pagado",
            ],
            [
              "22/08/24",
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "SI",
              "Pagado",
            ],
            [
              "22/08/24",
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "SI",
              "Pagado",
            ],
            [
              "22/08/24",
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "SI",
              "Pagado",
            ],
            [
              "22/08/24",
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "SI",
              "Pagado",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}
