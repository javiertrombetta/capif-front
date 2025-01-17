"use client";
import React, { useState } from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomTable from "@/commons/CustomTable/CustomTable";
import ActionDropdownButton from "@/commons/ActionDropdownButton/ActionDropdownButton";
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
    {
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
    <div className="h-[100vh] w-[100%] flex flex-col bg-[white] overflow-x-hidden pb-[4rem]">
      <Header title="Registros" />

      <div className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
        <CustomInput label="Buscar:" type="text" />
        {userData.rol === ROLES.SUPER_ADMIN ||
        userData.rol === ROLES.CAPIF_ADMIN ? (
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
