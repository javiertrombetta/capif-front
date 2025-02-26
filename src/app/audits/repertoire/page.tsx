"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import Spinner from "@/commons/Spinner/Spinner";
import { getAuditRepertoire } from "@/services/audits";
import { GetAuditRepertoireResponse, TIPOS_CAMBIO } from "@/types/audits.types";
import { formatDate } from "@/utils/formatDate";

const initialValues = {
  emailUsuario: "",
  isrc: "",
  productora: "",
  detalle: "",
  tipoCambio: undefined,
  fechaDesde: "",
  fechaHasta: "",
};

function page() {
  const [audit, setAudit] = useState<GetAuditRepertoireResponse["data"]>([]);
  const [loading, setLoading] = useState(true);

  const handleOnSubmit = async (values: typeof initialValues) => {
    await getAuditRepertoireData(values);
  };

  const getAuditRepertoireData = async (values?: typeof initialValues) => {
    setLoading(true);
    try {
      const response = await getAuditRepertoire({
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
    getAuditRepertoireData();
  }, []);
  return (
    <CustomLayout>
      <Header title="Cambios en Repertorios" />
      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          <Form className="w-[100%] flex flex-col space-y-[0.5rem] mt-[1rem] pl-[1rem] pr-[2rem]">
            <div className="w-[100%] flex flex-row space-x-[0.5rem]">
              <CustomSearchField
                id="emailUsuario"
                name="emailUsuario"
                type="text"
                labelText="EMAIL"
              />
              <CustomSearchField
                id="isrc"
                name="isrc"
                type="text"
                labelText="ISRC"
              />
              <CustomSearchField
                id="productora"
                name="productora"
                type="text"
                labelText="PRODUCTORA"
              />
              <CustomSearchField
                id="detalle"
                name="detalle"
                type="text"
                labelText="DETALLE"
              />
            </div>
            <div className="w-[100%] flex flex-row items-end space-x-[0.5rem]">
              <CustomSearchField
                id="tipoCambio"
                name="tipoCambio"
                type="select"
                labelText="TIPO"
                options={[
                  { name: "", value: "" },
                  ...TIPOS_CAMBIO.map((e) => ({ name: e, value: e })),
                ]}
              />
              <CustomSearchField
                id="fechaDesde"
                name="fechaDesde"
                labelText="FECHA DESDE"
                type="date"
              />
              <CustomSearchField
                id="fechaHasta"
                name="fechaHasta"
                labelText="FECHA HASTA"
                type="date"
              />
              <div className="w-[100%] ">
                <CustomButton type="submit">Buscar</CustomButton>
              </div>
            </div>
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
                { name: "EMAIL", isSortable: true },
                { name: "ISRC", isSortable: true },
                { name: "TITULO", isSortable: true },
                { name: "ARTISTA", isSortable: true },
                { name: "PRODUCTORA", isSortable: true },
                { name: "TIPO AUDITORIA", isSortable: true },
                { name: "DETALLE", isSortable: true },
                { name: "FECHA", isSortable: true },
              ]}
              columnValues={audit.map((a) => [
                a.registranteDeRepertorio.email,
                a.fonogramaAuditado.isrc,
                a.fonogramaAuditado.titulo,
                a.fonogramaAuditado.artista,
                a.fonogramaAuditado.productoraDelFonograma.nombre_productora,
                a.tipo_auditoria,
                a.detalle,
                a.createdAt
                  ? new Date(Date.parse(a.createdAt)).toLocaleString()
                  : "",
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
