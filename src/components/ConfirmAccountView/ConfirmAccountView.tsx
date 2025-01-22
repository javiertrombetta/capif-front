"use client";
import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmAccount = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] background">
      <div className="scale-[0.7] w-[45rem] h-[27rem] bg-[white] rounded-[2rem] flex flex-col items-center justify-center gap-[1rem] p-[1rem]">
        <FaCheckCircle color="#1280e1" size={80} />
        <h2 className="text-black font-bold text-[3rem]">
          ¡Confirmación exitosa!
        </h2>
        <p className="text-black text-[2rem] text-center">
          Ya podes iniciar sesión con tu Email y Contraseña.
        </p>
        <div className="w-[100%] flex justify-end mr-[1rem]">
          <Link href={"/login"}>
            <p className="text-mainblue text-[1.3rem]">Iniciar Sesión</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;
