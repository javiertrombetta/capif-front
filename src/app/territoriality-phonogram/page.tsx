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
      <div className="w-[100%] flex justify-center items-start gap-[5rem]">
        <div className=" mt-[1rem] flex flex-col justify-center items-center">
          <p className="text-black font-bold text-[1.2rem]">Productora:</p>
          <p className="text-black mt-[0.6rem]">Sony Music</p>
          <p className="text-black">sonymusic@gmail.com</p>
          <p className="text-black">12-932871-02</p>
          <p className="text-black">+54 11234689</p>
        </div>
        <div className=" mt-[1rem] flex flex-col justify-center items-center">
          <p className="text-black font-bold text-[1.2rem]">Fonograma:</p>
          <p className="text-black mt-[0.6rem]">Cae el Sol</p>
          <p className="text-black">Airbag</p>
          <p className="text-black">AR12315</p>
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
