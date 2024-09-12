import React from "react";
import Image from "next/image";
import gitLogo from "../../assets/GIT LOGO.png";
import Link from "next/link";
import "../../styles/globals.css";
import "./signup.css";

export default function page() {
  return (
    <div className="flex justify-center items-center h-[100vh] background">
      <div className="flex flex-col gap-[1.3rem] justify-center items-center signup-form">
        <Image
          className="w-[25rem]"
          height={2000}
          width={2000}
          alt="GIT CAPIF"
          src={gitLogo}
        />
        <div className="bg-white w-[25rem] pt-[1rem] pb-[1rem] flex flex-col items-center justify-center gap-[1rem]">
          <p className="text-customtext text-[1.1rem] text-center w-[90%]">
            Complete el formulario para registrarse
          </p>
          <div className="w-[100%] flex flex-col items-center">
            <label className="text-customtext text-start w-[90%]">
              Correo Electrónico
            </label>
            <input
              className={
                "border-[#c8c8c8] border-[2px] w-[90%] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
              }
            />
          </div>
          <div className="w-[100%] flex flex-col items-center">
            <label className="text-customtext text-start w-[90%]">
              Nombre Completo
            </label>
            <input
              className={
                "border-[#c8c8c8] border-[2px] w-[90%] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
              }
            />
          </div>

          <div className="w-[100%] flex flex-col items-center">
            <label className="text-customtext text-start w-[90%]">
              Contraseña
            </label>
            <input
              className={
                "border-[#c8c8c8] border-[2px] w-[90%] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
              }
            />
          </div>

          <div className="w-[100%] flex flex-col items-center">
            <label className="text-customtext text-start w-[90%]">
              Re-Ingrese Contraseña
            </label>
            <input
              className={
                "border-[#c8c8c8] border-[2px] w-[90%] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
              }
            />
          </div>

          <div className="w-[90%] flex gap-[0.4rem] items-center">
            <input
              type="checkbox"
              className="w-[1.7rem] h-[1.7rem] border-[2px] border-[#c8c8c8]"
            />
            <p className="text-[#1280e1] text-[0.8rem] mt-[1rem]">
              Leí y acepto los términos y condiciones y las políticas de
              privacidad de datos
            </p>
          </div>
          <div className="flex border-[#c8c8c8] border-[2px] w-[90%] h-[5rem] gap-[1rem] items-center">
            <input
              type="checkbox"
              className="ml-[1rem] w-[2rem] h-[2rem] border-[2px] border-[#c8c8c8]"
            />
            <p className="text-customtext text-[1.1rem]">No soy un robot</p>
          </div>
          <button className="text-white bg-[#1280e1] h-[2.2rem] w-[90%]">
            Registrarse
          </button>
          <Link className="w-[90%]" href={"/login"}>
            <p className="text-[#1280e1]">Ya tengo usuario</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
