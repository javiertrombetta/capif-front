"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import { NominationsResponse } from "@/types/productionCompany.types";
import {
  getAllNominations,
  getFilteredNominations,
} from "@/services/productionCompanies";
import CustomField from "@/commons/CustomField/CustomField";
import { Form, Formik } from "formik";

interface SearchInitialValues {
  search_name?: string;
  start_date?: Date | string;
  end_date?: Date | string;
}

function page() {
  const dispatch = useAppDispatch();
  const [nominations, setNominations] = useState<NominationsResponse[] | null>(
    null
  );
  const searchInitialValues: SearchInitialValues = {
    search_name: "",
    start_date: "",
    end_date: "",
  };
  const openModal = () => {
    dispatch(setModal({ type: ModalNames.GARDEL_AWARDS, isActive: true }));
  };

  const openPurgeModal = () => {
    dispatch(
      setModal({ type: ModalNames.GARDEL_AWARDS_PURGE, isActive: true })
    );
  };

  const handleGetAllNominations = async () => {
    const response = await getAllNominations();
    setNominations(response);
  };

  const handleGetFilteredNominations = async (values: SearchInitialValues) => {
    const response = await getFilteredNominations({
      productoraName:
        values.search_name && values.search_name.length > 0
          ? values.search_name
          : null,
      startDate: values.start_date instanceof Date ? values.start_date : null,
      endDate: values.end_date instanceof Date ? values.end_date : null,
    });

    setNominations(response);
  };

  useEffect(() => {
    handleGetAllNominations();
  }, []);

  return (
    <CustomLayout>
      <Header title="Premios Gardel" />

      <div className="w-[100%] mt-[2rem] pr-[2rem] pl-[2rem] flex justify-between">
        <Formik initialValues={searchInitialValues} onSubmit={() => {}}>
          {({ values }) => (
            <Form className="flex gap-[1rem]">
              <CustomField
                type="text"
                id="search_name"
                name="search_name"
                labelText="Buscar Productora"
              />
              <CustomField
                type="date"
                id="start_date"
                name="start_date"
                labelText="Fecha Desde"
              />
              <CustomField
                type="date"
                id="end_date"
                name="end_date"
                labelText="Fecha Hasta"
              />
              <CustomButton
                onClick={() => {
                  handleGetFilteredNominations(values);
                }}
                className="mt-[1.43rem]"
              >
                Buscar
              </CustomButton>
            </Form>
          )}
        </Formik>

        <div className="flex gap-[2rem]">
          <CustomButton onClick={openModal}>Generar Códigos</CustomButton>
          <CustomButton background="warn" onClick={openPurgeModal}>
            Depurar Códigos
          </CustomButton>
        </div>
      </div>
      {nominations ? (
        <div className="w-[100%] mt-[2rem] flex justify-center">
          <CustomTable
            columnNames={[
              {
                name: "PRODUCTORAS",
                isSortable: true,
              },
              {
                name: "ULTIMO FONOGRAMA DECLARADO",
                isSortable: true,
              },
              {
                name: "FECHA ULTIMO FONOGRAMA DECLARADO",
                isSortable: true,
              },
              {
                name: "CÓDIGO",
                isSortable: false,
              },
              {
                name: "FECHA ASIGNACIÓN",
                isSortable: true,
              },
            ]}
            columnValues={
              nominations.length > 0
                ? nominations.map((element) => [
                    element.productoraDelPremio.nombre_productora,
                    "AR12312",
                    `${element.productoraDelPremio.fecha_ultimo_fonograma}` ||
                      "",
                    element.codigo_postulacion,
                    element.fecha_asignacion,
                  ])
                : []
            }
          />
        </div>
      ) : null}
    </CustomLayout>
  );
}

export default page;
