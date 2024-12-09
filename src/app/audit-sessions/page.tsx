"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomTable from "@/commons/CustomTable/CustomTable";

function page() {
  return (
    <CustomLayout>
      <Header back title="Sesiones Iniciadas" />

      <div className="w-[100%] flex items-end justify-between pr-[1rem] pl-[2rem] mt-[2rem]">
        <div className="flex gap-[2rem]">
          <CustomInput type="text" label="NOMBRE" />
          <CustomInput type="text" label="APELLIDO" />
          <CustomInput type="email" label="EMAIL" />
          <CustomInput type="date" label="FECHA" />
        </div>
        <CustomButton>Depurar</CustomButton>
      </div>

      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "FECHA INICIO", isSortable: true },
            { name: "FECHA FIN", isSortable: true },
            { name: "USUARIO", isSortable: true },
            { name: "IP ORIGEN", isSortable: true },
            { name: "NAVEGADOR", isSortable: true },
            { name: "DETALLE", isSortable: true },
          ]}
          columnValues={[
            [
              "24/08/24",
              "25/08/24",
              "producer@gmail.com",
              "192.659.762",
              "Chrome",
              "-",
            ],
            [
              "24/08/24",
              "25/08/24",
              "producer@gmail.com",
              "192.659.762",
              "Chrome",
              "-",
            ],
            [
              "24/08/24",
              "25/08/24",
              "producer@gmail.com",
              "192.659.762",
              "Chrome",
              "-",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
