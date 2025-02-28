"use client";
import React, { FC, useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import CustomButton from "@/commons/CustomButton/CustomButton";
import Spinner from "@/commons/Spinner/Spinner";
import "../../../styles/globals.css";
import { useParams, useRouter } from "next/navigation";
import { verifyAccount } from "@/services/auth";

const page: FC = () => {
  const [isVerified, setIsVerified] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const router = useRouter();
  const token = useParams().token;
  const handleVerifyEmail = async () => {
    try {
      if (token && !Array.isArray(token)) {
        await verifyAccount(token as string);
        setIsVerified("success");
      }
    } catch (error) {
      console.log(error);
      setIsVerified("error");
    }
  };

  useEffect(() => {
    handleVerifyEmail();
  }, [token]);

  if (isVerified === "pending") {
    return (
      <div className="flex justify-center items-center h-[100vh] background">
        <Spinner />
      </div>
    );
  }

  const pushLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-[100vh] background">
      <div className="scale-[1] w-[35rem] h-[20rem] bg-[white] rounded-[2rem] flex flex-col items-center justify-center gap-[1rem] p-[1rem]">
        <MdEmail color="#1280e1" size={80} />
        <h2 className="text-black font-bold text-[2rem]">
          ¡Cuenta Verificada con Éxito!
        </h2>
        <p className="text-black text-[1.2rem] text-center">
          Ya puedes ingresar al sistema con tu usuario y contraseña.
        </p>

        <div>
          <CustomButton onClick={pushLogin}>Ingresar</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default page;
