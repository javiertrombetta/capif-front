"use client";
import React from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";

function page() {
  const dispatch = useAppDispatch();

  const handleAddTerritoriality = () => {
    dispatch(setModal({ type: ModalNames.ADD_TERRITORIALITY, isActive: true }));
  };

  const handleOpenModal = (type: ModalNames) => {
    dispatch(setModal({ type, isActive: true }));
  };

  return (
    <CustomLayout>
      <Header title="Gestionar Territorialidad" />

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
              <CustomButton
                onClick={() =>
                  handleOpenModal(ModalNames.TERRITORIALITY_UNABLE)
                }
                background="warn"
              >
                Desactivar
              </CustomButton>,
            ],
            [
              "AR",
              "Argentina",
              "ACTIVO",
              <CustomButton
                onClick={() =>
                  handleOpenModal(ModalNames.TERRITORIALITY_UNABLE)
                }
                background="warn"
              >
                Desactivar
              </CustomButton>,
            ],
            [
              "UR",
              "Uruguay",
              "ACTIVO",
              <CustomButton
                onClick={() =>
                  handleOpenModal(ModalNames.TERRITORIALITY_UNABLE)
                }
                background="warn"
              >
                Desactivar
              </CustomButton>,
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
