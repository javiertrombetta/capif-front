import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import React, { FC } from "react";
import { IoClose } from "react-icons/io5";

const SearchConflictsFilters: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const userData = useAppSelector((state) => state.user);

  return (
    <div
      className={`relative bg-white ${
        userData.rol === ROLES.SUPER_ADMIN || userData.rol === ROLES.CAPIF_ADMIN
          ? "h-[27rem] w-[25rem]"
          : "h-[20rem] w-[30rem]"
      } mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center`}
    >
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col justify-center items-center gap-[0.7rem]">
        <CustomInput className="w-[13.5rem]" type="text" label="FONOGRAMA" />
        <CustomInput className="w-[13.5rem]" type="date" label="FECHA" />
        {userData.rol === ROLES.SUPER_ADMIN ||
        userData.rol === ROLES.CAPIF_ADMIN ? (
          <>
            <CustomInput
              className="w-[13.5rem]"
              type="text"
              label="PRODUCTORA"
            />
            <CustomInput className="w-[13.5rem]" type="text" label="USUARIO" />
          </>
        ) : null}
        <select className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2.1rem] text-black mt-[1rem]">
          <option>PRIMERA INSTANCIA</option>
          <option>PRIMERA PRORROGA</option>
          <option>SEGUNDA INSTANCIA</option>
          <option>SEGUNDA PRORROGA</option>
          <option>PRIMERA PRESENTACIÓN</option>
          <option>SEGUNDA PRESENTACIÓN</option>
          <option>FINALIZADO - VENCIDO</option>
          <option>FINALIZADO - ACEPTADO</option>
          <option>FINALIZADO - RECHAZADO</option>
        </select>
        <CustomButton className="mt-[1rem]">Buscar</CustomButton>
      </div>
    </div>
  );
};

export default SearchConflictsFilters;
