"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import React from "react";
import { FaSearch } from "react-icons/fa";

function page() {
  return (
    <CustomLayout>
      <Header back title="Historial de Estado de Cuenta" />
      <div className="w-[100%] flex justify-center">
        <div className="w-[100%] flex flex-col justify-between pr-[2rem] pl-[2rem] mt-[2rem]">
          <div className="w-[100%] flex justify-center gap-[1rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="BUSCAR"
            />

            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ID DE TIPO"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ISRC"
            />
          </div>
          <div className="w-[100%] flex justify-center gap-[1rem] mt-[1rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="date"
              label="DESDE"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="date"
              label="HASTA"
            />
          </div>

          <div className="w-[100%] mt-[1rem]">
            <CustomButton className="w-full h-[2.5rem] pt-[1.2rem] pb-[1.2rem] text-[1rem] font-bold gap-[0.3rem]">
              <FaSearch />
              Buscar
            </CustomButton>
          </div>
        </div>
      </div>
      <div className="w-[100%] mt-[2rem] flex flex-col justify-center items-center">
        <p className="w-[100%] mb-[1rem] font-bold text-[1.2rem] text-black w-[100%] text-start pl-[2rem]">
          PRODUCTORA:
        </p>
        <div className="w-[100%]">
          <CustomTable
            columnNames={[
              { name: "NOMBRE", isSortable: false },
              { name: "EMAIL", isSortable: false },
              { name: "MONTO", isSortable: false },
              { name: "CUIT", isSortable: false },
              { name: "TELÉFONO", isSortable: false },
            ]}
            columnValues={[
              [
                "Sony Music",
                "sonymusic@gmail.com",
                "$100.000",
                "12-932871-02",
                "+54 11234689",
              ],
            ]}
          />
        </div>
      </div>

      <div className="w-[100%] mt-[2rem] flex flex-col justify-center items-center">
        <p className="w-[100%] mb-[1rem] font-bold text-[1.2rem] text-black w-[100%] text-start pl-[2rem]">
          MOVIMIENTOS:
        </p>
        <div className="w-[100%]">
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
      </div>
    </CustomLayout>
  );
}

export default page;
