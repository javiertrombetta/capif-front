"use client";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import React from "react";

function page() {
  const dispatch = useAppDispatch();

  const handleAddTerritoriality = () => {
    dispatch(setModal({ type: ModalNames.ADD_TERRITORIALITY, isActive: true }));
  };

  return (
    <CustomLayout>
      <Header back title="Gestionar Territorialidad" />

      <div className="w-[100%] pl-[3rem] pr-[3rem] mt-[2rem]">
        <CustomTable
          columnNames={[
            {
              name: "ISO",
              isSortable: true,
            },

            {
              name: "PAÍS",
              isSortable: true,
            },
            {
              name: "ESTADO",
              isSortable: true,
            },
            {
              name: "ACCIÓN",
              isSortable: true,
            },
          ]}
          columnValues={[
            [
              "UK",
              "Reino Unido",
              "ACTIVO",
              <CustomButton>Desactivar</CustomButton>,
            ],
            [
              "AR",
              "Argentina",
              "ACTIVO",
              <CustomButton>Desactivar</CustomButton>,
            ],
            [
              "UR",
              "Uruguay",
              "ACTIVO",
              <CustomButton>Desactivar</CustomButton>,
            ],
          ]}
        />
      </div>

      <div className="w-[100%] pr-[2rem] pl-[3rem] flex justify-end mt-[3rem] gap-[1rem]">
        <CustomButton onClick={handleAddTerritoriality}>
          Agregar Territorio
        </CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;
