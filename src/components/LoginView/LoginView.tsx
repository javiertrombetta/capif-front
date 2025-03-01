"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import "./LoginView.css";
import "../../styles/globals.css";
import gitLogo from "../../assets/GIT LOGO.png";
import CustomField from "@/commons/CustomField/CustomField";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { validationLoginForm } from "@/utils/formValidations";
import {
  authLogin,
  getAuthData,
  selectProductionCompany,
} from "@/services/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { setAuthData } from "@/store/authSlice";
import { ROLES } from "@/types/auth.types";
import { toast } from "react-toastify";
import useModal from "@/hooks/useModal";
import { ChangeProducerModal } from "../Modals/ChangeProducerModal/ChangeProducerModal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginForm: FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const handleSubmit = async (values: { email: string; password: string }) => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA no está disponible");
      return;
    }

    if (window && window.localStorage) {
      localStorage.removeItem("company");
    }

    const { email, password } = values;
    try {
      const recaptchaToken = await executeRecaptcha("login");

      await authLogin({ email, password, recaptchaToken });
    } catch {
      toast.error("Usuario o contraseña incorrectos");
      return;
    }

    const data = await getAuthData();

    if (data.estado === "HABILITADO") {
      router.push("/repertoires");
    } else if (data.estado === "ENVIADO") {
      router.push(`/users/${data.id_usuario}/application`);
    } else {
      router.push("/producers/register");
    }
    if (
      data.estado === "HABILITADO" &&
      data.rol === ROLES.EMPLOYEE &&
      (data.productoras?.length ?? 0) > 1
    ) {
      openModal(<ChangeProducerModal />);
    }

    if (data.productoras?.length === 1) {
      await selectProductionCompany(data.productoras[0].id);
      if (window && window.localStorage) {
        localStorage.setItem("company", JSON.stringify(data.productoras[0]));
      }
    }

    dispatch(
      setAuthData({ ...data, productoraActiva: data.productoras?.[0] ?? null })
    );
  };

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
            className="bg-white w-[25rem] flex flex-col justify-center items-center gap-[0.5rem] overflow-y-auto pr-[2rem] pl-[2rem] pb-[1rem]"
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
            <div className="w-[100%] flex gap-[0.4rem] items-center">
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

function LoginView() {
  const authData = useAppSelector((state) => state.auth);

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
        {!authData.loading && <LoginForm />}
      </div>
    </div>
  );
}

export default LoginView;
