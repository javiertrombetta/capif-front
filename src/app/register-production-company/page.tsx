"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import React, { FC, useState } from "react";

function page() {
  const [currentEntity, setCurrentEntity] = useState<"natural" | "legal">(
    "natural"
  );
  const handleCurrentEntity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEntity(e.target.name as "natural" | "legal");
  };
  return (
    <CustomLayout>
      <Header back title="Completar Registro" />

      <div className="pr-[2rem] pl-[2rem] w-[100%]">
        <div className="w-[100%] mt-[2rem] flex gap-[0.5rem]">
          <p className="text-black text-[1.2rem]">Estado de Solicitud:</p>

          <p
            style={{ color: "#f1c40f" }}
            className="font-bold text-black text-[1.2rem]"
          >
            PENDIENTE
          </p>
          {/* <p
           style={{ color: "#2ecc71" }}
          className="font-bold text-black text-[1.2rem]">
            APROBADO
          </p>
          <p
           style={{ color: "#e74c3c" }}
          className="font-bold text-black text-[1.2rem]">
            RECHAZADO
          </p> */}
        </div>

        <div className="w-[100%] flex flex-col justify-start mt-[2rem]">
          <p className="text-black font-bold text-[1.3rem]">
            Datos del Usuario Principal
          </p>

          <div className="flex flex w-[100%] gap-[2rem] mt-[1.5rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="NOMBRES"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="APELLIDOS"
            />
          </div>
          <div className="flex flex w-[100%] gap-[2rem] mt-[1.5rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="TELÉFONO"
            />
          </div>
        </div>

        <div className="flex gap-[2rem] mt-[2rem]">
          <div className="flex gap-[0.5rem]">
            <input
              onChange={handleCurrentEntity}
              name="natural"
              checked={currentEntity === "natural"}
              type="radio"
            />
            <h1 className="font-bold text-black">PERSONA FÍSICA</h1>
          </div>

          <div className="flex gap-[0.5rem]">
            <input
              onChange={handleCurrentEntity}
              name="legal"
              checked={currentEntity === "legal"}
              type="radio"
            />
            <h1 className="font-bold text-black">PERSONA JURÍDICA</h1>
          </div>
        </div>
        <EntityForm entity={currentEntity} />
      </div>
    </CustomLayout>
  );
}

export default page;

const EntityForm: FC<{ entity: "natural" | "legal" }> = ({ entity }) => {
  const dispatch = useAppDispatch();

  const handleRejectRegister = () => {
    dispatch(
      setModal({ type: ModalNames.REJECT_REGISTRATION, isActive: true })
    );
  };

  return (
    <div className="mt-[3rem] w-[100%]">
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="CUIT/CUIL"
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
            label="NOMBRES"
          />
          <CustomInput
            containerClassName="w-[100%]"
            className="w-[100%]"
            type="text"
            label="APELLIDOS"
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
      />
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="CALLE"
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="number"
          label="NÚMERO"
        />
      </div>

      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="DATOS ADICIONALES"
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="CUIDAD"
        />
      </div>
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="text"
          label="LOCALIDAD"
        />
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="text"
          label="PROVINCIA"
        />
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="number"
          label="CÓDIGO POSTAL"
        />
      </div>
      <CustomInput
        containerClassName="w-[100%] mt-[1.5rem]"
        className="w-[100%]"
        type="number"
        label="TELÉFONO"
      />
      <CustomInput
        containerClassName="w-[100%] mt-[1.5rem]"
        className="w-[100%]"
        type="text"
        label="NACIONALIDAD"
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

      <div className="mt-[1.5rem]">
        <p className="font-bold text-black">
          {entity === "natural"
            ? "CARGAR DOCUMENTO NACIONAL DE IDENTIDAD"
            : "CARGAR ESTATUTO O CONTRATO SOCIAL"}
        </p>
        <input className="mt-[0.3rem]" type="file" />
      </div>

      {entity === "legal" && (
        <div className="mt-[1.5rem]">
          <p className="font-bold text-black">
            CARGAR DOCUMENTO NACIONAL DE IDENTIDAD DEL REPRESENTANTE LEGAL
          </p>
          <input className="mt-[0.3rem]" type="file" />
        </div>
      )}

      {/* <div className="w-[100%] flex justify-end">
        <CustomButton className="gap-[0.4rem]">
          <IoMdDownload />
          Descargar Archivo Ingresado
        </CustomButton>
      </div> */}
      <div>
        <p className="font-bold text-black mt-[2rem]">
          OTROS Documento Adicionales (Cargue aquí su comprobante de pago de
          alta de ISRC)
        </p>
        <p className="font-bold text-black">
          Para obtener el código de productor, el titular deberá abonar la suma
          de $ 10.000. El pago se realiza por el alta a la siguiente cuenta
          bancaria:
        </p>
        <p className="font-bold text-black">BANCO GALICIA</p>
        <p className="font-bold text-black">SUCURSAL 5</p>
        <p className="font-bold text-black">CUIT: 30-52172973-9</p>
        <p className="font-bold text-black">N°: 9750252-4 005-6</p>
        <p className="font-bold text-black">CBU: 0070005430009750252469</p>
      </div>

      <div className="mt-[2rem] w-[100%] h-[15rem] border-[#c5c5c5] border-[1px] rounded-[0.7rem] overflow-hidden">
        <CustomButton className="mt-[1rem] ml-[1rem]">
          Seleccione Archivos
        </CustomButton>

        <div className="w-[100%] h-[3rem] bg-[#EBF6E0] flex items-center justify-between pr-[1rem] pl-[1rem] mt-[1rem] shadow-sm shadow-black">
          <p className="text-mainblue">1-comprobante pago CAPIF.jpg</p>
          <p className="text-mainblue">Eliminar</p>
        </div>
      </div>

      <div className="mt-[5rem] flex gap-[1rem] ">
        <CustomButton className="bg-[#008d4c]">Aceptar</CustomButton>
        <CustomButton onClick={handleRejectRegister}>Cancelar</CustomButton>
      </div>
    </div>
  );
};
