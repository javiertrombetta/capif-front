"use client";
import React from "react";
import Image from "next/image";
import gitLogo from "../../assets/GIT LOGO.png";
import { useRouter } from "next/navigation";
import "./forgot-password.css";
import "../../styles/globals.css";

export default function page() {
  const router = useRouter();

  const goBack = (): void => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center h-[100vh] background">
      <div className="flex flex-col gap-[1.3rem] justify-center items-center forgot-password-form">
        <Image
          className="w-[25rem]"
          height={2000}
          width={2000}
          alt="GIT CAPIF"
          src={gitLogo}
        />
        <div className="bg-white w-[25rem] pt-[1.3rem] pb-[1.3rem] flex flex-col items-center justify-center gap-[1rem]">
          <p className="text-customtext text-[1.1rem] text-center w-[90%]">
            Ingrese su cuenta de correo electrónico para blanquear su
            contraseña.
          </p>
          <div className="w-[100%] flex flex-col items-center">
            <label className="text-customtext text-start w-[90%]">
              Correo Electrónico
            </label>
            <input
              className={
                "custom-placeholder border-[#c8c8c8] border-[2px] w-[90%] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
              }
            />
          </div>

          <div className="flex border-[#c8c8c8] border-[2px] w-[90%] h-[5rem] gap-[1rem] items-center">
            <input
              type="checkbox"
              className="ml-[1rem] w-[2rem] h-[2rem] border-[2px] border-[#c8c8c8]"
            />
            <p className="text-customtext text-[1.1rem]">No soy un robot</p>
          </div>
          <button className="text-white bg-[#1280e1] h-[2.2rem] w-[90%]">
            Recuperar
          </button>
          <p onClick={goBack} className="text-[#1280e1] w-[90%] cursor-pointer">
            Volver
          </p>
        </div>
      </div>
    </div>
  );
}
