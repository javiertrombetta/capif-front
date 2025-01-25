"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { getAllUsers } from "@/services/users";
import { User } from "@/types/user.types";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function page() {
  const authData = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const getUsersData = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (error) {
      console.log("🔴", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  return (
    <CustomLayout>
      <Header title="Registros" />
      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <div className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
          <CustomInput label="Buscar:" type="text" />
          {authData.rol === ROLES.SUPER_ADMIN ||
          authData.rol === ROLES.CAPIF_ADMIN ? (
            <>
              <select className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem]">
                <option>Registrados</option>
                <option>Pendientes de Registro</option>
                <option>Incompleto</option>
              </select>
              <CustomInput
                className="w-[15rem]"
                label="FECHA CREACIÓN DESDE"
                type="date"
              />
              <CustomInput
                className="w-[15rem]"
                label="FECHA CREACIÓN HASTA"
                type="date"
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-[100%] mt-[2rem] flex-1 overflow-y-auto">
          {users.length > 0 && (
            <CustomTable
              columnNames={
                authData.rol === ROLES.SUPER_ADMIN ||
                authData.rol === ROLES.CAPIF_ADMIN
                  ? [
                      { name: "EMAIL", isSortable: true },
                      { name: "TIPO REGISTRO", isSortable: true },
                      { name: "CUIT", isSortable: true },
                      { name: "NOMBRES", isSortable: true },
                      { name: "APELLIDOS", isSortable: true },
                      { name: "TELÉFONO", isSortable: true },
                      { name: "SELLO", isSortable: true },
                      { name: "FECHA CREACIÓN", isSortable: true },
                      { name: "FECHA ACTUALIZACIÓN", isSortable: true },
                      { name: "ACCIÓN", isSortable: false },
                    ]
                  : [
                      { name: "EMAIL", isSortable: true },
                      { name: "CUIT", isSortable: true },
                      { name: "NOMBRES", isSortable: true },
                      { name: "APELLIDOS", isSortable: true },
                      { name: "TELÉFONO", isSortable: true },
                      { name: "SELLO", isSortable: true },
                      { name: "FECHA CREACIÓN", isSortable: true },
                      { name: "FECHA ACTUALIZACIÓN", isSortable: true },
                    ]
              }
              columnValues={users.map((element) => {
                return authData.rol === ROLES.SUPER_ADMIN ||
                  authData.rol === ROLES.CAPIF_ADMIN
                  ? [
                      element.email,
                      element.tipo_registro,
                      "123123",
                      element.nombre,
                      element.apellido,
                      element.telefono,
                      "Sony Music",
                      element.createdAt,
                      element.updatedAt,
                      <ActionDropdownButton
                        menuOptions={[
                          {
                            label: "Editar",
                            icon: <FaEdit />,
                            onClick: () => {
                              redirectToOption(
                                `/edit-user/${element.id_usuario}`
                              );
                            },
                          },
                        ]}
                      />,
                    ]
                  : [
                      element.email,
                      "123123",
                      element.nombre,
                      element.apellido,
                      element.telefono,
                      "Sony Music",
                      element.createdAt,
                      element.updatedAt,
                    ];
              })}
            />
          )}
        </div>
      </div>
    </CustomLayout>
  );
}
