"use client";
import React, { FC } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";

function page() {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleOpenModal = (modalType: ModalNames) => {
    dispatch(setModal({ isActive: true, type: modalType }));
  };

  const menuOptions = [
    ...(authData.rol === ROLES.SUPER_ADMIN || authData.rol === ROLES.CAPIF_ADMIN
      ? [
          {
            label: "Otorgar Prórroga",
            onClick: () =>
              handleOpenModal(ModalNames.CONFLICTS_GRANT_EXTENSION),
          },
          {
            label: "Ver Titulares",
            onClick: () => router.push("/conflicts-history"),
          },
        ]
      : []),
    ...(authData.rol === ROLES.USER_PRODUCER || authData.rol === ROLES.EMPLOYEE
      ? [
          {
            label: "Confirmar Porcentaje",
            onClick: () =>
              handleOpenModal(ModalNames.CONFLICTS_CONFIRM_PERCENTAGE),
          },
          {
            label: "Enviar Documentación",
            onClick: () =>
              handleOpenModal(ModalNames.CONFLICTS_SEND_DOCUMENTATION),
          },
        ]
      : []),
    {
      label: "Desistir conflicto",
      onClick: () => handleOpenModal(ModalNames.CONFLICTS_DESIST),
    },
  ];

  return (
    <CustomLayout>
      <Header title="Conflictos" />

      <SearchConflictForm />

      <div className="w-[100%] mt-[2rem] pr-[2rem] pl-[2rem] overflow-y-auto">
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
              <ActionDropdownButton menuOptions={menuOptions} />,
            ],
            [
              "SONY MUSIC",
              "ARF100300069",
              "21/11/24",
              "21/11/24",
              "Resuelto",
              <ActionDropdownButton menuOptions={menuOptions} />,
            ],
            [
              "SONY MUSIC",
              "ARF100300069",
              "21/11/24",
              "21/11/24",
              "Resuelto",
              <ActionDropdownButton menuOptions={menuOptions} />,
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;

const SearchConflictForm: FC = () => {
  const authData = useAppSelector((state) => state.auth);

  // const handleSearchButton = () => {
  //   dispatch(
  //     setModal({ isActive: true, type: ModalNames.SEARCH_CONFLICTS_FILTERS })
  //   );
  // };

  return (
    <div className="w-[100%]  mt-[2rem] flex flex-col gap-[1rem]">
      {authData.rol === ROLES.CAPIF_ADMIN ||
      authData.rol === ROLES.SUPER_ADMIN ? (
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
          <select className="w-[100%] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem]">
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
