"use client";
import React, { useEffect, useState } from "react";
import { FaMusic, FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import { useAppSelector } from "@/hooks/storeHooks";
import { getAllCompanies } from "@/services/productionCompanies";
import { ROLES } from "@/types/auth.types";
import { ProductionCompanyResponse } from "@/types/productionCompany.types";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import { Form, Formik } from "formik";

export default function page() {
  const authData = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [productionCompanies, setProductionCompanies] = useState<
    ProductionCompanyResponse[] | null
  >(null);
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

  const getProductionCompanies = async () => {
    const companies = await getAllCompanies();
    setProductionCompanies(companies);
    setLoading(false);
  };

  const handleOnSubmit = async (values: Record<string, string>) => {
    setLoading(true);
    for (const key in values) {
      if (!values[key]) delete values[key];
    }

    await getProductionCompanies();
  };

  useEffect(() => {
    getProductionCompanies();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner color="black" />
      </div>
    );
  }

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
            {authData.rol === ROLES.SUPER_ADMIN ||
            authData.rol === ROLES.CAPIF_ADMIN ? (
              <CustomSearchField
                id="estado"
                name="estado"
                labelText="ESTADO"
                type="select"
                options={[
                  { name: "", value: "" },
                  { name: "Autorizada", value: "Autorizada" },
                  { name: "Pendiente", value: "Pendiente" },
                ]}
              />
            ) : (
              <></>
            )}
            <CustomButton type="submit">Buscar</CustomButton>
            <CustomButton type="button">
              <p className="whitespace-nowrap">Descargar CSV</p>
            </CustomButton>
          </Form>
        </Formik>
        {productionCompanies && productionCompanies.length > 0 ? (
          <CustomTable
            columnNames={[
              { name: "EMAIL", isSortable: true },
              { name: "CUIT", isSortable: true },
              { name: "RAZON SOCIAL/NOMBRE", isSortable: true },
              { name: "TELÉFONO", isSortable: true },
              { name: "SELLO", isSortable: true },
              { name: "FONOGRAMAS", isSortable: true },
              { name: "FECHA CREACIÓN", isSortable: true },
              { name: "FECHA ACTUALIZACIÓN", isSortable: true },
              { name: "ISRC AUDIO", isSortable: true },
              { name: "ISRC VIDEO", isSortable: true },
              { name: "ACCIÓN", isSortable: false },
            ]}
            columnValues={productionCompanies?.map((element) => {
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
                element.email,
                element.cuit_cuil,
                element.razon_social || "",
                element.telefono,
                "",
                "",
                `${element.createdAt}`,
                `${element.updatedAt}`,
                ISRCAudio || "",
                ISRCVideo || "",
                <ActionDropdownButton
                  menuOptions={[
                    {
                      label: "Ficha",
                      icon: <FaUserAlt />,
                      onClick: () =>
                        redirectToOption(
                          `/producers/${element.id_usuario ? element.id_usuario : element.id_productora}`
                        ),
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
        ) : null}
      </div>
    </CustomLayout>
  );
}
