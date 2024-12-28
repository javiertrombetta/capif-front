import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import React, { FC, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
const TitularityPhonogramEdit: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const [percentage, setPercentage] = useState<string>("30");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const regex = /^(100|[0-9]{1,2})$/;

    if (regex.test(inputValue) || inputValue === "") {
      setPercentage(inputValue);
    }
  };

  return (
    <div
      className={
        "relative bg-white h-[24rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[1rem] justify-center">
        <p className="text-black font-bold text-[1.3rem] text-center w-[90%]">
          Editar Titular
        </p>
        <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem] relative">
          <CustomInput className="w-[20rem]" type="date" label="DESDE" />
          <CustomInput className="w-[20rem]" type="date" label="HASTA" />
          <div className={"w-[20rem] container flex flex-col"}>
            <label style={{ color: "black" }} className="font-bold">
              Porcentaje
            </label>
            <div
              onClick={handleDivClick}
              className={
                "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black] relative overflow-hidden"
              }
            >
              <input
                ref={inputRef}
                type="text"
                value={percentage}
                onChange={handleChangePercentage}
                maxLength={3}
                placeholder="0"
                className="w-[14.9%] h-[100%] pl-1 rounded text-black ring-0 outline-0 focus-ring-0"
              />
              <span className="absolute left-[17.4%] top-[50%] transform -translate-y-1/2 text-gray-500 ">
                %
              </span>
            </div>
          </div>
          {Number(percentage) >= 31 && (
            <p className="text-[#e74c3c] text-[0.8rem] absolute w-[20rem] mt-[0.5rem] text-center top-[100%]">
              Estás excediendo el porcentaje disponible del fonograma.
            </p>
          )}
        </div>

        <div className="flex gap-[3rem] w-[100%] mt-[1.5em] justify-center">
          <CustomButton>Aceptar</CustomButton>
          <CustomButton background="delete" onClick={onCloseModal}>
            Cancelar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

const TitularityPhonogramRemove: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
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
          ¿Estás seguro de que deseas quitar este titular del fonograma?
        </p>

        <div className="flex gap-[3rem] w-[100%] justify-center">
          <CustomButton background="delete">Quitar</CustomButton>
          <CustomButton onClick={onCloseModal}>Cancelar</CustomButton>
        </div>
      </div>
    </div>
  );
};

export { TitularityPhonogramEdit, TitularityPhonogramRemove };
