"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import CashflowImportModal from "@/components/Modals/CashflowImportModal/CashflowImportModal";
import useModal from "@/hooks/useModal";
import { getCashflow } from "@/services/cashflow";
import { GetCashflowResponse, TIPOS_TRANSACCION } from "@/types/cashflow";

const initialValues = {
  cuit: "",
  tipo_transaccion: undefined,
  fecha_desde: "",
  fecha_hasta: "",
};

function page() {
  const { openModal } = useModal();
  const [transactions, setTransactions] = useState<
    GetCashflowResponse["transactions"]
  >([]);
  const [loading, setLoading] = useState(true);

  const handleOnSubmit = async (values: typeof initialValues) => {
    console.log("refresh");
    await getCashflowData(values);
  };

  const getCashflowData = async (values?: typeof initialValues) => {
    setLoading(true);
    try {
      const response = await getCashflow(values);
      setTransactions(response);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener las transacciones");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCashflowData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Resumen de Cuenta" />
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          <Form className="h-[4rem] w-[100%] flex items-end gap-[2rem] mt-[1rem] px-[2rem]">
            <CustomSearchField
              id="cuit"
              name="cuit"
              labelText="CUIT"
              type="text"
            />
            <CustomSearchField
              id="tipo_transaccion"
              name="tipo_transaccion"
              labelText="TIPO TRANSACCIÓN"
              type="select"
              options={[
                { name: "", value: "" },
                ...TIPOS_TRANSACCION.map((t) => ({ name: t, value: t })),
              ]}
            />
            <CustomSearchField
              id="fecha_desde"
              name="fecha_desde"
              labelText="FECHA DESDE"
              type="date"
            />
            <CustomSearchField
              id="fecha_hasta"
              name="fecha_hasta"
              labelText="FECHA HASTA"
              type="date"
            />
            <CustomButton type="submit">Buscar</CustomButton>
          </Form>
        </Formik>
        <div className="w-[100%] mt-[2rem] flex-1 overflow-y-auto">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner color="black" />
            </div>
          ) : transactions.length > 0 ? (
            <CustomTable
              columnNames={[
                { name: "TIPO", isSortable: true },
                { name: "MONTO", isSortable: true },
                { name: "SALDO RESULTANTE", isSortable: true },
                { name: "REFERENCIA", isSortable: false },
                { name: "FECHA TRANSACCIÓN", isSortable: true },
              ]}
              columnValues={transactions.map((t) => [
                t.tipo_transaccion,
                t.monto,
                t.saldo_resultante ?? "",
                t.referencia ?? "",
                t.fecha_transaccion,
              ])}
            />
          ) : (
            <div className="text-black justify-self-center pt-[4rem]">
              No se encontraron transacciones
            </div>
          )}
        </div>
      </div>
      <div className="w-[100%] py-[1rem] px-[2rem] flex items-center justify-start space-x-[0.5rem]">
        <p className="text-black font-bold">PROCESAR: </p>
        <CustomButton
          onClick={() => openModal(<CashflowImportModal type="TRANSFERS" />)}
        >
          TRASPASOS
        </CustomButton>
        <CustomButton
          onClick={() => openModal(<CashflowImportModal type="SETTLEMENTS" />)}
        >
          LIQUIDACIONES
        </CustomButton>
        <CustomButton
          onClick={() =>
            openModal(<CashflowImportModal type="REPRODUCTIONS" />)
          }
        >
          PASADAS
        </CustomButton>
        <CustomButton
          onClick={() => openModal(<CashflowImportModal type="REJECTIONS" />)}
        >
          RECHAZOS
        </CustomButton>
        <CustomButton
          onClick={() => openModal(<CashflowImportModal type="PAYMENTS" />)}
        >
          PAGOS
        </CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;
