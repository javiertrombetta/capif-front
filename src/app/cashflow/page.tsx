"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import CashflowImportModal from "@/components/Modals/CashflowImportModal/CashflowImportModal";
import useModal from "@/hooks/useModal";
import { getCashflow } from "@/services/cashflow";
import { GetCashflowResponse } from "@/types/cashflow";
import { useAppSelector } from "@/hooks/storeHooks";

const initialValues = {
  cuit: "",
  productora_id: "",
  fecha_desde: "",
  fecha_hasta: "",
};

function page() {
  const { openModal } = useModal();
  const router = useRouter();
  const { vistas } = useAppSelector((state) => state.auth);

  const [transactions, setTransactions] = useState<
    GetCashflowResponse["cashflows"]
  >([]);
  const [loading, setLoading] = useState(true);

  const handleOnSubmit = async (values: typeof initialValues) => {
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
          <Form className="h-[4rem] w-[100%] max-w-[20rem] flex items-end gap-[2rem] mt-[1rem] px-[2rem]">
            <CustomSearchField
              id="cuit"
              name="cuit"
              labelText="CUIT"
              type="text"
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
                { name: "PRODUCTORA", isSortable: true },
                { name: "CUIT", isSortable: true },
                { name: "SALDO ACTUAL", isSortable: true },
                { name: "FECHA", isSortable: true },
                { name: "ACCIÓN", isSortable: false },
              ]}
              columnValues={transactions.map((t) => [
                t.productoraDeCC?.nombre_productora || "",
                t.productoraDeCC?.cuit_cuil || "",
                t.saldo_actual_productora ?? "",
                new Date(t.createdAt).toLocaleString(),
                <ActionDropdownButton
                  menuOptions={[
                    {
                      label: "Ver Transacciones",
                      onClick: () =>
                        router.push(
                          `/cashflow/transactions?productora_id=${t.productora_id}`
                        ),
                    },
                  ]}
                />,
              ])}
            />
          ) : (
            <div className="text-black justify-self-center pt-[4rem]">
              No se encontraron datos
            </div>
          )}
        </div>
      </div>
      {vistas.some((v) => v.nombre === "Procesar Archivos") && (
        <div className="w-[100%] py-[1rem] px-[2rem] flex items-center justify-start space-x-[0.5rem]">
          <p className="text-black font-bold">PROCESAR: </p>
          <CustomButton
            onClick={() => openModal(<CashflowImportModal type="TRANSFERS" />)}
          >
            TRASPASOS
          </CustomButton>
          <CustomButton
            onClick={() =>
              openModal(<CashflowImportModal type="SETTLEMENTS" />)
            }
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
      )}
    </CustomLayout>
  );
}

export default page;
