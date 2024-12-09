"use client";
import React, { FC, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { IoMdSettings } from "react-icons/io";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
      <Header back title="Conflictos" />

      <SearchConflictForm />

      <div className="w-[100%] mt-[2rem] pr-[2rem] pl-[2rem]">
        <CustomTable
          columnNames={[
            { name: "Productora", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "Fecha de Inicio", isSortable: true },
            { name: "Fecha de Finalización", isSortable: true },
            { name: "Estado del Conflicto", isSortable: true },
            { name: "Acción", isSortable: false },
          ]}
          columnValues={[
            [
              "SONY MUSIC",
              "ARF100300069",
              "21/11/24",
              "21/11/24",
              "Resuelto",
              <ActionDropdownButton
                toggleDropdown={toggleDropdown}
                id={1}
                activeDropdown={activeDropdown}
              />,
            ],
            [
              "SONY MUSIC",
              "ARF100300069",
              "21/11/24",
              "21/11/24",
              "Resuelto",
              <ActionDropdownButton
                toggleDropdown={toggleDropdown}
                id={2}
                activeDropdown={activeDropdown}
              />,
            ],
            [
              "SONY MUSIC",
              "ARF100300069",
              "21/11/24",
              "21/11/24",
              "Resuelto",
              <ActionDropdownButton
                toggleDropdown={toggleDropdown}
                id={3}
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

const SearchConflictForm: FC = () => {
  const userData = useAppSelector((state) => state.user);

  // const handleSearchButton = () => {
  //   dispatch(
  //     setModal({ isActive: true, type: ModalNames.SEARCH_CONFLICTS_FILTERS })
  //   );
  // };

  return (
    <div className="w-[100%]  mt-[2rem] flex flex-col gap-[1rem]">
      {userData.rol === ROLES.CAPIF_ADMIN ||
      userData.rol === ROLES.SUPER_ADMIN ? (
        <>
          <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ISRC"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ALBUM"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ARTISTA"
            />
          </div>

          <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="PARTES"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="DESDE"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="HASTA"
            />
          </div>
        </>
      ) : null}
      <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <div className="w-[100%]">
          <p className="text-black font-bold">ESTADO</p>
          <select className="w-[100%] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
            <option>PRIMERA INSTANCIA</option>
            <option>PRIMERA PRORROGA</option>
            <option>SEGUNDA INSTANCIA</option>
            <option>SEGUNDA PRORROGA</option>
            <option>VENCIDO</option>
            <option>CERRADO</option>
          </select>
        </div>
      </div>

      <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <button className="text-white w-[100%] h-[2.5rem] bg-mainblue text-[1rem] font-bold flex justify-center items-center gap-[0.3rem]">
          <FaSearch />
          Buscar
        </button>
      </div>
    </div>
  );
};

const ActionDropdownButton: FC<ActionDropdownButtonProps> = ({
  toggleDropdown,
  id,
  activeDropdown,
}) => {
  const userData = useAppSelector((state) => state.user);
  const router = useRouter();
  // const handleOpenModal = (modalType: ModalNames) => {
  //   dispatch(setModal({ isActive: true, type: modalType }));
  // };

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
        {userData.rol === ROLES.SUPER_ADMIN ||
        userData.rol === ROLES.CAPIF_ADMIN ? (
          <>
            <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]">
              <p>Otorgar Prórroga</p>
            </li>
            <li
              onClick={() => router.push("/conflicts-history")}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Ver Titulares</p>
            </li>
          </>
        ) : null}

        {userData.rol === ROLES.USER_PRODUCER ||
        userData.rol === ROLES.EMPLOYEE ? (
          <>
            <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]">
              <p>Confirmar Porcentaje</p>
            </li>
            <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]">
              <p>Enviar Documentación</p>
            </li>
          </>
        ) : null}

        <li className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]">
          <p>Desistir conflicto</p>
        </li>
      </ul>
    </div>
  );
};

/*
 {userData.rol === ROLES.USER_PRODUCER ||
        userData.rol === ROLES.EMPLOYEE ? (
          <>
            <li
              onClick={() => handleOpenModal(ModalNames.FIRST_INSTANCE)}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Primera Instancia</p>
            </li>
            <li
              onClick={() => handleOpenModal(ModalNames.SECOND_INSTANCE)}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Segunda Instancia</p>
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => handleOpenModal(ModalNames.REVISION)}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Revisión</p>
            </li>

            <li
              onClick={() => handleOpenModal(ModalNames.DEFINITION)}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Definición</p>
            </li>
          </>
        )}

*/
