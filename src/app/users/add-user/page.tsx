"use client";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomField from "@/commons/CustomField/CustomField";
import { validationSecondaryRegister } from "@/utils/formValidations";
import { authSecondarySignup } from "@/services/auth";

interface secondaryRegisterValues {
  nombre: string;
  apellido: string;
  email: string;
  confirm_email: string;
  telefono: string;
}

function page() {
  const { rol } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const headerTitle = (() => {
    switch (rol) {
      case ROLES.USER_PRODUCER:
        return "Alta de Productor Secundario";
      case ROLES.SUPER_ADMIN:
        return "Alta de Administrador Secundario";
    }
    return "";
  })();

  const initialValues: secondaryRegisterValues = {
    nombre: "",
    apellido: "",
    email: "",
    confirm_email: "",
    telefono: "",
  };

  const onSubmit = async (values: secondaryRegisterValues) => {
    try {
      const { email, nombre, apellido, telefono } = values;

      await authSecondarySignup(
        rol === ROLES.USER_PRODUCER ? "prods" : "admins",
        {
          email,
          nombre,
          apellido,
          telefono,
        }
      );
      toast.success("Usuario secundario registrado exitosamente");
      router.push("/users");
    } catch (error) {
      toast.error("Error al registrar usuario secundario");
      console.log(error);
    }
  };

  return (
    <CustomLayout>
      <Header title={headerTitle} />
      <div className="flex-1 flex flex-col overflow-auto">
        <Formik
          validationSchema={validationSecondaryRegister}
          onSubmit={(values) => onSubmit(values)}
          initialValues={initialValues}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="w-[100%] pr-[2rem] pl-[2rem] mt-[2rem] pb-[2rem] flex flex-col gap-[1rem]">
              <p className="text-black">
                Escriba el correo electrónico del usuario al cual desea dar de
                alta.
              </p>
              <CustomField
                id="email"
                name="email"
                width="w-[28rem]"
                type="text"
                labelText="Email"
              />
              <CustomField
                id="confirm_email"
                name="confirm_email"
                width="w-[28rem]"
                type="text"
                labelText="Confirmar Email"
              />
              <CustomField
                id="nombre"
                name="nombre"
                width="w-[28rem]"
                type="text"
                labelText="Nombres"
              />
              <CustomField
                id="apellido"
                name="apellido"
                width="w-[28rem]"
                type="text"
                labelText="Apellidos"
              />
              <CustomField
                id="telefono"
                name="telefono"
                width="w-[28rem]"
                type="text"
                labelText="Teléfono"
              />
              <CustomButton
                type="submit"
                {...(isSubmitting || !isValid
                  ? { disabled: true, background: "disabled" }
                  : {})}
              >
                Enviar Invitación
              </CustomButton>
            </Form>
          )}
        </Formik>
      </div>
    </CustomLayout>
  );
}

export default page;
