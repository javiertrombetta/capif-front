"use client";
import React from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import NewUserMenusCheckbox from "@/commons/NewUserMenusCheckbox/NewUserMenusCheckbox";

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

  return (
    <CustomLayout>
      <Header title={headerTitle} />

      <div className="w-[100%] pr-[2rem] pl-[2rem] mt-[2rem] pb-[2rem] flex flex-col gap-[1rem]">
        <p className="text-black">
          Escriba el correo electrónico del usuario al cual desea dar de alta.
        </p>
        <div className="w-[28rem] flex justify-center"></div>
        <CustomInput className="w-[28rem]" type="text" label="Email" />
        <CustomInput
          className="w-[28rem]"
          type="text"
          label="Confirmar Email"
        />
        <CustomInput className="w-[28rem]" type="text" label="Nombres" />
        <CustomInput className="w-[28rem]" type="text" label="Apellidos" />
        <CustomInput className="w-[28rem]" type="text" label="Teléfono" />
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
        <CustomButton>Enviar Invitación</CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;
