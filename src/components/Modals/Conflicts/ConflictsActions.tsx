import React, { FC } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { IoCloseSharp } from "react-icons/io5";

const GrantExtension: FC<{
  onCloseModal: () => void;
  onGrantExtension: () => void;
}> = ({ onCloseModal, onGrantExtension }) => {
  const onAccept = () => {
    onGrantExtension();
    onCloseModal();
  };
  return (
    <div
      className={
        "relative bg-white h-[16rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.3rem] text-center w-[90%]">
          ¿Estás seguro de que deseas otorgar una prorroga?
        </p>

        <div className="flex gap-[3rem] w-[100%] justify-center">
          <CustomButton onClick={onAccept}>Aceptar</CustomButton>
          <CustomButton background="delete" onClick={onCloseModal}>
            Cancelar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

const ConfirmPercentage: FC<{
  onCloseModal: () => void;
  handleConfirmPercentage: () => void;
}> = ({ onCloseModal, handleConfirmPercentage }) => {
  const handleAccept = async () => {
    await handleConfirmPercentage();
    onCloseModal();
  };
  return (
    <div
      className={
        "relative bg-white h-[16rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.3rem] text-center w-[90%]">
          ¿Estás seguro de que deseas confirmar el porcentaje?
        </p>

        <div className="flex gap-[3rem] w-[100%] justify-center">
          <CustomButton onClick={handleAccept}>Aceptar</CustomButton>
          <CustomButton background="delete" onClick={onCloseModal}>
            Cancelar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

const Desist: FC<{
  onCloseModal: () => void;
  onDesistConflict: () => void;
}> = ({ onCloseModal, onDesistConflict }) => {
  const onAccept = () => {
    onDesistConflict();
    onCloseModal();
  };

  return (
    <div
      className={
        "relative bg-white h-[16rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.3rem] text-center w-[90%]">
          ¿Estás seguro de que deseas desistir el conflicto?
        </p>

        <div className="flex gap-[3rem] w-[100%] justify-center">
          <CustomButton onClick={onAccept}>Aceptar</CustomButton>
          <CustomButton background="delete" onClick={onCloseModal}>
            Cancelar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
const SendDocumentation: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  // const router = useRouter();

  // const goToRoute = () => {
  //   router.push("/cashflow-payments/list");
  //   onCloseModal();
  // };

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
        <p className="text-black font-bold text-[1.4rem]">
          Enviar Documentación
        </p>

        <button className="relative overflow-hidden p-[0.4rem] text-white cursor-pointer font-bold flex justify-center items-center bg-[#2ecc71] rounded-[0.3rem]">
          Seleccionar Archivo
          <input
            className="absolute opacity-0 cursor-pointer w-[100%] h-[100%]"
            type="file"
          />
        </button>
        <CustomButton>Aceptar</CustomButton>
      </div>
    </div>
  );
};

export { GrantExtension, ConfirmPercentage, SendDocumentation, Desist };
