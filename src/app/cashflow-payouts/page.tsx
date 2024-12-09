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

  const openMatchReportModal = () => {
    dispatch(
      setModal({
        isActive: true,
        type: ModalNames.CASHFLOW_PAYOUTS_MATCH_REPORT,
      })
    );
  };
  const openImportPayoutsModal = () => {
    dispatch(
      setModal({
        isActive: true,
        type: ModalNames.CASHFLOW_PAYOUTS_IMPORT_PAYOUTS,
      })
    );
  };
  return (
    <CustomLayout>
      <Header back title="Liquidaciones" />

      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-between mt-[2rem]">
        <div className="flex gap-[2rem]">
          <CustomInput type="text" label="Buscar Productora" />
          <CustomInput className="w-[13rem]" type="date" label="Fecha" />
        </div>

        <div className="flex gap-[2rem]">
          <CustomButton onClick={openMatchReportModal}>
            Procesar Match Report
          </CustomButton>
          <CustomButton onClick={openImportPayoutsModal}>
            Importar Liquidaciones
          </CustomButton>
        </div>
      </div>

      <div className="mt-[2rem] w-[100%]">
        <CustomTable
          columnNames={[
            { name: "CUIT", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "PASADAS LIQUIDACIÓN", isSortable: true },
            { name: "NOMBRE FONOGRAMA", isSortable: true },
            { name: "ARTISTA", isSortable: true },
            { name: "SELLO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "CUENTA CORRIENTE", isSortable: true },
            { name: "CONCEPTO", isSortable: true },
            { name: "RETENCIÓN IVA", isSortable: false },
            { name: "TIPO", isSortable: true },
          ]}
          columnValues={[
            [
              "15659665",
              "AR651654",
              "-",
              "Cae el Sol",
              "Airbag",
              "Sony Music",
              "13/05/24",
              "98237423",
              "Pago",
              "SI",
              "-",
            ],
            [
              "15659665",
              "AR651654",
              "-",
              "Cae el Sol",
              "Airbag",
              "Sony Music",
              "13/05/24",
              "98237423",
              "Pago",
              "SI",
              "-",
            ],
            [
              "15659665",
              "AR651654",
              "-",
              "Cae el Sol",
              "Airbag",
              "Sony Music",
              "13/05/24",
              "98237423",
              "Pago",
              "SI",
              "-",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
