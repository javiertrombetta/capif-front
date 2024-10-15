import React from "react";
import Header from "@/commons/Header/Header";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomInput from "@/commons/CustomInput/CustomInput";

export default function page() {
  return (
    <CustomLayout>
      <Header title="Nueva Compañía" />

      <div className="w-[100%] flex justify-end mt-[1rem]">
        <CustomButton>Volver a la lista</CustomButton>
      </div>

      <div className="w-[100%] pr-[2rem] pl-[2rem] flex flex-col gap-[1.5rem]  mb-[3rem]">
        <CustomInput className="w-[20rem]" label="ID" type="text" />
        <CustomInput className="w-[20rem]" label="NOMBRE" type="text" />
        <CustomInput className="w-[20rem]" label="CUIT" type="text" />
        <CustomInput className="w-[20rem]" label="BMAT ID" type="text" />
        <CustomInput className="w-[20rem]" label="REPERTORIO ID" type="text" />
        <CustomInput
          className="w-[20rem]"
          label="TITULAR DERECHOS DEFECTO"
          type="text"
        />
        <CustomInput
          className="w-[20rem]"
          label="AGENTE DE COBRO DEFECTO"
          type="text"
        />
        <CustomInput
          className="w-[20rem]"
          label="ACCESO A FONOGRAMAS"
          type="text"
        />
        <CustomInput className="w-[20rem]" label="VERIFICADO" type="text" />
        <CustomButton>Grabar</CustomButton>
      </div>
    </CustomLayout>
  );
}
