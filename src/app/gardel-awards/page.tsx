"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import { NominationsResponse } from "@/types/productionCompany.types";
import { getNominations } from "@/services/producers";
import { Form, Formik } from "formik";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import Spinner from "@/commons/Spinner/Spinner";
import useModal from "@/hooks/useModal";
import GardelAwardsModal from "@/components/Modals/GardelAwardsModal/GardelAwardsModal";
import GardelAwardsPurge from "@/components/Modals/GardelAwardsPurge/GardelAwardsPurge";

function page() {
  const dispatch = useAppDispatch();
  const { vistas } = useAppSelector((state) => state.auth);
  const { openModal } = useModal();
  const [nominations, setNominations] = useState<NominationsResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const searchInitialValues = {
    productoraName: "",
    startDate: "",
    endDate: "",
  };

  const handleOnSubmit = async (values: typeof searchInitialValues) => {
    setLoading(true);
    await getNominationsData(values);
  };

  const getNominationsData = async (values?: typeof searchInitialValues) => {
    setLoading(true);
    try {
      const response = await getNominations(values);
      setNominations(response);
    } catch (error) {
      console.error(error);
      setNominations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNominationsData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Premios Gardel" />
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
        <Formik initialValues={searchInitialValues} onSubmit={handleOnSubmit}>
          {({ submitForm }) => (
            <Form className="h-[4rem] w-[100%] flex items-end gap-[2rem] mt-[1rem] px-[2rem]">
              <CustomSearchField
                type="text"
                id="productoraName"
                name="productoraName"
                labelText="Nombre Productora"
              />
              <CustomSearchField
                type="date"
                id="startDate"
                name="startDate"
                labelText="Fecha Desde"
              />
              <CustomSearchField
                type="date"
                id="endDate"
                name="endDate"
                labelText="Fecha Hasta"
              />
              <CustomButton type="submit">Buscar</CustomButton>
              <div className="flex-1 flex flex-row space-x-[0.5rem] pl-[1rem]">
                {vistas.some((v) => v.nombre === "Crear Postulaciones") && (
                  <CustomButton
                    className="whitespace-nowrap"
                    type="button"
                    onClick={() => {
                      openModal(<GardelAwardsModal onSuccess={submitForm} />);
                    }}
                  >
                    Generar Códigos
                  </CustomButton>
                )}
                {vistas.some((v) => v.nombre === "Purgar Postulaciones") && (
                  <CustomButton
                    className="whitespace-nowrap"
                    type="button"
                    background="warn"
                    onClick={() =>
                      openModal(<GardelAwardsPurge onSuccess={submitForm} />)
                    }
                  >
                    Depurar Códigos
                  </CustomButton>
                )}
              </div>
            </Form>
          )}
        </Formik>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="black" />
          </div>
        ) : nominations ? (
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
                    "",
                    element.productoraDelPremio.fecha_ultimo_fonograma || "",
                    element.codigo_postulacion,
                    new Date(
                      Date.parse(element.fecha_asignacion.toString())
                    ).toLocaleString(),
                  ])
                : []
            }
          />
        ) : (
          <div className="text-black justify-self-center pt-[4rem]">
            No se encontraron nominaciones
          </div>
        )}
      </div>
    </CustomLayout>
  );
}

export default page;
