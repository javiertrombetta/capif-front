"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";

const CashflowRejectionsImportRejection: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const router = useRouter();

  const goToRoute = () => {
    router.push("/cashflow-rejections/list");
    onCloseModal();
  };
  return (
    <div
      className={
        "relative bg-white h-[20rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>
      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">Importar Rechazo</p>

        <button className="relative overflow-hidden p-[0.4rem] text-white cursor-pointer font-bold flex justify-center items-center bg-[#2ecc71] rounded-[0.3rem]">
          Seleccionar Archivo
          <input
            className="absolute opacity-0 cursor-pointer w-[100%] h-[100%]"
            type="file"
          />
        </button>
        <CustomButton onClick={goToRoute}>Aceptar</CustomButton>
      </div>
    </div>
  );
};
const CashflowRejectionsExportRejections: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  return (
    <div
      className={
        "relative bg-white h-[20rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>
      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">Exportar Rechazo</p>

        <CustomInput type="date" label="FECHA DESDE" className="w-[13rem]" />
        <CustomInput type="date" label="FECHA HASTA" className="w-[13rem]" />
        <CustomButton>Aceptar</CustomButton>
      </div>
    </div>
  );
};
const CashflowRejectionsReversePayment: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  return (
    <div
      className={
        "relative bg-white h-[20rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>
      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">Reversar Pago</p>
        <div className="flex gap-[2rem]">
          <CustomButton>SI</CustomButton>
          <CustomButton>NO</CustomButton>
        </div>
      </div>
    </div>
  );
};

export {
  CashflowRejectionsExportRejections,
  CashflowRejectionsImportRejection,
  CashflowRejectionsReversePayment,
};
