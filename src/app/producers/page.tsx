"use client";
import React, { useEffect, useState } from "react";
import { FaMusic, FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import { getProducers } from "@/services/producers";
import { ProductionCompany } from "@/types/productionCompany.types";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [producers, setProducers] = useState<ProductionCompany[]>([]);
  const router = useRouter();

  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    estado: "",
  };

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  const getProducersData = async (values: Record<string, string>) => {
    setLoading(true);
    try {
      const companies = await getProducers(values);
      setProducers(companies);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener las productoras");
      setProducers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = async (values: Record<string, string>) => {
    for (const key in values) {
      if (!values[key]) delete values[key];
    }
    await getProducersData({ ...values, estado: "Autorizada" });
  };

  useEffect(() => {
    getProducersData({ estado: "Autorizada" });
  }, []);

  return (
    <CustomLayout>
      <Header title="Buscar Productora" />

      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleOnSubmit(values)}
        >
          <Form className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
            <CustomSearchField
              id="nombre"
              name="nombre"
              labelText="NOMBRE"
              type="text"
            />
            <CustomSearchField
              id="cuit"
              name="cuit"
              labelText="CUIT"
              type="text"
            />
            <CustomButton type="submit">Buscar</CustomButton>
            <CustomButton type="button">
              <p className="whitespace-nowrap">Descargar CSV</p>
            </CustomButton>
          </Form>
        </Formik>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="black" />
          </div>
        ) : producers && producers.length > 0 ? (
          <CustomTable
            columnNames={[
              { name: "NOMBRE", isSortable: true },
              { name: "EMAIL", isSortable: true },
              { name: "CUIT", isSortable: true },
              { name: "SELLO", isSortable: true },
              { name: "FONOGRAMAS", isSortable: true },
              { name: "FECHA CREACIÓN", isSortable: true },
              { name: "ISRC AUDIO", isSortable: true },
              { name: "ISRC VIDEO", isSortable: true },
              { name: "ACCIÓN", isSortable: false },
            ]}
            columnValues={producers?.map((element) => {
              let ISRCAudio: string | undefined = "";
              let ISRCVideo: string | undefined = "";
              if (
                element.codigosDeLaProductora &&
                element.codigosDeLaProductora.length > 0
              ) {
                ISRCAudio =
                  element?.codigosDeLaProductora?.find(
                    (item) => item?.tipo === "AUDIO"
                  )?.codigo_productora || "";
                ISRCVideo =
                  element?.codigosDeLaProductora?.find(
                    (item) => item?.tipo === "VIDEO"
                  )?.codigo_productora || "";
              }
              return [
                element.nombre_productora,
                element.email,
                element.cuit_cuil,
                element.denominacion_sello || "",
                element.cantidad_fonogramas,
                `${new Date(element.createdAt).toLocaleString()}`,
                ISRCAudio || "",
                ISRCVideo || "",
                <ActionDropdownButton
                  menuOptions={[
                    {
                      label: "Ficha",
                      icon: <FaUserAlt />,
                      onClick: () =>
                        redirectToOption(`/producers/${element.id_productora}`),
                    },
                    {
                      label: "Repertorio",
                      icon: <FaMusic />,
                      onClick: () => redirectToOption("/"),
                    },
                  ]}
                />,
              ];
            })}
          />
        ) : (
          <div className="text-black mx-auto pt-[4rem]">
            No se encontraron productoras
          </div>
        )}
      </div>
    </CustomLayout>
  );
}
