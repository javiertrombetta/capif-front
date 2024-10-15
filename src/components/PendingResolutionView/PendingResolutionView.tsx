"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import {
  FaSearch,
  FaRegHandPaper,
  FaEye,
  FaQuestionCircle,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import CustomTable from "@/commons/CustomTable/CustomTable";

const PendingResolutionView: FC = () => {
  const router = useRouter();

  const DropdownButton: FC = () => {
    const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
    return (
      <div className="ml-[0.6rem]">
        <button
          onClick={() => {
            setActiveDropdown((prevState: boolean) => !prevState);
          }}
          className="bg-[#1280e1] text-white w-[2rem] h-[2rem] flex justify-center items-center rounded-[0.3rem]"
        >
          <IoMdSettings size={20} />
        </button>
        <ul
          className={`absolute right-20 mt-2 w-[8rem] bg-slate-900 border rounded-md shadow-lg z-30 overflow-hidden ${
            activeDropdown ? "" : "hidden"
          }`}
        >
          <li
            onClick={() => router.push("/admin/conflict-auto-resolution")}
            className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
          >
            <IoMdSettings /> <p>Automática</p>
          </li>
          <li
            onClick={() => router.push("/admin/conflict-manual-resolution")}
            className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
          >
            <FaRegHandPaper /> <p>Manual</p>
          </li>
          <li
            onClick={() => router.push("/admin/conflict")}
            className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
          >
            <FaEye /> <p>Visualizar</p>
          </li>
          <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]">
            <FaQuestionCircle size={23} /> <p>¿Quién respondió?</p>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <CustomLayout>
      <Header title="Conflictos Pendientes de Resolución" />
      <div className="mt-[2rem] w-[100%] flex justify-center items-center gap-[2rem] pl-[2rem] pr-[2rem]">
        <CustomInput
          className="w-[100%]"
          containerClassName="grow"
          label="NRO. CONFLICTO"
          type="text"
        />
        <CustomInput
          className="w-[100%]"
          containerClassName="grow"
          label="FECHA INICIO DESDE"
          type="text"
        />
        <CustomInput
          className="w-[100%]"
          containerClassName="grow"
          label="FECHA INICIO HASTA"
          type="text"
        />
        <CustomInput
          className="w-[100%]"
          containerClassName="grow"
          label="ESTADO"
          type="text"
        />
      </div>
      <div className="flex flex-col items-center gap-[2rem] mt-[1rem] w-[100%] pr-[2rem] pl-[2rem]">
        <CustomInput
          containerClassName="grow w-[100%]"
          className="grow w-[100%]"
          label="PARTES"
          type="text"
        />
        <div className="w-[100%] flex justify-center items-center gap-[2rem]">
          <button className="text-white w-[100%] h-[2.5rem] bg-mainblue text-[1rem] font-bold flex justify-center items-center gap-[0.3rem]">
            <FaSearch />
            Buscar
          </button>
        </div>

        <div className="w-[100%]">
          <CustomTable
            columnNames={[
              "#",
              "FECHA INICIO",
              "FECHA VENCIMIENTO",
              "ESTADO",
              "ACCIÓN",
            ]}
            columnValues={[
              [
                "245",
                "28-11-2022",
                "20-12-2022",
                "Repertorio controvertido",
                <DropdownButton />,
              ],
              [
                "245",
                "28-11-2022",
                "20-12-2022",
                "Repertorio controvertido",
                <DropdownButton />,
              ],
              [
                "245",
                "28-11-2022",
                "20-12-2022",
                "Repertorio controvertido",
                <DropdownButton />,
              ],
            ]}
          />
        </div>
      </div>
    </CustomLayout>
  );
};

export default PendingResolutionView;
