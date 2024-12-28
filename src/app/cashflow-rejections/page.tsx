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

  // const openModalReversePayment = () => {
  //   dispatch(
  //     setModal({
  //       isActive: true,
  //       type: ModalNames.CASHFLOW_EXPORT_REJECTIONS_REVERSE_PAYMENT,
  //     })
  //   );
  // };

  return (
    <CustomLayout>
      <Header title="Rechazos" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-between items-end mt-[2rem]">
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
            { name: "NRO. RECHAZO", isSortable: true },
            { name: "NRO. PAGO", isSortable: true },
            { name: "FECHA", isSortable: true },
            { name: "PRODUCTORA", isSortable: true },
            { name: "CUIT", isSortable: true },
            { name: "MONTO", isSortable: true },
            { name: "ESTADO", isSortable: true },
          ]}
          columnValues={[
            [
              "9823741",
              "6521849",
              "05/08/24",
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "PAGADO",
            ],
            [
              "9823741",
              "6521849",
              "05/08/24",
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "REVERSADO",
            ],
            [
              "9823741",
              "6521849",
              "05/08/24",
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "PAGADO",
            ],
            [
              "9823741",
              "6521849",
              "05/08/24",
              "Sony Music",
              "20-123123-03",
              "$50.000",
              "REVERSADO",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
