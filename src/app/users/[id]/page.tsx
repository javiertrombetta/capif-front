"use client";
import React, { useEffect, useMemo, useState } from "react";

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
  updateUserViews,
} from "@/services/users";
import { ESTADOS, User } from "@/types/user.types";
import CustomButton from "@/commons/CustomButton/CustomButton";
import Spinner from "@/commons/Spinner/Spinner";
import CustomSwitch from "@/commons/CustomSwitch/CustomSwitch";
import { ChangePasswordView } from "@/components/ChangePasswordView/ChangePasswordView";
import UserFieldsView from "@/components/UserFieldsView/UserFieldsView";

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
        {userData && (
          <>
            <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
              <h3 className="text-black text-3xl font-black mb-[1rem]">
                Datos
              </h3>
              <UserFieldsView userData={userData} />
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

const ViewsFields = ({ userData }: { userData: User }) => {
  const formatVistas = (views: typeof userData.vistas) =>
    views.reduce(
      (
        acc: Record<string, { id: string; name: string; isChecked: boolean }[]>,
        vista
      ) => {
        return {
          ...acc,
          [vista.superior]: [
            ...(acc[vista.superior] || []),
            {
              id: vista.id_vista,
              name: vista.nombre,
              isChecked: vista.habilitado,
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
        vista.id_vista === key ? { ...vista, habilitado: isChecked } : vista
      )
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserViews(userData.id, {
        vistas: views.map(({ nombre, habilitado }) => ({
          nombre_vista: nombre,
          is_habilitado: habilitado,
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
