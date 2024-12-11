"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ROLES } from "@/types/auth.types";
import { ModalNames } from "@/types/modalNames";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function page() {
  const dispatch = useAppDispatch();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const toggleDropdown = (id: number) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  const openModal = () => {
    dispatch(
      setModal({ isActive: true, type: ModalNames.EXPORT_CHANGES_LIST })
    );
  };

  return (
    <CustomLayout>
      <Header title="Buscar Repertorio" />

      <div className="w-[100%] pr-[2rem] flex justify-end mt-[2rem]">
        <CustomButton onClick={openModal}>Exportar Modificaciones</CustomButton>
      </div>

      {/* <div className="w-[100%] pr-[2rem] pl-[2rem] mt-[2rem]">
        <CustomInput type="text" label="Buscar" />
      </div> */}

      <SearchPhonogramForm />

      <div className="w-[100%] mt-[2rem] pr-[2rem] pl-[2rem]">
        <CustomTable
          columnNames={[
            { name: "TEMA", isSortable: true },
            { name: "ARTISTA", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "SELLO", isSortable: true },
            { name: "AÑO DE PUBLICACIÓN", isSortable: true },
            { name: "ÁLBUM", isSortable: true },
            { name: "ESTADO", isSortable: true },
            { name: "Acción", isSortable: true },
          ]}
          columnValues={[
            [
              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "2003",
              "Argentina",
              "Enviado",
              <ActionDropdownButton
                toggleDropdown={toggleDropdown}
                id={1}
                activeDropdown={activeDropdown}
              />,
            ],
            [
              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "2003",
              "Argentina",
              "Enviado",
              <ActionDropdownButton
                toggleDropdown={toggleDropdown}
                id={2}
                activeDropdown={activeDropdown}
              />,
            ],
            [
              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "2003",
              "Argentina",
              "Enviado",
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

const ActionDropdownButton: FC<ActionDropdownButtonProps> = ({
  toggleDropdown,
  id,
  activeDropdown,
}) => {
  const userData = useAppSelector((state) => state.user);
  const userRol = userData.rol;
  const router = useRouter();

  const renderDropdownMenuItems = () => {
    if (userRol) {
      switch (userRol) {
        case ROLES.SUPER_ADMIN:
          return (
            <>
              <li
                onClick={() => router.push("/edit-phonogram")}
                className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
              >
                <p>Editar</p>
              </li>
              <li
                onClick={() => router.push("/titularity-phonogram")}
                className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
              >
                <p>Titularidad</p>
              </li>
              <li
                onClick={() => router.push("/territoriality-phonogram")}
                className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
              >
                <p>Territorialidad</p>
              </li>
            </>
          );

        case ROLES.CAPIF_ADMIN:
          return (
            <>
              <li
                onClick={() => router.push("/edit-phonogram")}
                className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
              >
                <p>Editar</p>
              </li>

              <li
                onClick={() => router.push("/territoriality-phonogram")}
                className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
              >
                <p>Territorialidad</p>
              </li>
            </>
          );

        case ROLES.USER_PRODUCER:
          return (
            <li
              onClick={() => router.push("/edit-phonogram")}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
            >
              <p>Editar</p>
            </li>
          );

        case ROLES.EMPLOYEE:
          return (
            <li
              onClick={() => router.push("/edit-phonogram")}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
            >
              <p>Editar</p>
            </li>
          );
      }
    } else {
      <></>;
    }
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
        {renderDropdownMenuItems()}
      </ul>
    </div>
  );
};

const SearchPhonogramForm: FC = () => {
  return (
    <div className="w-[100%]  mt-[2rem] flex flex-col gap-[1rem]">
      <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="ORIGEN"
        />
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="PRODUCTOR"
        />
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="TITULAR"
        />
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="AGENTE"
        />
      </div>
      <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="ARTISTA"
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
          label="SELLO"
        />
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="TEMA"
        />
      </div>

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
          label="AÑO DE PUBLICACIÓN"
        />
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
