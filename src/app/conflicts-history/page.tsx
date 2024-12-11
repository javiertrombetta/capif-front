"use client";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import React, { FC, useState } from "react";
import { IoMdSettings } from "react-icons/io";

function page() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <CustomLayout>
      <Header title="Titulares de Conflicto" />

      <div className="w-[100%] flex items-center pr-[2rem] pl-[2rem] mt-[2rem] gap-[1rem]">
        <CustomInput type="text" label="Buscar Productora" />

        <select className="w-[13rem] mt-[1.5rem] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
          <option>PENDIENTE </option>
          <option>RESPONDIDO</option>
          <option>DESISTIDO</option>
          <option>MODIFICADO </option>
          <option>RETIRADO</option>
          <option>ACEPTADO</option>
        </select>
      </div>

      <div className="mt-[2rem] w-[100%]">
        <CustomTable
          columnNames={[
            {
              name: "PRODUCTORA",
              isSortable: true,
            },
            { name: "ISRC", isSortable: true },
            { name: "ESTADO", isSortable: true },
            { name: "DOCUMENTACIÓN ENVIADA", isSortable: true },
            { name: "PORCENTAJE DECLARADO", isSortable: true },
            { name: "PORCENTAJE DEFINITIVO", isSortable: true },
            { name: "ACCIÓN", isSortable: false },
          ]}
          columnValues={[
            [
              "Sony Music",
              "AR6548646",
              "PENDIENTE DE RESPUESTA",
              "NO",
              "50%",
              "50%",
              <ActionDropdownButton
                toggleDropdown={toggleDropdown}
                id={1}
                activeDropdown={activeDropdown}
              />,
            ],
            [
              "Sony Music",
              "AR6548646",
              "PENDIENTE DE RESPUESTA",
              "NO",
              "50%",
              "50%",
              <ActionDropdownButton
                toggleDropdown={toggleDropdown}
                id={2}
                activeDropdown={activeDropdown}
              />,
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;

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
        <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]">
          <p>Modificar</p>
        </li>
        <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]">
          <p>Aceptar</p>
        </li>
        <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]">
          <p>Quitar</p>
        </li>
      </ul>
    </div>
  );
};
