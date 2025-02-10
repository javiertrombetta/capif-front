"use client";
import React, { FC } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { IoClose } from "react-icons/io5";

const AcceptApplication: FC<{
  onCloseModal: () => void;
  onAcceptModal: () => void;
}> = ({ onCloseModal, onAcceptModal }) => {
  const handleAccept = () => {
    onAcceptModal();
    onCloseModal();
  };

  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>
      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        ¿Estás seguro que quieres aceptar esta solicitud?
      </p>
      <CustomButton onClick={handleAccept}>Aceptar</CustomButton>
      <CustomButton onClick={onCloseModal}>Cancelar</CustomButton>
    </div>
  );
};

export default AcceptApplication;
