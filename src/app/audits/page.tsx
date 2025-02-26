"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import { getAuditChanges } from "@/services/audits";
import { GetAuditChangesResponse, TIPOS_AUDITORIA } from "@/types/audits.types";
import { formatDate } from "@/utils/formatDate";

const initialValues = {
  emailUsuario: "",
  tipoAuditoria: undefined,
  tablaDb: "",
  fechaDesde: "",
  fechaHasta: "",
};

function page() {
  const [audit, setAudit] = useState<GetAuditChangesResponse["data"]>([]);
  const [loading, setLoading] = useState(true);

  const handleOnSubmit = async (values: typeof initialValues) => {
    await getAuditChangesData(values);
  };

  const getAuditChangesData = async (values?: typeof initialValues) => {
    setLoading(true);
    try {
      const response = await getAuditChanges({
        ...values,
        fechaDesde: values?.fechaDesde ? formatDate(values?.fechaDesde) : "",
        fechaHasta: values?.fechaHasta ? formatDate(values?.fechaHasta) : "",
      });
      setAudit(response);
    } catch (error) {
      toast.error(
        (error as Error).message || "Error al obtener datos de auditoria."
      );
      setAudit([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuditChangesData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Cambios Realizados" />
      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          <Form className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
            <CustomSearchField
              id="emailUsuario"
              name="emailUsuario"
              type="text"
              labelText="EMAIL"
            />
            <CustomSearchField
              id="tipoAuditoria"
              name="tipoAuditoria"
              type="select"
              labelText="TIPO"
              options={[
                { name: "", value: "" },
                ...TIPOS_AUDITORIA.map((e) => ({ name: e, value: e })),
              ]}
            />
            <CustomSearchField
              id="tablaDb"
              name="tablaDb"
              type="text"
              labelText="TABLA DB"
            />
            <CustomSearchField
              id="fechaDesde"
              name="fechaDesde"
              labelText="FECHA CREACIÓN DESDE"
              type="date"
            />
            <CustomSearchField
              id="fechaHasta"
              name="fechaHasta"
              labelText="FECHA CREACIÓN HASTA"
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
          ) : audit.length > 0 ? (
            <CustomTable
              columnNames={[
                { name: "TIPO DE AUDITORIA", isSortable: true },
                { name: "TABLA DB", isSortable: true },
                { name: "DETALLE", isSortable: true },
                { name: "EMAIL USUARIO AUDITADO", isSortable: true },
                { name: "EMAIL USUARIO REGISTRANTE", isSortable: true },
                { name: "FECHA", isSortable: true },
              ]}
              columnValues={audit.map((a) => [
                a.tipo_auditoria,
                a.modelo,
                a.detalle,
                a.usuarioAuditado?.email || "",
                a.registranteDeAuditoria.email,
                new Date(Date.parse(a.createdAt)).toLocaleString(),
              ])}
            />
          ) : (
            <div className="text-black justify-self-center pt-[4rem]">
              No se encontraron datos
            </div>
          )}
        </div>
      </div>
    </CustomLayout>
  );
}

export default page;
