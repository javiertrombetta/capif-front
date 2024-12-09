"use client";
import React, { FC } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import { FaUserCircle } from "react-icons/fa";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { Form, Formik } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import { useAppSelector } from "@/hooks/storeHooks";

function page() {
  const userData = useAppSelector((state) => state.user);

  return (
    <CustomLayout>
      <div className="relative w-[100%] h-[12rem] flex justify-center">
        <div className="w-[100%] h-[8rem] bg-[#34495e]" />
        <div className="bottom-[4%] flex justify-center items-center absolute bg-white w-[7rem] h-[7rem] rounded-full">
          <FaUserCircle size={100} color="#99a3a4" />
        </div>
      </div>

      <div className="w-[100%] justify-center items-center flex flex-col gap-[0.3rem]">
        <p className="font-bold text-black text-[1.5rem]">{userData.names}</p>
        <div className="flex flex-col items-center justify-center gap-[0.5rem] w-[100%] mt-[0.2rem]">
          <CustomButton className="font-bold">Cambiar Contraseña</CustomButton>
          {/* <CustomButton
            onClick={handleGoToRegisterProductionCompany}
            className="font-bold"
          >
            Registrar Productora
          </CustomButton> */}
        </div>
      </div>
      <div className="w-[100%] flex justify-center mt-[3rem] mb-[3rem]">
        <UserDataForm />
      </div>
    </CustomLayout>
  );
}

export default page;

const UserDataForm: FC = () => {
  const userData = useAppSelector((state) => state.user);

  const initialValues = {
    name: userData.names,
    phone: userData.phone,
    email: userData.email,
  };

  return (
    // { isSubmitting, isValid, dirty }
    <Formik
      initialValues={initialValues}
      // validationSchema={}
      onSubmit={() => {}}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form id="user-data" className="w-[30rem] pl-[3rem] pr-[3rem]">
          <CustomField
            type="text"
            id="name"
            name="name"
            labelText="Nombres y Apellidos"
          />

          <CustomField
            type="text"
            id="phone"
            name="phone"
            labelText="Teléfono"
          />
          <CustomField
            type="email"
            id="email"
            name="email"
            labelText="Email"
            disabled
          />

          <CustomButton
            disabled={isSubmitting || !isValid || !dirty}
            width="w-[100%]"
            className="h-[2.5rem]"
          >
            Guardar
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};
