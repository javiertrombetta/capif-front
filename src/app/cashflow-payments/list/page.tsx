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
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-end mt-[2rem] gap-[1rem]">
        <CustomButton onClick={() => router.push("/cashflow-payments")}>
          Aceptar
        </CustomButton>
        <CustomButton background="warn">Cancelar</CustomButton>
      </div>
      <div className="w-[100%] mt-[2rem]">
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
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
