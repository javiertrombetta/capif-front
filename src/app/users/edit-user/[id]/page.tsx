"use client";
import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import NewUserMenusCheckbox from "@/commons/NewUserMenusCheckbox/NewUserMenusCheckbox";
import { ROLES } from "@/types/auth.types";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  blockOrUnlockUser,
  changePassword,
  getUserById,
  updateUserById,
} from "@/services/users";
import { TIPOS_REGISTRO, User } from "@/types/user.types";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import Spinner from "@/commons/Spinner/Spinner";
import {
  validationChangePassword,
  validationEditUser,
} from "@/utils/formValidations";
import CustomSwitch from "@/commons/CustomSwitch/CustomSwitch";

export default function page() {
  const router = useRouter();
  const userId = useParams().id as string;
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGetUser = async () => {
    try {
      const user = await getUserById(userId);
      setUserData(user);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      handleGetUser();
    }
  }, [userId]);

  const handleBlockUser = async (idUsuario: string, isBlocked: boolean) => {
    try {
      await blockOrUnlockUser(idUsuario, !isBlocked);
      toast.success("Se cambio el estado del usuario");
    } catch (error) {
      toast.error("No se pudo cambiar el estado del usuario");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner color="black" />
      </div>
    );
  }

  return (
    <CustomLayout>
      <Header back title="Editar Usuario" />
      <div className="flex flex-col space-y-[2rem] overflow-y-auto py-[1rem] px-[2rem]">
        <div className="flex justify-end mr-[1rem] my-[1rem]">
          <button
            onClick={() => router.push("/users")}
            className="flex items-center justify-center bg-mainblue w-fit h-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]"
          >
            Volver a la lista
          </button>
        </div>
        {userData && (
          <>
            <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
              <h3 className="text-black text-3xl font-black mb-[1rem]">
                Datos
              </h3>
              <UserFields userData={userData} />
            </div>
            <div className="w-[100%] gap-[0.5rem] flex flex-col text-black">
              <p className="font-bold ">ESTADO</p>
              <select
                disabled
                className="pl-[0.3rem] border-[#c8c8c8] bg-[#f4f4f4] border-[2px] outline-0 h-[2rem]"
                value={userData.tipo_registro}
              >
                {TIPOS_REGISTRO.map((t) => (
                  <option value={t}>{t}</option>
                ))}
              </select>
            </div>
            <CustomSwitch
              label="BLOQUEADO"
              checked={userData.is_bloqueado}
              handleOnCheck={(isChecked) =>
                handleBlockUser(userData.id_usuario, isChecked)
              }
            />
            <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
              <h3 className="text-black text-3xl font-black mb-[1rem]">
                Reestablecer Contraseña
              </h3>
              <ChangePasswordForm idUsuario={userId} />
            </div>
            <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
              <h3 className="text-black text-3xl font-black mb-[1rem]">
                Vistas
              </h3>
              <ViewsFields />
            </div>
          </>
        )}
      </div>
    </CustomLayout>
  );
}

const UserFields = ({ userData }: { userData: User }) => {
  const initialValues = {
    nombre: userData?.nombre || "",
    apellido: userData?.apellido || "",
    email: userData?.email || "",
    telefono: userData?.telefono || "",
  };

  const onSubmit = async (
    // e: React.FormEvent<HTMLFormElement>,
    values: typeof initialValues
  ) => {
    try {
      // e.preventDefault();
      const { nombre, apellido, email, telefono } = values;
      if (userData?.id_usuario) {
        await updateUserById(userData?.id_usuario, {
          nombre,
          apellido,
          email,
          telefono,
        });
      }
      toast.success("Usuario actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el usuario");
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationEditUser}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="w-[100%] flex flex-col space-y-[1rem] items-end">
          <div className="w-[100%] flex flex-row space-x-3">
            <CustomField
              id="nombre"
              name="nombre"
              labelText="NOMBRES"
              type="text"
              width="w-[100%]"
            />
            <CustomField
              id="apellido"
              name="apellido"
              labelText="APELLIDOS"
              type="text"
              width="w-[100%]"
            />
          </div>

          <div className="w-[100%] flex flex-row space-x-3">
            <CustomField
              id="email"
              name="email"
              labelText="EMAIL"
              type="email"
              width="w-[100%]"
            />
            <CustomField
              id="telefono"
              name="telefono"
              labelText="TELÉFONO"
              type="text"
              width="w-[100%]"
            />
          </div>
          <CustomButton
            {...(isSubmitting || !isValid || !dirty
              ? { disabled: true, background: "disabled" }
              : {})}
            type="submit"
          >
            Guardar
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export const ChangePasswordForm = ({ idUsuario }: { idUsuario: string }) => {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      await changePassword({
        id_usuario: idUsuario,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      toast.success("Contraseña cambiada correctamente");
    } catch (error) {
      toast.error("Error al cambiar la contraseña");
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationChangePassword}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="w-[100%] flex flex-col space-y-[1rem] items-end">
          <div className="w-[100%] flex flex-row space-x-3 items-center justify-center">
            <CustomField
              type="password"
              id="newPassword"
              name="newPassword"
              labelText="CONTRASEÑA"
              width="w-[100%]"
            />
            <CustomField
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              labelText="REPETIR CONTRASEÑA"
              width="w-[100%]"
            />
          </div>
          <CustomButton
            {...(isSubmitting || !isValid || !dirty
              ? { disabled: true, background: "disabled" }
              : {})}
            type="submit"
          >
            Guardar
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

const ViewsFields = () => {
  const { rol } = useAppSelector((state) => state.auth);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationChangePassword}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            console.log(e);
          }}
          className="w-[100%] flex flex-col space-y-[1rem] items-start"
        >
          {rol === ROLES.EMPLOYEE ? null : (
            <div className="w-[28rem] flex flex-col gap-[1rem]">
              <NewUserMenusCheckbox
                menuName={"Repertorio"}
                subMenuOptions={[
                  {
                    name: "Declaración Repertorio",
                    id: "newPhonogram",
                  },
                  { name: "Buscar", id: "searchPhonogram" },
                  { name: "Conflictos", id: "conflicts" },
                ]}
              />
              <NewUserMenusCheckbox
                menuName={"Usuarios"}
                subMenuOptions={[{ name: "Registros", id: "records" }]}
              />
              <NewUserMenusCheckbox
                menuName={"Cuentas Corrientes"}
                subMenuOptions={[
                  { name: "Estado de Cuenta", id: "stateAccount" },
                ]}
              />
            </div>
          )}
          <CustomButton
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
            className="self-end"
          >
            Aceptar
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};
