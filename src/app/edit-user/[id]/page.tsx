"use client";
import React, { useEffect, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { MdEdit } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import NewUserMenusCheckbox from "@/commons/NewUserMenusCheckbox/NewUserMenusCheckbox";
import { ROLES } from "@/types/auth.types";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  blockOrUnlockUser,
  getUserById,
  updateUserById,
} from "@/services/users";
import { User } from "@/types/user.types";
import { Form, Formik } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
interface UserInitialValue {
  nombre: string;
  apellido: string;
  email: string;
  estado: string;
  contraseña: string;
  repetir_contraseña: string;
  bloqueado: boolean;
}

export default function page() {
  const router = useRouter();
  const userId = useParams().id;
  const { rol } = useAppSelector((state) => state.auth);
  const [userData, setUserData] = useState<User | null>(null);

  const initialValues: UserInitialValue = userData
    ? {
        nombre: userData.nombre || "",
        apellido: userData.apellido || "",
        email: userData.email || "",
        estado: "",
        contraseña: "",
        repetir_contraseña: "",
        bloqueado: userData.is_bloqueado,
      }
    : {
        nombre: "",
        apellido: "",
        email: "",
        estado: "",
        contraseña: "",
        repetir_contraseña: "",
        bloqueado: false,
      };

  const handleGetUser = async () => {
    try {
      const user = await getUserById(userId as string);
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      handleGetUser();
    }
  }, [userId]);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: UserInitialValue
  ) => {
    try {
      e.preventDefault();
      if (userData && userData?.id_usuario) {
        await updateUserById(userData?.id_usuario, {
          nombre: values.nombre,
          apellido: values.apellido,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlockUser = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isBlocked = e.target.value === "true" ? true : false;
    if (userData?.id_usuario) {
      await blockOrUnlockUser(userData.id_usuario, isBlocked);
      alert("Se cambio el estado del usuario");
    }
  };

  return (
    <CustomLayout>
      <Header back title="Editar Usuario" />
      <div className="flex justify-end mr-[1rem] mt-[1rem]">
        <button
          onClick={() => router.push("/records")}
          className="flex items-center justify-center bg-mainblue w-fit h-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]"
        >
          Volver a la lista
        </button>
      </div>
      {!userData ? null : (
        <Formik
          initialValues={initialValues}
          // validationSchema={validationRecoveryPassword}
          onSubmit={() => {}}
        >
          {({ isSubmitting, isValid, dirty, values }) => (
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                onSubmit(e, values)
              }
              className="ml-[3rem] w-[30rem] flex flex-col "
            >
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

              <div className="flex w-[100%] relative items-center">
                <CustomField
                  id="email"
                  name="email"
                  labelText="EMAIL"
                  type="email"
                  width="w-[100%]"
                />
                <button className="ml-[1rem] right-[0] mb-[0.5rem] absolute flex items-center justify-center bg-mainblue w-[2rem] h-[2rem] rounded-[0.2rem]">
                  <MdEdit size={19} />
                </button>
              </div>

              <div className="w-[100%] gap-[0.5rem] flex flex-col">
                <p className="font-bold text-black">ESTADO</p>
                <select
                  disabled
                  className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem]"
                >
                  <option>Confirmado</option>
                  <option>Nuevo</option>
                  <option>Registrado</option>
                </select>
              </div>
              <div className="w-[100%] mt-[2rem]">
                <CustomField
                  type="password"
                  id="contraseña"
                  name="contraseña"
                  labelText="CONTRASEÑA"
                  width="w-[100%]"
                />
              </div>

              <CustomField
                type="password"
                id="repetir_contraseña"
                name="repetir_contraseña"
                labelText="REPETIR CONTRASEÑA"
                width="w-[100%]"
              />

              <div className="w-[100%] gap-[0.5rem] flex flex-col mb-[2rem]">
                <p className="font-bold text-black">BLOQUEADO</p>
                <select
                  onChange={handleBlockUser}
                  value={values.bloqueado ? "true" : "false"}
                  className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem]"
                >
                  <option value={"false"}>NO</option>
                  <option value={"true"}>SI</option>
                </select>
              </div>

              {rol === ROLES.EMPLOYEE ? null : (
                <div className="w-[28rem] flex flex-col gap-[1rem]">
                  <NewUserMenusCheckbox
                    menuName={"Repertorio"}
                    subMenuOptions={[
                      { name: "Declaración Repertorio", id: "newPhonogram" },
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
              <div className="flex gap-[2rem]">
                <CustomButton
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="flex items-center justify-center bg-mainblue w-fit h-[2rem] mt-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]"
                >
                  Aceptar
                </CustomButton>

                <button className="flex items-center justify-center bg-mainblue w-fit h-[2rem] mt-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]">
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </CustomLayout>
  );
}
