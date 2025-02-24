"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import { getAuditSessions } from "@/services/audits";
import { GetAuditSessionsResponse } from "@/types/audits.types";

const initialValues = {
  nombre: "",
  apellido: "",
  email: "",
  fechaDesde: "",
  fechaHasta: "",
};

function page() {
  const [audit, setAudit] = useState<GetAuditSessionsResponse["data"]>([]);
  const [loading, setLoading] = useState(true);

  const handleOnSubmit = async (values: typeof initialValues) => {
    await getAuditSessionsData(values);
  };

  const getAuditSessionsData = async (values?: typeof initialValues) => {
    setLoading(true);
    try {
      const response = await getAuditSessions(values);
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
    getAuditSessionsData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Sesiones Iniciadas" />
      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          <Form className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
            <CustomSearchField
              id="nombre"
              name="nombre"
              type="text"
              labelText="NOMBRE"
            />
            <CustomSearchField
              id="apellido"
              name="apellido"
              type="text"
              labelText="APELLIDO"
            />
            <CustomSearchField
              id="email"
              name="email"
              type="text"
              labelText="EMAIL"
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
                { name: "EMAIL", isSortable: true },
                { name: "NOMBRE", isSortable: true },
                { name: "APELLIDO", isSortable: true },
                { name: "NAVEGADOR", isSortable: true },
                { name: "IP ORIGEN", isSortable: true },
                { name: "FECHA INICIO SESION", isSortable: true },
                { name: "FECHA FIN SESION", isSortable: true },
              ]}
              columnValues={audit.map((a) => [
                a.registranteDeSesion.email,
                a.registranteDeSesion.nombre,
                a.registranteDeSesion.apellido,
                a.navegador,
                a.ip_origen,
                new Date(Date.parse(a.fecha_inicio_sesion)).toLocaleString(),
                a.fecha_fin_sesion
                  ? new Date(Date.parse(a.fecha_fin_sesion)).toLocaleString()
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
