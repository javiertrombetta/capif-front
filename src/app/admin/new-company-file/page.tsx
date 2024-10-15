import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React from "react";

export default function page() {
  return (
    <CustomLayout>
      <Header title="Nueva Compañía Archivo" />

      <div className="w-[100%] flex justify-end mt-[1rem]">
        <CustomButton>Volver a la lista</CustomButton>
      </div>

      <div className="w-[100%] pl-[2rem] pr-[2rem] flex flex-col gap-[2rem]">
        <CustomInput type="text" label="TIPO" />

        <div>
          <p className="font-bold text-black">ARCHIVO</p>
          <input type="file" />
        </div>

        <CustomButton>Grabar</CustomButton>
      </div>
    </CustomLayout>
  );
}
