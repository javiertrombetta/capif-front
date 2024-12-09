"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { useRouter } from "next/navigation";
import CustomTable from "@/commons/CustomTable/CustomTable";

function page() {
  const router = useRouter();

  return (
    <CustomLayout>
      <Header back title="Lista de Rechazos Importados" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-end mt-[2rem]">
        <CustomButton onClick={() => router.push("/cashflow-rejections")}>
          Aceptar
        </CustomButton>
      </div>
      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "CUIT", isSortable: true },
            { name: "MONTO", isSortable: true },
            { name: "NUMERO DE PAGO", isSortable: true },
            { name: "MOTIVO", isSortable: true },
            { name: "FECHA DE REVISIÓN", isSortable: true },
          ]}
          columnValues={[
            [
              "20-123123-03",
              "$1.500",
              "12649533",
              "CBU inexistente",
              "02/05/24",
            ],
            [
              "20-123123-03",
              "$1.500",
              "12649533",
              "CBU inexistente",
              "02/05/24",
            ],
            [
              "20-123123-03",
              "$1.500",
              "12649533",
              "CBU inexistente",
              "02/05/24",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
