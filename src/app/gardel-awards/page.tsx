"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import React from "react";

function page() {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(setModal({ type: ModalNames.GARDEL_AWARDS, isActive: true }));
  };

  const openPurgeModal = () => {
    dispatch(
      setModal({ type: ModalNames.GARDEL_AWARDS_PURGE, isActive: true })
    );
  };

  return (
    <CustomLayout>
      <Header title="Premios Gardel" />

      <div className="w-[100%] mt-[2rem] pr-[2rem] pl-[2rem] flex justify-between">
        <CustomInput type="text" label="Buscar Productora" />

        <div className="flex gap-[2rem]">
          <CustomButton onClick={openModal}>Generar Códigos</CustomButton>
          <CustomButton onClick={openPurgeModal}>Depurar Códigos</CustomButton>
        </div>
      </div>

      <div className="w-[100%] mt-[2rem] flex justify-center">
        <CustomTable
          columnNames={[
            {
              name: "PRODUCTORAS",
              isSortable: true,
            },
            {
              name: "ULTIMO FONOGRAMA DECLARADO",
              isSortable: true,
            },
            {
              name: "FECHA ULTIMO FONOGRAMA DECLARADO",
              isSortable: true,
            },
            {
              name: "CÓDIGO",
              isSortable: false,
            },
            {
              name: "FECHA ASIGNACIÓN",
              isSortable: true,
            },
          ]}
          columnValues={[
            ["Sony Music", "AR1723129", "03/10/24", "9823723983", "10/02/24"],
            ["Waner Music", "AR1723129", "03/10/24", "9823723983", "10/02/24"],
            [
              "Universal Records",
              "AR1723129",
              "20/10/24",
              "9823723983",
              "10/02/24",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
