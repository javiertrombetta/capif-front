"use client";
import React from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useDispatch } from "react-redux";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";

function page() {
  const dispatch = useDispatch();
  const openImportModal = () => {
    dispatch(setModal({ type: ModalNames.CASHFLOW_TRANSFERS, isActive: true }));
  };

  const openExportModal = () => {
    dispatch(
      setModal({ type: ModalNames.CASHFLOW_TRANSFERS_EXPORT, isActive: true })
    );
  };

  return (
    <CustomLayout>
      <Header title="Traspasos" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-between items-end mt-[2rem]">
        <div className="flex gap-[2rem]">
          <CustomInput type="text" label="Buscar Productora" />
          <CustomInput className="w-[13rem]" type="date" label="Fecha" />
        </div>
        <div className="flex gap-[2rem]">
          <CustomButton onClick={openImportModal}>
            Importar Traspaso
          </CustomButton>
          <CustomButton onClick={openExportModal}>
            Exportar Traspasos
          </CustomButton>
        </div>
      </div>
      <div className="w-[100%] mt-[3rem]">
        <CustomTable
          columnNames={[
            { name: "NRO. TRASPASO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "CUIT ORIGEN", isSortable: true },
            { name: "CUIT DESTINO", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "PORCENTAJE DE TRASPASO", isSortable: true },
            { name: "MONTO", isSortable: true },
            { name: "NUMERO DE LIQUIDACIÓN", isSortable: true },
          ]}
          columnValues={[
            [
              "9379018",
              "05/04/24",

              "12-562856-95",
              "65-985624-52",
              "AR654987",
              "100%",
              "$1.500",
              "65321897",
            ],
            [
              "9379018",
              "05/04/24",
              "12-562856-95",
              "65-985624-52",
              "-",
              "-",
              "$1.500",
              "65321897",
            ],
            [
              "9379018",
              "05/04/24",
              "12-562856-95",
              "65-985624-52",
              "AR654987",
              "100%",
              "$1.500",
              "65321897",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}
export default page;
