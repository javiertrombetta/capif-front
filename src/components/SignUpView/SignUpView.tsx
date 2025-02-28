"use client";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import Spinner from "@/commons/Spinner/Spinner";
import { useAppDispatch } from "@/hooks/storeHooks";
import { authSignUp, validateCuit } from "@/services/auth";
import { setSignupData } from "@/store/signupSlice";
import { cuitValidation, validationSignUpForm } from "@/utils/formValidations";
import gitLogo from "../../assets/GIT LOGO.png";
import "./SignUpView.css";
import "../../styles/globals.css";

interface RegisterFormValues {
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
    "request" | "verify"
  >("request");

  const onSubmitVerifyCuit = async (values: typeof initialValues) => {
    setVerificationCuitState("verify");

    try {
      await validateCuit(values.cuit);
      toast.success(
        "El CUIT está disponible para registro. Por favor, ingrese su CUIT y cree una contraseña."
      );
      onSubmit();
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.response?.data.message);
      } else {
        toast.error("Error al validar CUIT");
      }
      setVerificationCuitState("request");
    }
  };

  return (
    <div className="h-full overflow-hidden ">
      {verificationCuitState === "request" ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitVerifyCuit}
          validationSchema={cuitValidation}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form
              id="cuit_request"
              className="bg-white w-[30rem] h-[100%] px-[2rem] pb-[2rem] pt-[1rem] flex flex-col items-center space-y-[1rem]"
            >
              <div className="w-[100%] flex flex-col justify-center mt-[1rem] mb-[1rem]">
                <p className="text-black font-bold text-[1.1rem] text-center">
                  Ingrese el CUIT/CUIL del productor fonográfico
                </p>

                <p className="text-[#7b7d7d] font-bold text-[0.9rem] text-center mt-[1rem]">
                  Si Ud. es una persona física consigne su CUIT/CUIL. Si por el
                  contrario, se ha registrado en representación de una persona
                  jurídica (sociedad anónima, fundación, etc.) consigne el CUIT
                  de la persona jurídica.
                </p>
              </div>

              <CustomField
                type="text"
                id="cuit"
                name="cuit"
                labelText="CUIT (Solo números)"
              />

              <div className="w-[100%] flex justify-center ">
                <CustomButton
                  type="submit"
                  {...(isSubmitting || !isValid || !dirty
                    ? { disabled: true, background: "disabled" }
                    : {})}
                  width="w-[100%]"
                  className="h-[2.5rem]"
                >
                  Verificar
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="bg-white w-[25rem] h-[100%] pt-[1rem] flex flex-col items-center gap-[0.5rem] overflow-y-scroll">
          <div className="w-[100%] flex justify-center px-[2rem] pb-[1rem] mt-[1rem] mb-[1rem]">
            <p className="text-black font-bold text-[1.5rem] text-center">
              Verificando CUIT
            </p>
          </div>
          <Spinner color="#1280e1" />
          <div className="h-[2rem]"></div>
        </div>
      )}
    </div>
  );
};

const SignUpForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    repeat_password: "",
    accept_terms: false,
  };

  const goToVerifyEmail = async (values: RegisterFormValues): Promise<void> => {
    await authSignUp({
      email: values.email,
      password: values.password,
    });

    dispatch(
      setSignupData({
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
            className="bg-white w-[25rem] h-[100%] px-[2rem] pb-[1rem] pt-[1rem] flex flex-col items-center gap-[0.5rem] overflow-y-auto"
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
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-[#1280e1] text-[0.8rem]"
              >
                Leí y acepto los términos y condiciones y las políticas de
                privacidad de datos
              </Link>
            </div>
            <div className="w-[100%] flex justify-center">
              {isSubmitting || !isValid || !dirty ? (
                <CustomButton
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  background={"disabled"}
                  width="w-[100%]"
                  className="h-[2.5rem]"
                >
                  Registrarse
                </CustomButton>
              ) : (
                <CustomButton
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  width="w-[100%]"
                  className="h-[2.5rem]"
                >
                  Registrarse
                </CustomButton>
              )}
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
