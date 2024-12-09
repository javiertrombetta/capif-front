"use client";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import React from "react";

function page() {
  return (
    <CustomLayout>
      <Header back title="Historial de Estado de Cuenta" />

      <div className="w-[100%] flex flex-col items-center justify-center mt-[2rem]">
        <p className="text-black font-bold text-[1.3rem]">Sony Music</p>
        <p className="text-black font-bold text-[1.3rem]">$100.000</p>
        <p className="text-black font-bold text-[1.3rem]">9879230</p>
      </div>

      <div className="w-[100%] flex justify-between pr-[2rem] pl-[2rem] mt-[2rem]">
        <CustomInput type="text" label="BUSCAR" />
        <CustomInput className="w-[13rem]" type="date" label="DESDE" />
        <CustomInput className="w-[13rem]" type="date" label="HASTA" />
        <CustomInput type="text" label="ID DE TIPO" />
        <CustomInput type="text" label="ISRC" />
      </div>

      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "TIPO", isSortable: true },
            { name: "ID DE TIPO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "ISRC", isSortable: false },
            { name: "MONTO", isSortable: false },
          ]}
          columnValues={[
            ["LIQUIDACIÓN", "982302", "12/05/23", "FR092383", "$50.000"],
            ["LIQUIDACIÓN", "982302", "12/05/23", "FR092383", "$50.000"],
            ["LIQUIDACIÓN", "982302", "12/05/23", "FR092383", "$50.000"],
            ["LIQUIDACIÓN", "982302", "12/05/23", "FR092383", "$50.000"],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
