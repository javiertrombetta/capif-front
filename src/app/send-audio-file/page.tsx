"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { ModalNames } from "@/types/modalNames";
import { setModal } from "@/store/modalSlice";

function page() {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleOpenModal = (type: ModalNames) => {
    dispatch(setModal({ type, isActive: true }));
  };

  return (
    <CustomLayout>
      <Header title="Envio Archivo de Audio" />

      <div className="w-[100%] pr-[2rem] pl-[2rem] mt-[2rem] flex items-center justify-start gap-[1rem]">
        <CustomInput type="text" label="Buscar" />
        {userData.rol === ROLES.SUPER_ADMIN ||
        userData.rol === ROLES.CAPIF_ADMIN ? (
          <>
            <select className="text-black border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] w-[15rem] text-black mt-[1.4rem]">
              <option>Pendientes de Envio</option>
              <option>Enviado Sin Audio</option>
              <option>Enviado Con Audio</option>
              <option>Rechazado Por Vericast</option>
              <option>Error En El Envio</option>
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
        ) : null}
      </div>

      <div className="w-[100%] mt-[2rem] pr-[2rem] pl-[2rem]">
        <CustomTable
          columnNames={[
            { name: "", isSortable: false, selectBox: true },
            { name: "TEMA", isSortable: true },
            { name: "ARTISTA", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "SELLO", isSortable: true },
            { name: "TITULAR DERECHO", isSortable: true },
            { name: "AÑO DE PUBLICACIÓN", isSortable: true },
            { name: "ÁLBUM", isSortable: true },
            { name: "ESTADO", isSortable: true },
          ]}
          columnValues={[
            [
              <input type="checkbox" className="scale-[1.5]" />,
              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A. (100%)",
              "2003",
              "Argentina",
              "Enviado",
            ],
            [
              <input type="checkbox" className="scale-[1.5]" />,

              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A. (100%)",
              "2003",
              "Argentina",
              "Enviado",
            ],
            [
              <input type="checkbox" className="scale-[1.5]" />,

              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A. (100%)",
              "2003",
              "Argentina",
              "Enviado",
            ],
          ]}
        />
      </div>
      <div className="w-[100%] pr-[3rem] pl-[3rem] flex justify-end gap-[1rem] items-center mt-[2rem]">
        <CustomButton
          onClick={() => handleOpenModal(ModalNames.SEND_AUDIO_FILE)}
        >
          ENVIAR
        </CustomButton>
        <CustomButton
          onClick={() => handleOpenModal(ModalNames.SEND_AUDIO_REJECT)}
          background="warn"
        >
          RECHAZAR
        </CustomButton>
        <CustomButton
          onClick={() => handleOpenModal(ModalNames.SEND_AUDIO_SET_ERROR_SEND)}
          background="warn"
        >
          ERROR EN EL ENVIO
        </CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;
