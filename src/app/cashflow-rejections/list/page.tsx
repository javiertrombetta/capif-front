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
            { name: "NRO. RECHAZO", isSortable: true },
            { name: "NRO. PAGO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "PRODUCTORA", isSortable: true },
            { name: "CUIT", isSortable: true },
            { name: "MONTO", isSortable: true },
            { name: "ESTADO", isSortable: true },
            { name: "MOTIVO", isSortable: true },
          ]}
          columnValues={[
            [
              "9823741",
              "6521849",
              "05/08/24",
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "PAGADO",
              "CBU inexistente",
            ],
            [
              "9823741",
              "6521849",
              "05/08/24",
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "REVERSADO",
              "CBU inexistente",
            ],
            [
              "9823741",
              "6521849",
              "05/08/24",
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "PAGADO",
              "CBU inexistente",
            ],
            [
              "9823741",
              "6521849",
              "05/08/24",
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "REVERSADO",
              "CBU inexistente",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
