"use client";
import React, { FC } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { IoClose } from "react-icons/io5";
import { useParams } from "next/navigation";
import { acceptApplication } from "@/services/auth";

const AcceptApplication: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const id_usuario = useParams().id;

  const handleSubmit = async () => {
    if (!Array.isArray(id_usuario)) {
      try {
        await acceptApplication(id_usuario);
        alert("La solicitud fue aceptada correctamente");
        onCloseModal();
      } catch (error) {
        console.error("Error al aceptar la solicitud:", error);
      }
    }
  };

  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>
      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        ¿Estás seguro que quieres aceptar esta solicitud?
      </p>
      <CustomButton onClick={handleSubmit}>Aceptar</CustomButton>
      <CustomButton onClick={onCloseModal}>Cancelar</CustomButton>
    </div>
  );
};

export default AcceptApplication;
