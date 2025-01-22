import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React from "react";

export default function page() {
  return (
    <CustomLayout>
      <Header back title="Editar Productora" />
      <div className="w-[100%] flex justify-center mt-[2rem]">
        <div className="w-[70%] pr-[2rem] pl-[2rem] flex flex-col gap-[1rem] justify-center items-center">
          <div className="w-[100%] flex justify-center gap-[1rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="email"
              label="EMAIL"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="CUIT"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="RAZON SOCIAL"
            />
          </div>
          <div className="w-[100%] flex justify-center gap-[1rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="TELÉFONO"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="SELLO"
            />
          </div>
          <div className="w-[100%] flex justify-center gap-[1rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="date"
              label="FECHA CREACIÓN"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="date"
              label="FECHA ACTUALIZACIÓN"
            />
          </div>
          <div className="w-[100%] flex justify-center gap-[1rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ISRC AUDIO"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ISRC VIDEO"
            />
          </div>

          <div className="w-[100%] flex justify-center">
            <CustomButton className="w-full">Guardar</CustomButton>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
}
