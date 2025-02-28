"use client";
import React, { FC } from "react";
import { MdEmail } from "react-icons/md";
import { useAppSelector } from "@/hooks/storeHooks";
import Spinner from "@/commons/Spinner/Spinner";
import "../../styles/globals.css";

const page: FC = () => {
  const signupData = useAppSelector((state) => state.signup);

  if (signupData.email === "") {
    return (
      <div className="flex justify-center items-center h-[100vh] background">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[100vh] background">
      <div className="scale-[1] w-[35rem] h-[20rem] bg-[white] rounded-[2rem] flex flex-col items-center justify-center gap-[1rem] p-[1rem]">
        <MdEmail color="#1280e1" size={80} />
        <h2 className="text-black font-bold text-[2rem]">
          Verifica tu correo electrónico
        </h2>
        <p className="text-black text-[1.2rem] text-center">
          Verifica tu dirección de correo electrónico haciendo clic en el enlace
          enviado a {<label className="font-bold">{signupData.email}</label>}.
        </p>
        <p className="text-black text-[1.1rem] text-center">
          Si existe un error en la dirección de correo electrónico indicada,
          contáctese con derechos@capif.org.ar.
        </p>
      </div>
    </div>
  );
};

export default page;
