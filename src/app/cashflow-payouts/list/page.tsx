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
      <Header back title="Listado de Liquidaciones Importadas" />

      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-end mt-[2rem] gap-[1rem]">
        <CustomButton onClick={() => router.push("/cashflow-payouts")}>
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

export default page;
