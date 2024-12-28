"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomTable from "@/commons/CustomTable/CustomTable";
import CustomButton from "@/commons/CustomButton/CustomButton";

export default function page() {
  return (
    <CustomLayout>
      <Header back title="Exportar Rechazos" />
      <div className="w-[100%] mt-[2rem] flex justify-end pr-[2rem]">
        <CustomButton>Descargar</CustomButton>
      </div>
      <div className="mt-[2rem] w-[100%]">
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
