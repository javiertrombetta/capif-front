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
      <Header back title="Lista de Pagos Importados" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-end mt-[2rem]">
        <CustomButton onClick={() => router.push("/cashflow-payments")}>
          Aceptar
        </CustomButton>
      </div>
      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "CUIT", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "CUENTA CORRIENTE", isSortable: true },
            { name: "PAGO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "RETENCIÓN", isSortable: false },
            { name: "CONCEPTO", isSortable: true },
          ]}
          columnValues={[
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
