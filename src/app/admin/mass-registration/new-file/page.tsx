import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React from "react";

export default function page() {
  return (
    <CustomLayout>
      <Header title="Nuevo Archivo Alta Masiva" />

      <div className="w-[100%] flex justify-end mt-[1rem]">
        <CustomButton>Volver a la lista</CustomButton>
      </div>

      <div className="flex flex-col gap-[1.5rem] pr-[2rem] pl-[2rem]">
        <CustomInput label="FECHA" type="text" />
        <CustomInput label="TIPO" type="text" />
        <div>
          <p className="font-bold text-black">ARCHIVO</p>
          <input type="file" />
        </div>
        <CustomButton>Grabar</CustomButton>
      </div>
    </CustomLayout>
  );
}
