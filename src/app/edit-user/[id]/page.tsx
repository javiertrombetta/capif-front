"use client";
import React, { useEffect, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
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
import Spinner from "@/commons/Spinner/Spinner";
import { toast } from "react-toastify";
interface UserInitialValue {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
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
  const [loading, setLoading] = useState(true);

  const initialValues: UserInitialValue = {
    nombre: userData?.nombre || "",
    apellido: userData?.apellido || "",
    email: userData?.email || "",
    telefono: userData?.telefono || "",
    estado: "",
    contraseña: "",
    repetir_contraseña: "",
    bloqueado: userData?.is_bloqueado || false,
  };

  const handleGetUser = async () => {
    try {
      const user = await getUserById(userId as string);
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

  const handleBlockUser = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const isBlocked = e.target.value === "true" ? true : false;
    if (userData?.id_usuario) {
      await blockOrUnlockUser(userData.id_usuario, isBlocked);
      alert("Se cambio el estado del usuario");
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
      <div className="flex flex-col overflow-y-auto py-[1rem] px-[2rem]">
        <div className="flex justify-end mr-[1rem] my-[1rem]">
          <button
            onClick={() => router.push("/users")}
            className="flex items-center justify-center bg-mainblue w-fit h-[2rem] pl-[1rem] pr-[1rem] pt-[0.5rem] pb-[0.5rem] rounded-[0.2rem]"
          >
            Volver a la lista
          </button>
        </div>
        {userData && (
          <Formik
            initialValues={initialValues}
            // validationSchema={validationRecoveryPassword}
            onSubmit={() => {}}
          >
            {({ isSubmitting, isValid, dirty, values }) => (
              <>
                <UserFields userData={userData} values={values} />
                <Form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    console.log(e);
                  }}
                  className="ml-[3rem] w-[30rem] flex flex-col mt-[2rem]"
                >
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
              </>
            )}
          </Formik>
        )}
      </div>
    </CustomLayout>
  );
}

const UserFields = ({
  userData,
  values,
}: {
  userData: User;
  values: UserInitialValue;
}) => {
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: UserInitialValue
  ) => {
    try {
      e.preventDefault();
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
    <Form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e, values)}
      className="p-[1rem] w-[100%] flex flex-col items-end border-[1px] border-[#c8c8c8]"
    >
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
          labelText="Telefono"
          type="text"
          width="w-[100%]"
        />
      </div>
      <CustomButton type="submit">Guardar</CustomButton>
    </Form>
  );
};
