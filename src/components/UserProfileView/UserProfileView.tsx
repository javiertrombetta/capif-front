"use client";
import React, { FC, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { IoMdDownload } from "react-icons/io";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import "./UserProfileView.css";
import { useAppDispatch } from "@/hooks/storeHooks";

const UserProfileView: FC = () => {
  return (
    <CustomLayout>
      <Header back title="Ficha de Usuario" className="" />

      <div className="mt-[1rem] ml-[1rem]"></div>
      <RegisterTab />
    </CustomLayout>
  );
};

const RegisterTab: FC = () => {
  const [currentEntity, setCurrentEntity] = useState<"natural" | "legal">(
    "natural"
  );

  const handleCurrentEntity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEntity(e.target.name as "natural" | "legal");
  };

  return (
    <div className="text-black mt-[1rem] ml-[2rem] mr-[2rem] mb-[3rem]">
      <div className="flex gap-[2rem] mt-[2rem]">
        <div className="flex gap-[0.5rem]">
          <input
            onChange={handleCurrentEntity}
            name="natural"
            checked={currentEntity === "natural"}
            type="radio"
          />
          <h1 className="font-bold">PERSONA FÍSICA</h1>
        </div>

        {/* <div className="flex gap-[0.5rem]">
          <input
            onChange={handleCurrentEntity}
            name="legal"
            checked={currentEntity === "legal"}
            type="radio"
          />
          <h1 className="font-bold">PERSONA JURÍDICA</h1>
        </div> */}
      </div>

      <EntityForm entity={currentEntity} />
    </div>
  );
};

const EntityForm: FC<{ entity: "natural" | "legal" }> = ({ entity }) => {
  const dispatch = useAppDispatch();

  const handleRejectRegister = () => {
    dispatch(
      setModal({ type: ModalNames.REJECT_REGISTRATION, isActive: true })
    );
  };

  return (
    <div className="mt-[3rem] w-[100%]">
      <div className="flex w-[100%] gap-[2rem]">
        {/* <CustomInput
          initialValue="Hola"
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="ESTADO"
        /> */}
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="CUIT/CUIL"
          initialValue="20-12345678-8"
        />
      </div>

      {entity === "legal" && (
        <CustomInput
          containerClassName="w-[100%] mt-[1.5rem]"
          className="w-[100%]"
          type="text"
          label="RAZON SOCIAL"
        />
      )}

      {entity === "natural" ? (
        <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="NOMBRES Y APELLIDOS"
            initialValue="Javier Trombetta"
          />
        </div>
      ) : (
        <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
          <CustomInput
            containerClassName="w-[50%]"
            className="w-[100%]"
            type="text"
            label="APELLIDOS REPRESENTANTE LEGAL"
          />
          <CustomInput
            containerClassName="w-[50%]"
            className="w-[100%]"
            type="text"
            label="NOMBRES REPRESENTANTE LEGAL"
          />
        </div>
      )}
      {entity === "natural" ? (
        <CustomInput
          containerClassName="w-[100%] mt-[1.5rem]"
          className="w-[100%]"
          type="email"
          label="EMAIL"
          initialValue="javiertrombetta@gmail.com"
        />
      ) : (
        <CustomInput
          containerClassName="w-[100%] mt-[1.5rem]"
          className="w-[100%]"
          type="text"
          label="CUIT REPRESENTANTE LEGAL"
        />
      )}

      <CustomInput
        containerClassName="w-[100%] mt-[1.5rem]"
        className="w-[100%]"
        type="text"
        label="DENOMINACIÓN DEL SELLO Y SUBSELLOS (opcional)"
        initialValue="SONY MUSIC ENTERTAINMENT"
      />
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="CALLE"
          initialValue="San Martin"
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="number"
          label="NÚMERO"
          initialValue="67"
        />
      </div>

      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="DATOS ADICIONALES"
          initialValue="..."
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="CUIDAD"
          initialValue="La Plata"
        />
      </div>
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="text"
          label="LOCALIDAD"
          initialValue="City Bell"
        />
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="text"
          label="PROVINCIA"
          initialValue="Buenos Aires"
        />
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="text"
          label="CÓDIGO POSTAL"
          initialValue="B1049"
        />
      </div>
      <CustomInput
        containerClassName="w-[100%] mt-[1.5rem]"
        className="w-[100%]"
        type="text"
        label="TELÉFONO"
        initialValue="+54 11-1234567"
      />
      <CustomInput
        containerClassName="w-[100%] mt-[1.5rem]"
        className="w-[100%]"
        type="text"
        label="NACIONALIDAD"
        initialValue="Argentina"
      />
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="number"
          label="CBU (opcional)"
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="number"
          label="ALIAS (opcional)"
        />
      </div>

      <div className="w-[100%] flex justify-end mt-[3rem]">
        <CustomButton className="gap-[0.4rem]">
          <IoMdDownload />
          Descargar Archivo Ingresado
        </CustomButton>
      </div>

      {entity === "legal" && (
        <div className="mt-[1.5rem]">
          <p className="font-bold">
            CARGAR DOCUMENTO NACIONAL DE IDENTIDAD DEL REPRESENTANTE LEGAL
          </p>
          <input className="mt-[0.3rem]" type="file" />
        </div>
      )}

      <div className="mt-[2rem] w-[100%] h-[15rem] border-[#c5c5c5] border-[1px] rounded-[0.7rem] overflow-hidden">
        <CustomButton className="mt-[1rem] ml-[1rem]">
          Seleccione Archivos
        </CustomButton>

        <div className="w-[100%] h-[3rem] bg-[#EBF6E0] flex items-center justify-between pr-[1rem] pl-[1rem] mt-[1rem] shadow-sm shadow-black">
          <p className="text-mainblue">1-comprobante pago CAPIF.jpg</p>
          <p className="text-mainblue">Eliminar</p>
        </div>
      </div>

      <div className="mt-[5rem] flex gap-[1rem]">
        <CustomButton className="bg-[#008d4c]">
          Confirmar el Registro del Usuario
        </CustomButton>
        <CustomButton onClick={handleRejectRegister}>Rechazar</CustomButton>
        <CustomButton>Editar</CustomButton>
      </div>
    </div>
  );
};

export default UserProfileView;
