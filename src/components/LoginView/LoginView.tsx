"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import gitLogo from "../../assets/GIT LOGO.png";
import { Formik, Form } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { validationLoginForm } from "@/utils/formValidations";
import "./LoginView.css";
import "../../styles/globals.css";
import { useRouter } from "next/navigation";
import { authLogin, getUserRol } from "@/services/auth";
import { getUserData } from "@/services/users";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setAuthData } from "@/store/authSlice";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

function LoginView() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (window && window.localStorage) {
      localStorage.removeItem("isLoged");
      localStorage.removeItem("company");
    }
    const { email, password } = values;
    await authLogin({ email, password });
    const data = await getUserData();
    let dataToSet = data;
    dispatch(setAuthData(data));
    if (data.rol_id) {
      const rol = await getUserRol();
      dataToSet = { ...data, rol };
    }
    dispatch(setAuthData(dataToSet));
    localStorage.setItem("isLoged", "true");
    router.push("/records");
    dispatch(setModal({ type: ModalNames.CHANGE_PRODUCER, isActive: true }));
  };

  const LoginForm: FC = () => {
    return (
      <div className="w-[25rem] h-full ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationLoginForm}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form
              id="signup"
              className="bg-white w-[25rem] flex flex-col justify-center items-center gap-[0.5rem] overflow-y-scroll pr-[2rem] pl-[2rem] pb-[1rem]"
            >
              <div className="w-[100%] flex justify-center mt-[1rem] mb-[1rem]">
                <p className="text-black font-bold text-[1.1rem] text-center">
                  Ingrese email y contraseña para ingresar.
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

              <div className="flex border-[#c8c8c8] border-[2px] p-[1rem] w-[100%] h-[5rem] gap-[1rem] items-center justify-start">
                <input
                  type="checkbox"
                  className="w-[2rem] h-[2rem] border-[2px] border-[#c8c8c8]"
                />
                <p className="text-customtext text-[1.1rem]">No soy un robot</p>
              </div>
              <div className="w-[100%] flex gap-[0.4rem] items-center mt-[1rem]">
                <input
                  type="checkbox"
                  className="w-[1.7rem] h-[1.7rem] border-[2px] border-[#c8c8c8]"
                />
                <p className="text-customtext text-[1rem] ">
                  Recordar contraseña
                </p>
              </div>
              <Link className="w-[100%] mt-[1rem]" href="/forgot-password">
                <p className="text-[#1280e1]">Olvide mi contraseña</p>
              </Link>

              <div className="w-[100%] flex justify-center mt-[1rem]">
                {isSubmitting || !isValid || !dirty ? (
                  <CustomButton
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                    background="disabled"
                    width="w-[100%]"
                    className="h-[2.5rem]"
                  >
                    Ingresar
                  </CustomButton>
                ) : (
                  <CustomButton
                    type="submit"
                    width="w-[100%]"
                    className="h-[2.5rem]"
                  >
                    Ingresar
                  </CustomButton>
                )}
              </div>

              <Link className="w-[100%]" href={"/signup"}>
                <p className="text-[#1280e1]">Registrarse como nuevo usuario</p>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100%] background">
      <div className="flex flex-col gap-[1.3rem] justify-center items-center signup-form-container ">
        <Image
          className="w-[25rem]"
          height={2000}
          width={2000}
          alt="GIT CAPIF"
          src={gitLogo}
        />
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginView;
