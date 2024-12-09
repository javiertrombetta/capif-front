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

  const openImportRejections = () => {
    dispatch(
      setModal({
        isActive: true,
        type: ModalNames.CASHFLOW_IMPORT_REJECTIONS,
      })
    );
  };
  const openExportRejections = () => {
    dispatch(
      setModal({
        isActive: true,
        type: ModalNames.CASHFLOW_EXPORT_REJECTIONS,
      })
    );
  };

  const openModalReversePayment = () => {
    dispatch(
      setModal({
        isActive: true,
        type: ModalNames.CASHFLOW_EXPORT_REJECTIONS_REVERSE_PAYMENT,
      })
    );
  };

  return (
    <CustomLayout>
      <Header back title="Rechazos" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-between mt-[2rem]">
        <div className="flex gap-[2rem]">
          <CustomInput type="text" label="Buscar Productora" />
          <CustomInput className="w-[13rem]" type="date" label="Fecha" />
        </div>

        <div className="flex gap-[2rem]">
          <CustomButton onClick={openImportRejections}>
            Importar Rechazo
          </CustomButton>
          <CustomButton onClick={openExportRejections}>
            Exportar Rechazos
          </CustomButton>
        </div>
      </div>

      <div className="mt-[2rem] w-[100%]">
        <CustomTable
          columnNames={[
            { name: "PRODUCTORA", isSortable: true },
            { name: "CUIT", isSortable: true },
            { name: "MONTO", isSortable: true },
            { name: "NRO. PAGO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "ESTADO", isSortable: true },
            { name: "ACCIÓN", isSortable: true },
          ]}
          columnValues={[
            [
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "6521849",
              "05/08/24",
              "PAGADO",
              <CustomButton onClick={openModalReversePayment}>
                Reversar Pago
              </CustomButton>,
            ],
            [
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "6521849",
              "05/08/24",
              "REVERSADO",
              <CustomButton onClick={openModalReversePayment}>
                Reversar Pago
              </CustomButton>,
            ],
            [
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "6521849",
              "05/08/24",
              "PAGADO",
              <CustomButton onClick={openModalReversePayment}>
                Reversar Pago
              </CustomButton>,
            ],
            [
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "6521849",
              "05/08/24",
              "REVERSADO",
              <CustomButton onClick={openModalReversePayment}>
                Reversar Pago
              </CustomButton>,
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
