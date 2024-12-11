"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
function page() {
  const dispatch = useAppDispatch();

  const openImportPayment = () => {
    dispatch(
      setModal({
        isActive: true,
        type: ModalNames.CASHFLOW_IMPORT_PAYMENT,
      })
    );
  };
  const openExportPayments = () => {
    dispatch(
      setModal({
        isActive: true,
        type: ModalNames.CASHFLOW_EXPORT_PAYMENTS,
      })
    );
  };

  return (
    <CustomLayout>
      <Header title="Pagos" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-between items-end mt-[2rem]">
        <div className="flex gap-[2rem]">
          <CustomInput type="text" label="Buscar Productora" />
          <CustomInput className="w-[13rem]" type="date" label="Fecha" />
        </div>

        <div className="flex gap-[2rem]">
          <CustomButton onClick={openImportPayment}>Importar Pago</CustomButton>
          <CustomButton onClick={openExportPayments}>
            Exportar Pagos
          </CustomButton>
        </div>
      </div>

      <div className="mt-[2rem] w-[100%]">
        <CustomTable
          columnNames={[
            { name: "CUIT", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "CUENTA CORRIENTE", isSortable: true },
            { name: "PAGO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "RETENCIÓN", isSortable: false },
            { name: "CONCEPTO", isSortable: true },
          ]}
          columnValues={[
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
            [
              "12-12345-98",
              "AR645732",
              "123465789",
              "$3.500",
              "22/08/24",
              "SI",
              "Pagado",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
