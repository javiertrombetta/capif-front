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
import useModal from "@/hooks/useModal";
import { getCashflowTransactions } from "@/services/cashflow";
import {
  GetCashflowTransactionsResponse,
  TIPOS_TRANSACCION,
} from "@/types/cashflow";
import { useSearchParams } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CashflowTransactionDetailsModal from "@/components/Modals/CashflowTransactionDetailsModal/CashflowTransactionDetailsModal";

const initialValues = {
  cuit: "",
  tipo_transaccion: undefined,
  fecha_desde: "",
  fecha_hasta: "",
};

function page() {
  const searchParams = useSearchParams();
  const { openModal } = useModal();
  const [transactions, setTransactions] = useState<
    GetCashflowTransactionsResponse["transactions"]
  >([]);
  const [loading, setLoading] = useState(true);

  const handleOnSubmit = async (values: typeof initialValues) => {
    await getCashflowData(values);
  };

  const getCashflowData = async (values?: typeof initialValues) => {
    console.log(searchParams.get("productora_id"));
    setLoading(true);
    try {
      const response = await getCashflowTransactions({
        ...values,
        productora_id: searchParams.get("productora_id") || "",
      });
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
                { name: "ACCIÓN", isSortable: false },
              ]}
              columnValues={transactions.map((t) => [
                t.tipo_transaccion,
                t.monto,
                t.saldo_resultante ?? "",
                t.referencia ?? "",
                t.fecha_transaccion,
                <ActionDropdownButton
                  menuOptions={[
                    {
                      label: "Ver detalles",
                      onClick: () => {
                        openModal(
                          <CashflowTransactionDetailsModal
                            type={t.tipo_transaccion}
                            transaction={t}
                          />
                        );
                      },
                    },
                  ]}
                />,
              ])}
            />
          ) : (
            <div className="text-black justify-self-center pt-[4rem]">
              No se encontraron transacciones
            </div>
          )}
        </div>
      </div>
    </CustomLayout>
  );
}

export default page;
