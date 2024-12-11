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
      <Header back title="Editar Territorialidad" />
      <div className="w-[100%] mt-[1rem] flex flex-col justify-center items-center">
        <p className="mb-[1rem] font-bold text-[1.2rem] text-black w-[100%] text-center pl-[2rem]">
          PRODUCTORA:
        </p>
        <div className="w-[60%]">
          <CustomTable
            columnNames={[
              { name: "NOMBRE", isSortable: false },
              { name: "EMAIL", isSortable: false },
              { name: "CUIT", isSortable: false },
              { name: "TELÉFONO", isSortable: false },
            ]}
            columnValues={[
              [
                "Sony Music",
                "sonymusic@gmail.com",
                "12-932871-02",
                "+54 11234689",
              ],
            ]}
          />
        </div>
      </div>

      <div className="w-[100%] mt-[1rem] flex flex-col justify-center items-center">
        <p className="mb-[1rem] font-bold text-[1.2rem] text-black w-[100%] text-center pl-[2rem]">
          FONOGRAMA:
        </p>
        <div className="w-[60%]">
          <CustomTable
            columnNames={[
              { name: "Nombre Fonograma", isSortable: false },
              { name: "Artista", isSortable: false },
              { name: "Año de Lanzamiento", isSortable: false },
              { name: "ISRC", isSortable: false },
              { name: "Total Acumulado", isSortable: false },
            ]}
            columnValues={[
              ["Cae el Sol", "Airbag", "2011", "SEBGA2100115", "100%"],
            ]}
          />
        </div>
      </div>

      <div className="w-[100%] pr-[2rem] pl-[2rem] justify-between flex mt-[1rem]">
        <CustomInput type="text" label="Buscar Países" />

        <div className="flex gap-[1.5rem]">
          <CustomButton>Guardar</CustomButton>
        </div>
      </div>

      <CustomTable
        columnNames={[
          { name: "", isSortable: false, selectBox: true },
          { name: "PAÍS", isSortable: true },
          { name: "ISO", isSortable: true },
        ]}
        columnValues={[
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Paraguay",
            "PY",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Uruguay",
            "UY",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Brasil",
            "BR",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Guatemala",
            "GT",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Costa Rica",
            "CR",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "El Salvador",
            "SV",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Panamá",
            "PA",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "República Dominicana",
            "DO",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "España",
            "ES",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "India",
            "IN",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Italia",
            "IT",
          ],
          [
            <input
              type="checkbox"
              defaultChecked
              className="w-[1rem] h-[1rem]"
            />,
            "Ucrania",
            "UA",
          ],
        ]}
      />
    </CustomLayout>
  );
}

export default page;
