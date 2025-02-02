"use client";
import React, { useEffect, useMemo, useState } from "react";

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
  getUserById,
  updateUserById,
  updateUserViews,
} from "@/services/users";
import { ESTADOS, User } from "@/types/user.types";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import Spinner from "@/commons/Spinner/Spinner";
import {
  validationChangePassword,
  validationEditUser,
} from "@/utils/formValidations";
import CustomSwitch from "@/commons/CustomSwitch/CustomSwitch";
import { ChangePasswordView } from "@/components/ChangePasswordView/ChangePasswordView";

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
                value={userData.estado}
              >
                {ESTADOS.map((t) => (
                  <option value={t}>{t}</option>
                ))}
              </select>
            </div>
            <CustomSwitch
              label="BLOQUEADO"
              checked={userData.isBloqueado}
              handleOnCheck={(isChecked) =>
                handleBlockUser(userData.id, isChecked)
              }
            />
            <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
              <h3 className="text-black text-3xl font-black mb-[1rem]">
                Reestablecer Contraseña
              </h3>
              <ChangePasswordView idUsuario={userId} />
            </div>
            <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
              <h3 className="text-black text-3xl font-black mb-[1rem]">
                Vistas
              </h3>
              <ViewsFields userData={userData} />
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

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const { nombre, apellido, email, telefono } = values;
      if (userData?.id) {
        await updateUserById(userData?.id, {
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

const ViewsFields = ({ userData }: { userData: User }) => {
  const formatVistas = (views: typeof userData.vistas) =>
    views.reduce(
      (
        acc: Record<string, { id: string; name: string; isChecked: boolean }[]>,
        vista
      ) => {
        return {
          ...acc,
          [vista.nombre_vista_superior]: [
            ...(acc[vista.nombre_vista_superior] || []),
            {
              id: vista.id_vista_maestro,
              name: vista.nombre_vista,
              isChecked: vista.is_habilitado,
            },
          ],
        };
      },
      {}
    );

  const { rol } = useAppSelector((state) => state.auth);
  const [views, setViews] = useState(userData.vistas);

  const handleViewCheck = (key: string, isChecked: boolean) => {
    setViews((prev) =>
      prev.map((vista) =>
        vista.id_vista_maestro === key
          ? { ...vista, is_habilitado: isChecked }
          : vista
      )
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserViews(userData.id, {
        vistas: views.map(({ nombre_vista, is_habilitado }) => ({
          nombre_vista,
          is_habilitado,
        })),
      });

      toast.success("Usuario actualizado correctamente");
    } catch (error) {
      toast.error("Error al actualizar el usuario");
      console.error(error);
    }
  };

  const vistasFormateadas = useMemo(() => formatVistas(views), [views]);

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="w-[100%] flex flex-col space-y-[1rem] items-start"
    >
      {rol === ROLES.EMPLOYEE ? null : (
        <div className="w-[28rem] flex flex-col gap-[1rem]">
          {Object.keys(vistasFormateadas).map((v) => (
            <NewUserMenusCheckbox
              key={v}
              menuName={v}
              subMenuOptions={vistasFormateadas[v]}
              handleViewCheck={handleViewCheck}
            />
          ))}
        </div>
      )}
      <CustomButton type="submit" className="self-end">
        Aceptar
      </CustomButton>
    </form>
  );
};
