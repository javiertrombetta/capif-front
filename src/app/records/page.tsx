"use client";
import React, { FC, useState } from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { IoMdSettings } from "react-icons/io";
import { FaEdit, FaMusic, FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function page() {
  const userData = useAppSelector((state) => state.user);

  const fakeData = [
    {
      id: 1,
      email: "admin@gmail.com",
      cuit: "12-34567-8",
      name: "JUAN JORGE LOPEZ",
      phone: "12345678",
      stamp: "GALAXIAS CREATIVAS",
      phonograms: 0,
      creationDate: "2024/09/10",
      updateDate: "2024/09/11",
      isrcAudio: "0XX",
      isrcVideo: "WG5",
    },
    {
      id: 2,
      email: "admin@gmail.com",
      cuit: "12-34567-8",
      name: "JUAN JORGE LOPEZ",
      phone: "12345678",
      stamp: "GALAXIAS CREATIVAS",
      phonograms: 0,
      creationDate: "2024/09/10",
      updateDate: "2024/09/11",
      isrcAudio: "0XX",
      isrcVideo: "WG5",
    },
  ];
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const toggleDropdown = (id: number) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <div className="h-[100vh] w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <Header back title="Registros" />

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
        <CustomTable
          columnNames={
            userData.rol === ROLES.SUPER_ADMIN ||
            userData.rol === ROLES.CAPIF_ADMIN
              ? [
                  { name: "EMAIL", isSortable: true },
                  { name: "CUIT", isSortable: true },
                  { name: "NOMBRE COMPLETO", isSortable: true },
                  { name: "TELÉFONO", isSortable: true },
                  { name: "SELLO", isSortable: true },
                  { name: "FECHA CREACIÓN", isSortable: true },
                  { name: "FECHA ACTUALIZACIÓN", isSortable: true },
                  { name: "ACCIÓN", isSortable: false },
                ]
              : [
                  { name: "EMAIL", isSortable: true },
                  { name: "CUIT", isSortable: true },
                  { name: "NOMBRE COMPLETO", isSortable: true },
                  { name: "TELÉFONO", isSortable: true },
                  { name: "SELLO", isSortable: true },
                  { name: "FECHA CREACIÓN", isSortable: true },
                  { name: "FECHA ACTUALIZACIÓN", isSortable: true },
                ]
          }
          columnValues={fakeData.map((element) => {
            return userData.rol === ROLES.SUPER_ADMIN ||
              userData.rol === ROLES.CAPIF_ADMIN
              ? [
                  element.email,
                  element.cuit,
                  element.name,
                  element.phone,
                  element.stamp,
                  element.creationDate,
                  element.updateDate,
                  <ActionDropdownButton
                    toggleDropdown={toggleDropdown}
                    id={element.id}
                    activeDropdown={activeDropdown}
                  />,
                ]
              : [
                  element.email,
                  element.cuit,
                  element.name,
                  element.phone,
                  element.stamp,
                  element.creationDate,
                  element.updateDate,
                ];
          })}
        />
      </div>
    </div>
  );
}

interface ActionDropdownButtonProps {
  toggleDropdown: (id: number) => void;
  id: number;
  activeDropdown: number | null;
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
        <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]">
          <FaEdit /> <p>Editar</p>
        </li>
        <li
          onClick={() => redirectToOption("/user-profile")}
          className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
        >
          <FaUserAlt /> <p>Ficha</p>
        </li>
        <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]">
          <FaMusic /> <p>Repertorio</p>
        </li>
      </ul>
    </div>
  );
};
