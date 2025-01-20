"use client";
import React from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import NewUserMenusCheckbox from "@/commons/NewUserMenusCheckbox/NewUserMenusCheckbox";
import { Form, Formik } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import { validationSecondaryRegister } from "@/utils/formValidations";
import { authSecondarySignup } from "@/services/auth";

interface secondaryRegisterValues {
  nombre: string;
  apellido: string;
  email: string;
  confirm_email: string;
  telefono: string;
  password: string;
  confirm_password: string;
}

function page() {
  const { rol } = useAppSelector((state) => state.user);
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
    password: "",
    confirm_password: "",
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: secondaryRegisterValues
  ) => {
    e.preventDefault();
    try {
      const { email, nombre, apellido, telefono } = values;

      await authSecondarySignup({
        email,
        nombre,
        apellido,
        telefono,
        // password,
      });
      alert("Usuario secundario registrado exitosamente");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomLayout>
      <Header title={headerTitle} />
      <Formik
        validationSchema={validationSecondaryRegister}
        onSubmit={() => {}}
        initialValues={initialValues}
      >
        {({ values }) => (
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              onSubmit(e, values)
            }
            className="w-[100%] pr-[2rem] pl-[2rem] mt-[2rem] pb-[2rem] flex flex-col gap-[1rem]"
          >
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
            {/* <CustomField
              id="password"
              name="password"
              width="w-[28rem]"
              type="password"
              labelText="Contraseña"
            />
            <CustomField
              id="confirm_password"
              name="confirm_password"
              width="w-[28rem]"
              type="password"
              labelText="Confirmar Contraseña"
            /> */}
            <div>
              <p className="font-bold text-black">Menu</p>
            </div>
            <div className="w-[28rem] flex flex-col gap-[1rem]">
              <NewUserMenusCheckbox
                menuName={"Repertorio"}
                subMenuOptions={
                  rol === ROLES.SUPER_ADMIN
                    ? [
                        { name: "Declaración Repertorio", id: "newPhonogram" },
                        { name: "Buscar", id: "searchPhonogram" },
                        { name: "Conflictos", id: "conflicts" },
                        { name: "Envio Archivo Audio", id: "sendAudioFile" },
                        { name: "Territorialidad", id: "territoriality" },
                      ]
                    : [
                        { name: "Declaración Repertorio", id: "newPhonogram" },
                        { name: "Buscar", id: "searchPhonogram" },
                        { name: "Conflictos", id: "conflicts" },
                      ]
                }
              />
              {rol === ROLES.SUPER_ADMIN && (
                <NewUserMenusCheckbox
                  menuName={"Productoras"}
                  subMenuOptions={[
                    { name: "Buscar", id: "searchProductionCompany" },
                    { name: "Premios Gardel", id: "gardelAwards" },
                  ]}
                />
              )}

              <NewUserMenusCheckbox
                menuName={"Usuarios"}
                subMenuOptions={
                  rol === ROLES.SUPER_ADMIN
                    ? [
                        { name: "Alta Usuario", id: "addEmployee" },
                        { name: "Registros", id: "records" },
                      ]
                    : [{ name: "Registros", id: "records" }]
                }
              />

              <NewUserMenusCheckbox
                menuName={"Cuentas Corrientes"}
                subMenuOptions={
                  rol === ROLES.SUPER_ADMIN
                    ? [
                        { name: "Liquidaciones", id: "payouts" },
                        { name: "Pagos", id: "payments" },
                        { name: "Traspasos", id: "trasnfers" },
                        { name: "Rechazos", id: "rejects" },
                        { name: "Estado de Cuenta", id: "stateAccount" },
                      ]
                    : [{ name: "Estado de Cuenta", id: "stateAccount" }]
                }
              />
              {rol === ROLES.SUPER_ADMIN && (
                <NewUserMenusCheckbox
                  menuName={"Auditoria"}
                  subMenuOptions={[
                    { name: "Historial de Cambios", id: "changesHistory" },
                    { name: "Cambios en Repertorios", id: "repertoryChanges" },
                    { name: "Sesiones", id: "sessions" },
                  ]}
                />
              )}
            </div>
            <CustomButton type="submit">Enviar Invitación</CustomButton>
          </Form>
        )}
      </Formik>
    </CustomLayout>
  );
}

export default page;
