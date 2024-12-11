"use client";
import React from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  return (
    <CustomLayout>
      <Header back title="Editar Usuario" />
      <div className="flex justify-end mr-[1rem] mt-[1rem]">
        <button
          onClick={() => router.push("/records")}
          className="flex items-center justify-center bg-mainblue w-fit h-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]"
        >
          Volver a la lista
        </button>
      </div>
      <div className="ml-[3rem] mt-[2rem] w-[30rem] flex flex-col gap-[1.5rem]">
        <div className="w-[100%] gap-[0.5rem] flex flex-col">
          <p className="font-bold text-black">EMAIL</p>
          <div className="flex w-[106%] relative">
            <CustomInput className="w-[100%]" type="email" />
            <button className="ml-[1rem] right-[0] absolute flex items-center justify-center bg-mainblue w-[2rem] h-[2rem] rounded-[0.2rem]">
              <MdEdit size={19} />
            </button>
          </div>
        </div>

        <div className="w-[100%] gap-[0.5rem] flex flex-col">
          <p className="font-bold text-black">ROL</p>
          <select className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
            <option>Administrador</option>
            <option>Productor</option>
          </select>
        </div>

        <div className="w-[100%] gap-[0.5rem] flex flex-col">
          <p className="font-bold text-black">ESTADO</p>
          <select
            disabled
            className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
          >
            <option>Confirmado</option>
            <option>Nuevo</option>
            <option>Registrado</option>
          </select>
        </div>

        <div className="w-[100%] gap-[0.5rem] flex flex-col">
          <p className="font-bold text-black">CONTRASEÑA</p>
          <CustomInput className="w-[100%]" type="password" />
        </div>

        <div className="w-[100%] gap-[0.5rem] flex flex-col">
          <p className="font-bold text-black">REPETIR CONTRASEÑA</p>
          <CustomInput className="w-[100%]" type="password" />
        </div>

        <div className="w-[100%] gap-[0.5rem] flex flex-col">
          <p className="font-bold text-black">BLOQUEADO</p>
          <select className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
            <option>NO</option>
            <option>SI</option>
          </select>
        </div>

        <div className="flex gap-[2rem]">
          <button className="flex items-center justify-center bg-mainblue w-fit h-[2rem] mt-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]">
            Aceptar
          </button>

          <button className="flex items-center justify-center bg-mainblue w-fit h-[2rem] mt-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]">
            Cancelar
          </button>
        </div>
      </div>
    </CustomLayout>
  );
}
