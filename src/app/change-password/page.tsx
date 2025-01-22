"use client";
import React from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { validationChangePassword } from "@/utils/formValidations";
import { Form, Formik } from "formik";
import { changePassword } from "@/services/auth";
import { useAppSelector } from "@/hooks/storeHooks";

export default function page() {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const userData = useAppSelector((state) => state.auth);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: { newPassword: string; confirmPassword: string }
  ) => {
    try {
      e.preventDefault();
      if (userData.id_usuario) {
        await changePassword({
          id_usuario: userData.id_usuario,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomLayout>
      <Header title="Cambiar Contraseña" />

      <div className="w-[100%] mt-[2rem] pl-[2rem] pr-[2rem] flex justify-start">
        <Formik
          initialValues={initialValues}
          validationSchema={validationChangePassword}
          onSubmit={() => {}}
        >
          {({ isSubmitting, isValid, dirty, values }) => (
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                onSubmit(e, values)
              }
              className="w-[50%]"
            >
              <CustomField
                type="password"
                name="newPassword"
                id="newPassword"
                labelText="NUEVA CONTRASEÑA"
              />
              <CustomField
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                labelText="REPETIR CONTRASEÑA"
              />
              {isSubmitting || !isValid || !dirty ? (
                <CustomButton
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  background={"disabled"}
                  width="w-[100%]"
                  className="h-[2.5rem]"
                >
                  Aceptar
                </CustomButton>
              ) : (
                <CustomButton
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  width="w-[100%]"
                  className="h-[2.5rem]"
                >
                  Aceptar
                </CustomButton>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </CustomLayout>
  );
}
