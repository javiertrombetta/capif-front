"use client";
import React, { FC, useState } from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES_NOMBRES } from "@/types/auth.types";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { FaEdit, FaMusic, FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { getPendingApplications } from "@/services/users";
import { ProductionCompanyResponse } from "@/types/productionCompany.types";

export default function page() {
  const userData = useAppSelector((state) => state.auth);

  const [productionCompanies, setProductionCompanies] = useState<
    ProductionCompanyResponse[] | null
  >(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value === "pendientes_registro") {
      const results = await getPendingApplications();
      setProductionCompanies(results);
    }
  };

  return (
    <div className="h-[100vh] w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
      <Header title="Buscar Productora" />

      <div className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
        <CustomInput label="Buscar:" type="text" />
        {userData.rol_nombre === ROLES_NOMBRES.SUPER_ADMIN ||
        userData.rol_nombre === ROLES_NOMBRES.CAPIF_ADMIN ? (
          <>
            <select
              onChange={handleSelectChange}
              className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
            >
              <option value={"registrados"}>Registrados</option>
              <option value={"pendientes_registro"}>
                Pendientes de Registro
              </option>
              <option value={"incompleto"}>Incompleto</option>
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
      {productionCompanies && productionCompanies.length > 0 ? (
        <CustomTable
          columnNames={[
            { name: "EMAIL", isSortable: true },
            { name: "CUIT", isSortable: true },
            { name: "RAZON SOCIAL/NOMBRE", isSortable: true },
            { name: "TELÉFONO", isSortable: true },
            { name: "SELLO", isSortable: true },
            { name: "FONOGRAMAS", isSortable: true },
            { name: "FECHA CREACIÓN", isSortable: true },
            { name: "FECHA ACTUALIZACIÓN", isSortable: true },
            { name: "ISRC AUDIO", isSortable: true },
            { name: "ISRC VIDEO", isSortable: true },
            { name: "ACCIÓN", isSortable: false },
          ]}
          columnValues={productionCompanies?.map((element) => {
            return [
              element.email,
              "",
              "",
              element.telefono,
              "",
              "",
              `${element.createdAt}`,
              `${element.updatedAt}`,
              "",
              "",
              <ActionDropdownButton
                toggleDropdown={toggleDropdown}
                id={element.id_usuario}
                activeDropdown={activeDropdown}
              />,
            ];
          })}
        />
      ) : null}

      <div className="w-[100%] mt-[2rem] mb-[2rem] pr-[2rem] pl-[2rem] flex justify-end">
        <CustomButton>Descargar CVS</CustomButton>
      </div>
    </div>
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
          onClick={() => redirectToOption("/edit-user")}
          className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
        >
          <FaEdit /> <p>Editar</p>
        </li>
        <li
          onClick={() => redirectToOption(`/user-profile/${id}`)}
          className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
        >
          <FaUserAlt /> <p>Ficha</p>
        </li>
        <li
          onClick={() => redirectToOption("/edit-user")}
          className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
        >
          <FaMusic /> <p>Repertorio</p>
        </li>
      </ul>
    </div>
  );
};
