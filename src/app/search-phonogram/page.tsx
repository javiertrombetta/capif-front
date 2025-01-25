"use client";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
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
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";

function page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { rol } = useAppSelector((state) => state.auth);

  const openModal = () => {
    dispatch(
      setModal({ isActive: true, type: ModalNames.EXPORT_CHANGES_LIST })
    );
  };

  const menuOptions = (id: string) => {
    return [
      {
        label: "Editar",
        onClick: () => {
          router.push("/edit-phonogram/" + id);
        },
      },
      ...(rol === ROLES.SUPER_ADMIN || rol === ROLES.CAPIF_ADMIN
        ? [
            {
              label: "Territorialidad",
              onClick: () => {
                router.push("/territoriality-phonogram/" + id);
              },
            },
          ]
        : []),
      ...(rol === ROLES.SUPER_ADMIN
        ? [
            {
              label: "Titularidad",
              onClick: () => router.push("/titularity-phonogram/" + id),
            },
          ]
        : []),
    ];
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
            { name: "PRODUCTOR", isSortable: true },
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
              <ActionDropdownButton menuOptions={menuOptions("1")} />,
            ],
            [
              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "2003",
              "Argentina",
              "Enviado",
              <ActionDropdownButton menuOptions={menuOptions("2")} />,
            ],
            [
              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "2003",
              "Argentina",
              "Enviado",
              <ActionDropdownButton menuOptions={menuOptions("3")} />,
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;

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
