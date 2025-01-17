"use client";
import React, { FC, useState } from "react";
import { Form, Formik } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { validationRecoveryPassword } from "@/utils/formValidations";
import "../../../styles/globals.css";
import { useParams, useRouter } from "next/navigation";
import { passwordRecovery } from "@/services/auth";

interface PasswordRecoveryValues {
  password: string;
  repeat_password: string;
}

export default function page() {
  const [showSection, setShowSection] = useState<"form" | "confirmation">(
    "form"
  );

  return (
    <div className="flex justify-center items-center h-[100vh] background">
      <div className="flex flex-col gap-[1.3rem] justify-center items-center max-h-[105vh]">
        {showSection === "form" ? (
          <RecoveryForm setShowSection={setShowSection} />
        ) : (
          <ConfirmationRecovery />
        )}
      </div>
    </div>
  );
}

const RecoveryForm: FC<{
  setShowSection: (section: "form" | "confirmation") => void;
}> = ({ setShowSection }) => {
  const initialValues: PasswordRecoveryValues = {
    password: "",
    repeat_password: "",
  };

  const token = useParams().token;

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: PasswordRecoveryValues
  ) => {
    try {
      e.preventDefault();
      await passwordRecovery(token as string, values.password);
      setShowSection("confirmation");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[25rem] h-[30rem] overflow-hidden rounded-[1rem]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationRecoveryPassword}
        onSubmit={() => {}}
      >
        {({ isSubmitting, isValid, dirty, values }) => (
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              onSubmit(e, values)
            }
            id="signup"
            className="bg-white w-[25rem] h-[100%] pt-[1rem] flex flex-col items-center gap-[0.5rem] overflow-y-auto pr-[2rem] pl-[2rem] pt-[1rem] pb-[1rem]"
          >
            <div className="w-[100%] flex justify-center mt-[1rem] mb-[1rem]">
              <p className="text-black font-bold text-[1.1rem] text-center">
                Ingrese su nueva contraseña.
              </p>
            </div>

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

            <div className="flex border-[#c8c8c8] border-[2px] p-[1rem] w-[100%] h-[5rem] gap-[1rem] items-center justify-start">
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
                Aceptar
              </CustomButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ConfirmationRecovery: FC = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="scale-[1] w-[35rem] h-[20rem] bg-[white] rounded-[2rem] flex flex-col items-center justify-center gap-[1rem] p-[1rem]">
      <h2 className="text-black font-bold text-[2rem]">
        Contraseña Restaurada Correctamente
      </h2>
      <p className="text-black text-[1.2rem] text-center">
        Ya puedes ingresar con tu nueva contraseña
      </p>

      <div>
        <CustomButton onClick={goToLogin}>Ingresar</CustomButton>
      </div>
    </div>
  );
};
