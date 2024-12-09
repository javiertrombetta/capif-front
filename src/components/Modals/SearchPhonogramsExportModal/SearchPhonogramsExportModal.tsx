import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import React, { FC } from "react";
import { IoCloseSharp } from "react-icons/io5";

const SearchPhonogramsExportModal: FC<{ onCloseModal: () => void }> = ({
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
        <p className="text-black font-bold text-[1.4rem]">
          Exportar Modificaciones
        </p>

        <CustomInput className="w-[13rem]" type="date" label="FECHA DESDE" />
        <CustomInput className="w-[13rem]" type="date" label="FECHA HASTA" />
        <CustomButton>Exportar</CustomButton>
      </div>
    </div>
  );
};

export default SearchPhonogramsExportModal;
