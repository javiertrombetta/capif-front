"use client";
import React, { FC, useEffect, useState } from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { IoMdSettings } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getAllUsers } from "@/services/users";
import { User } from "@/types/user.types";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";

export default function page() {
  const userData = useAppSelector((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);

  const getUsersData = async () => {
    try {
      const users = await getAllUsers();
      if (Array.isArray(users)) {
        setUsers(users);
      } else {
        setUsers([users]);
      }
    } catch (error) {
      console.log("🔴", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <CustomLayout>
      <Header title="Registros" />

      <div className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
        <CustomInput label="Buscar:" type="text" />
        {userData.rol === ROLES.SUPER_ADMIN ||
        userData.rol === ROLES.CAPIF_ADMIN ? (
          <>
            <select className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
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
      <div className="w-[100%] mt-[2rem]">
        {users.length > 0 && (
          <CustomTable
            columnNames={
              userData.rol === ROLES.SUPER_ADMIN ||
              userData.rol === ROLES.CAPIF_ADMIN
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
              return userData.rol === ROLES.SUPER_ADMIN ||
                userData.rol === ROLES.CAPIF_ADMIN
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
                      toggleDropdown={toggleDropdown}
                      id={element.id_usuario}
                      activeDropdown={activeDropdown}
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
    </CustomLayout>
  );
}

interface ActionDropdownButtonProps {
  toggleDropdown: (id: string) => void;
  id: string;
  activeDropdown: string | null;
}

const ActionDropdownButton: FC<ActionDropdownButtonProps> = ({
  toggleDropdown,
  id,
  activeDropdown,
}) => {
  const router = useRouter();

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  return (
    <div className="px-6 py-4 relative group">
      <button
        onClick={() => toggleDropdown(id)}
        className="bg-[#1280e1] text-white w-[2rem] h-[2rem] flex justify-center items-center rounded-[0.3rem]"
      >
        <IoMdSettings size={20} />
      </button>
      <ul
        className={`absolute right-0 mt-2 w-[8rem] bg-slate-900 border rounded-md shadow-lg z-30 overflow-hidden ${
          activeDropdown === id ? "" : "hidden"
        }`}
      >
        <li
          onClick={() => redirectToOption(`/edit-user/${id}`)}
          className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
        >
          <FaEdit /> <p>Editar</p>
        </li>
      </ul>
    </div>
  );
};
