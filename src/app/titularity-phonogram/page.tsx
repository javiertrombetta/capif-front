"use client";
import React, { FC, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/navigation";
import CustomInput from "@/commons/CustomInput/CustomInput";

function page() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const toggleDropdown = (id: number) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  return (
    <CustomLayout>
      <Header back title="Titularidad" />
      <div className="w-[100%] mt-[1rem] flex justify-end items-center pr-[2rem]">
        <CustomButton>Agregar Titular</CustomButton>
      </div>
      <div className="w-[100%] mt-[1rem] flex flex-col justify-center items-center">
        <p className="text-black font-bold text-[1.3rem]">Cae el Sol</p>
        <p className="text-black font-bold text-[1.3rem]">Airbag</p>
        <p className="text-black font-bold text-[1.3rem]">2011</p>
        <p className="text-black font-bold text-[1.3rem]">SEBGA2100115</p>
      </div>

      <div className="w-[100%] mt-[1rem] flex flex-col justify-center items-center">
        <p className="text-black font-bold text-[1.3rem]">
          Total Acumulado: 100%
        </p>
      </div>

      <div className="w-[100%] mt-[1rem] flex justify-start items-center pl-[2rem]">
        <CustomInput label="Buscar Titular" type="text" />
      </div>

      <div className="mt-[1rem] w-[100%] flex flex-col justify-center items-center gap-[3rem] mb-[3rem]">
        <CustomTable
          columnNames={[
            { name: "PRODUCTORA", isSortable: true },
            { name: "PORCENTAJE", isSortable: true },
            { name: "REGISTRO DESDE", isSortable: true },
            { name: "REGISTRO HASTA", isSortable: true },
            { name: "ACCIÓN", isSortable: false },
          ]}
          columnValues={[
            [
              "Warner",
              "33.33%",
              "12/10/2020",
              "16/07/2030",
              <ActionDropdownButton
                redirectToOption={redirectToOption}
                toggleDropdown={toggleDropdown}
                id={1}
                activeDropdown={activeDropdown}
              />,
            ],
            [
              "Sony Music",
              "33.33%",
              "12/10/2020",
              "16/07/2030",
              <ActionDropdownButton
                redirectToOption={redirectToOption}
                toggleDropdown={toggleDropdown}
                id={2}
                activeDropdown={activeDropdown}
              />,
            ],
            [
              "Columbia Records",
              "33.33%",
              "12/10/2020",
              "16/07/2030",
              <ActionDropdownButton
                redirectToOption={redirectToOption}
                toggleDropdown={toggleDropdown}
                id={3}
                activeDropdown={activeDropdown}
              />,
            ],
          ]}
        />
      </div>
      <div className="mt-[3rem] w-[100%] flex justify-center gap-[2rem]">
        <CustomButton>Guardar</CustomButton>
        <CustomButton>Cancelar</CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;

interface ActionDropdownButtonProps {
  toggleDropdown: (id: number) => void;
  id: number;
  activeDropdown: number | null;
  redirectToOption: (route: string) => void;
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
        <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]">
          <p>Editar</p>
        </li>
        <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]">
          <p>Quitar</p>
        </li>
      </ul>
    </div>
  );
};
