"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gitLogo from "../../assets/GIT LOGO.png";
import { Formik, Form, Field } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { validationSignUpForm } from "@/utils/formValidations";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/storeHooks";
import "./SignUpView.css";
import "../../styles/globals.css";
import { setSignupData } from "@/store/signupSlice";
import Spinner from "@/commons/Spinner/Spinner";
import { FaCheckCircle } from "react-icons/fa";

interface RegisterFormValues {
  // name: string;
  // lastname: string;
  // phone: string;
  email: string;
  password: string;
  repeat_password: string;
  accept_terms: boolean;
}

function SignUpView() {
  const [showSection, setShowSection] = useState<"cuit" | "signup">("cuit");

  const changeSection = () => {
    switch (showSection) {
      case "signup":
        setShowSection("cuit");
        break;
      case "cuit":
        setShowSection("signup");
        break;
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100%] background">
      <div className="flex flex-col gap-[1.3rem] justify-center items-center signup-form-container max-h-[110vh]">
        <Image
          className="w-[25rem]"
          height={2000}
          width={2000}
          alt="GIT CAPIF"
          src={gitLogo}
        />
        {showSection === "cuit" ? (
          <VerifyCuit onSubmit={changeSection} />
        ) : (
          <SignUpForm />
        )}
      </div>
    </div>
  );
}

export default SignUpView;

interface VerifyCuitProps {
  onSubmit: () => void;
}

const VerifyCuit: FC<VerifyCuitProps> = ({ onSubmit }) => {
  const initialValues = {
    cuit: "",
  };

  const [verificationCuitState, setVerificationCuitState] = useState<
    "request" | "verify" | "response"
  >("request");

  const verifiyCuitMock = () => {
    setVerificationCuitState("verify");

    setTimeout(() => {
      setVerificationCuitState("response");

      setTimeout(() => {
        onSubmit();
      }, 3000);
    }, 3000);
  };

  const renderCuitInstance = () => {
    switch (verificationCuitState) {
      case "request":
        return (
          <Formik initialValues={initialValues} onSubmit={verifiyCuitMock}>
            {({ isSubmitting, isValid, dirty }) => (
              <Form
                id="cuit_request"
                className="bg-white w-[25rem] h-[100%] pt-[1rem] flex flex-col items-center gap-[0.5rem] overflow-y-scroll pr-[2rem] pl-[2rem] pt-[1rem] pb-[1rem]"
              >
                <div className="w-[100%] flex justify-center mt-[1rem] mb-[1rem]">
                  <p className="text-black font-bold text-[1.1rem] text-center">
                    Ingrese el cuit de la productora
                  </p>
                </div>
                <CustomField
                  type="text"
                  id="cuit"
                  name="cuit"
                  labelText="Cuit"
                />

                <div className="w-[100%] flex justify-center mt-[1rem]">
                  <CustomButton
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                    width="w-[100%]"
                    className="h-[2.5rem]"
                  >
                    Verificar
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        );
      case "verify":
        return (
          <div className="bg-white w-[25rem] h-[100%] pt-[1rem] flex flex-col items-center gap-[0.5rem] overflow-y-scroll pr-[2rem] pl-[2rem] pt-[1rem] pb-[1rem]">
            <div className="w-[100%] flex justify-center mt-[1rem] mb-[1rem]">
              <p className="text-black font-bold text-[1.5rem] text-center">
                Verificando CUIT
              </p>
            </div>
            <Spinner color="#1280e1" />
            <div className="h-[2rem]"></div>
          </div>
        );

      case "response":
        return (
          <div className="bg-white w-[25rem] h-[100%] pt-[1rem] flex flex-col items-center gap-[0.5rem] overflow-y-scroll pr-[2rem] pl-[2rem] pt-[1rem] pb-[1rem]">
            <FaCheckCircle color="#1280e1" size={40} />
            <div className="w-[100%] flex justify-center mt-[0.5  rem] mb-[1rem]">
              <p className="text-black font-bold text-[1.5rem] text-center">
                ¡CUIT Verificado con exito!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-[25rem] h-full overflow-hidden ">
      {renderCuitInstance()}
    </div>
  );
};

const SignUpForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues: RegisterFormValues = {
    // name: "",
    // lastname: "",
    // phone: "",
    email: "",
    password: "",
    repeat_password: "",
    accept_terms: false,
  };
  const goToVerifyEmail = (values: RegisterFormValues) => {
    dispatch(
      setSignupData({
        // name: values.name,
        // lastname: values.lastname,
        // phone: values.phone,
        email: values.email,
      })
    );
    router.push("/verify-email");
  };

  return (
    <div className="w-[25rem] h-full ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSignUpForm}
        onSubmit={goToVerifyEmail}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form
            id="signup"
            className="bg-white w-[25rem] h-[100%] pt-[1rem] flex flex-col items-center gap-[0.5rem] overflow-y-scroll pr-[2rem] pl-[2rem] pt-[1rem] pb-[1rem]"
          >
            <div className="w-[100%] flex justify-center mt-[1rem] mb-[1rem]">
              <p className="text-black font-bold text-[1.1rem] text-center">
                Ingrese sus datos para registrarse.
              </p>
            </div>

            <CustomField
              type="email"
              id="email"
              name="email"
              labelText="Email"
            />
            <CustomField
              type="password"
              id="password"
              name="password"
              labelText="Contraseña"
            />
            <CustomField
              type="password"
              id="repeat_password"
              name="repeat_password"
              labelText="Repetir Contraseña"
            />

            <div className="w-[100%] flex gap-[0.4rem] items-start">
              <Field
                id="accept_terms"
                name="accept_terms"
                type="checkbox"
                className="w-[1.7rem] h-[1.7rem] border-[2px] border-[#c8c8c8]"
              />
              <p className="text-[#1280e1] text-[0.8rem]">
                Leí y acepto los términos y condiciones y las políticas de
                privacidad de datos
              </p>
            </div>
            <div className="flex border-[#c8c8c8] border-[2px] p-[1rem] w-[100%] h-[5rem] gap-[1rem] items-center justify-start mt-[1rem]">
              <input
                type="checkbox"
                className="w-[2rem] h-[2rem] border-[2px] border-[#c8c8c8]"
              />
              <p className="text-customtext text-[1.1rem]">No soy un robot</p>
            </div>

            <div className="w-[100%] flex justify-center mt-[1rem]">
              <CustomButton
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                width="w-[100%]"
                className="h-[2.5rem]"
              >
                Registrarse
              </CustomButton>
            </div>

            <Link className="w-[100%]" href={"/login"}>
              <p className="text-[#1280e1]">Ya tengo usuario</p>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
