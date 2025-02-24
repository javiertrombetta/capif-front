"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

function page() {
  return (
    <CustomLayout>
      <Header title="Resumen de Cuenta" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] mt-[2rem]">
        <CustomInput type="text" label="Buscar Productora" />
      </div>
      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "PRODUCTORA", isSortable: true },
            { name: "CUIT", isSortable: true },
            { name: "CUENTA CORRIENTE", isSortable: true },
            { name: "SALDO", isSortable: true },
            { name: "ACCIÓN", isSortable: false },
          ]}
          columnValues={[
            ["Sony Music", "10947124", "156234899", "$800.000"],
            ["Warner", "10947124", "156234899", "$400.000"],
            ["Universal Records", "10947124", "156234899", "$900.000"],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
