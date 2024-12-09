import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";

const CashflowPaymentsImportPayment: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const router = useRouter();

  const goToRoute = () => {
    router.push("/cashflow-payments/list");
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
        <p className="text-black font-bold text-[1.4rem]">Importar Pago</p>

        <select className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
          <option className="text-black" value={"fonograma_nuevo"}>
            CON IMPUTACIÓN
          </option>
          <option className="text-black" value={"fonograma_existente"}>
            SIN IMPUTACIÓN
          </option>
        </select>

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

const CashflowPaymentsExportPayments: FC<{ onCloseModal: () => void }> = ({
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
        <p className="text-black font-bold text-[1.4rem]">Exportar Pagos</p>

        <CustomInput type="date" label="FECHA DESDE" className="w-[13rem]" />
        <CustomInput type="date" label="FECHA HASTA" className="w-[13rem]" />
        <CustomButton>Aceptar</CustomButton>
      </div>
    </div>
  );
};

export { CashflowPaymentsImportPayment, CashflowPaymentsExportPayments };
