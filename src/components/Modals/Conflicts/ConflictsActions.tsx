import React, { FC, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import CustomButton from "@/commons/CustomButton/CustomButton";
import useModal from "@/hooks/useModal";
import { confirmPercentage } from "@/services/conflicts";

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
  idConflicto: string;
  idParticipacion: string;
  actualPercentage: number;
}> = ({ idConflicto, idParticipacion, actualPercentage }) => {
  const { closeModal } = useModal();
  const [confirmedPercentage, setConfirmedPercentage] =
    useState(actualPercentage);

  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value ? e.target.value : "0");

    if (inputValue <= 100) {
      setConfirmedPercentage(inputValue);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await confirmPercentage(
        idConflicto,
        idParticipacion,
        confirmedPercentage
      );
      toast.success(response.message);
    } catch (error) {
      toast.error(error as string);
    } finally {
      closeModal();
    }
  };

  return (
    <div
      className={
        "relative bg-white h-[16rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.3rem] text-center w-[90%]">
          ¿Estás seguro de que deseas confirmar el porcentaje?
        </p>

        <div className="w-[100%] flex flex-col justify-center">
          <div className={"w-[100%] container flex flex-col"}>
            <label style={{ color: "black" }} className="font-bold">
              Porcentaje
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={confirmedPercentage}
              onChange={handleChangePercentage}
              className={
                "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
              }
            />
            <div className="w-[100%] flex justify-center items-center h-[1rem]">
              {Number(confirmedPercentage) > 100 && (
                <p className="text-[#e74c3c] text-[0.9rem] w-[100%] mt-[0.5rem] text-center top-[100%]">
                  Estás excediendo el porcentaje disponible del fonograma.
                </p>
              )}
            </div>
          </div>
          <div className="w-[100%] flex flex-row justify-between">
            <CustomButton onClick={() => handleAccept()}>Aceptar</CustomButton>
            <CustomButton background="delete" onClick={closeModal}>
              Cancelar
            </CustomButton>
          </div>
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
const SendConflictDocumentation = () => {
  const { closeModal } = useModal();

  return (
    <div
      className={
        "relative bg-white h-[20rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
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

export { GrantExtension, ConfirmPercentage, SendConflictDocumentation, Desist };
