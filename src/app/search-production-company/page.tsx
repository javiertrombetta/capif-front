"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "@/commons/CustomInput/CustomInput";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { FaMusic, FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ProductionCompanyResponse } from "@/types/productionCompany.types";
import { getAllCompanies } from "@/services/productionCompanies";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import { getPendingApplications } from "@/services/auth";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";

export default function page() {
  const authData = useAppSelector((state) => state.auth);

  const [productionCompanies, setProductionCompanies] = useState<
    ProductionCompanyResponse[] | null
  >(null);
  const router = useRouter();

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.value === "pendientes_registro") {
      const results = await getPendingApplications();
      setProductionCompanies(results);
    }
  };

  const getProductionCompanies = async () => {
    const companies = await getAllCompanies();
    setProductionCompanies(companies);
  };

  useEffect(() => {
    getProductionCompanies();
  }, []);

  return (
    <CustomLayout>
      <Header title="Buscar Productora" />

      <div className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
        <CustomInput label="Buscar:" type="text" />
        {authData.rol === ROLES.SUPER_ADMIN ||
        authData.rol === ROLES.CAPIF_ADMIN ? (
          <>
            <select
              onChange={handleSelectChange}
              className="text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem]"
            >
              <option value={"registrados"}>Registrados</option>
              <option value={"pendientes_registro"}>
                Pendientes de Registro
              </option>
              <option value={"incompleto"}>Incompleto</option>
            </select>

            <CustomInput
              className="w-[15rem]"
              label="FECHA CREACIÓN DESDE"
              type="date"
            />
            <CustomInput
              className="w-[15rem]"
              label="FECHA CREACIÓN HASTA"
              type="date"
            />
          </>
        ) : (
          <></>
        )}
      </div>
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
                      redirectToOption(`/user-profile/${element.id_usuario}`),
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
      <div className="w-[100%] mt-[2rem] mb-[2rem] pr-[2rem] pl-[2rem] flex justify-end">
        <CustomButton>Descargar CVS</CustomButton>
      </div>
    </CustomLayout>
  );
}
