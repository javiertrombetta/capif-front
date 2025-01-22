import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import React, { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
const FirstInstance: FC<{ onCloseModal: () => void }> = ({ onCloseModal }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setModal({ isActive: false, type: null }));
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

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[3rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">Primera Instancia</p>
        <div>
          <p className="text-black font-bold">Descargo</p>
          <textarea
            className={
              "padding-left w-[20rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] min-h-[2rem] max-h-[6rem] text-black"
            }
          />
        </div>

        <div className="flex gap-[0.5rem]">
          <CustomButton>Enviar Descargo</CustomButton>
          <CustomButton onClick={handleClose}>Desistir</CustomButton>
        </div>
      </div>
    </div>
  );
};
const SecondInstance: FC<{ onCloseModal: () => void }> = ({ onCloseModal }) => {
  // const handleClose = () => {
  //   dispatch(setModal({ isActive: false, type: null }));
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
        <p className="text-black font-bold text-[1.4rem]">Segunda Instancia</p>

        <input type="file" />

        <CustomButton>Enviar Documentación</CustomButton>
      </div>
    </div>
  );
};
const Revision: FC<{ onCloseModal: () => void }> = ({ onCloseModal }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setModal({ isActive: false, type: null }));
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

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[3rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">Revisión</p>

        <div>
          <p className="text-black font-bold">Descargo</p>
          <textarea
            className={
              "padding-left w-[20rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] min-h-[2rem] max-h-[6rem] text-black"
            }
          />
        </div>

        <div className="flex gap-[0.5rem]">
          <CustomButton>Resuelto</CustomButton>
          <CustomButton onClick={handleClose}>No Resuelto</CustomButton>
        </div>
      </div>
    </div>
  );
};

const Definition: FC<{ onCloseModal: () => void }> = ({ onCloseModal }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setModal({ isActive: false, type: null }));
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

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[3rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">Definición</p>
        <CustomInput type="text" className="w-[16rem]" label="Descargo" />

        <div className="flex gap-[0.5rem]">
          <CustomButton>Resuelto</CustomButton>
          <CustomButton onClick={handleClose}>Rechazado</CustomButton>
        </div>
      </div>
    </div>
  );
};

export { FirstInstance, SecondInstance, Revision, Definition };
