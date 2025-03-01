"use client";
import React, { FC, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import {
  GrantExtension,
  Desist,
  SendConflictDocumentation,
} from "@/components/Modals/Conflicts/ConflictsActions";
import { useAppSelector } from "@/hooks/storeHooks";
import useModal from "@/hooks/useModal";
import {
  desistConflict,
  getConflicts,
  grantExtension,
} from "@/services/conflicts";
import { ROLES } from "@/types/auth.types";
import { Conflicto, CONFLICTS_STATES } from "@/types/conflicts.types";

const initialValues = {
  fecha_desde: "",
  fecha_hasta: "",
  estado: undefined,
  isrc: "",
  productora_id: "",
};

function page() {
  const [conflicts, setConflicts] = useState<Conflicto[]>([]);
  const [loading, setLoading] = useState(true);
  const { vistas, rol } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const getConflictsData = async (values?: typeof initialValues) => {
    setLoading(true);
    try {
      const response = await getConflicts(values);
      setConflicts(response.data);
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
      setConflicts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = async (values: typeof initialValues) => {
    getConflictsData(values);
  };

  const onGrantExtension = async (id: string) => {
    try {
      const response = await grantExtension(id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const onDesistConflict = async (id: string) => {
    try {
      const response = await desistConflict(id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleMenuOptions = (id: string) => {
    const options = [
      ...(vistas.some((v) => v.nombre === "Ver Participaciones Conflicto")
        ? [
            {
              label: "Ver Participaciones",
              onClick: () =>
                router.push(`/repertoires/conflicts/${id}/history`),
            },
          ]
        : []),
      ...(vistas.some((v) => v.nombre === "Otorgar Prórroga Conflicto")
        ? [
            {
              label: "Otorgar Prórroga",
              onClick: () =>
                openModal(
                  <GrantExtension
                    onGrantExtension={() => onGrantExtension(id)}
                    onCloseModal={closeModal}
                  />
                ),
            },
          ]
        : []),
      ...(vistas.some((v) => v.nombre === "Enviar Documentación Conflicto")
        ? [
            {
              label: "Enviar Documentación",
              onClick: () => openModal(<SendConflictDocumentation />),
            },
          ]
        : []),
    ];

    if (rol === ROLES.USER_PRODUCER || rol === ROLES.EMPLOYEE) {
      options.push({
        label: "Desistir conflicto",
        onClick: () =>
          openModal(
            <Desist
              onDesistConflict={() => onDesistConflict(id)}
              onCloseModal={closeModal}
            />
          ),
      });
    }

    return options;
  };

  useEffect(() => {
    getConflictsData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Conflictos" />
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          <SearchConflictForm />
        </Formik>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="black" />
          </div>
        ) : conflicts && conflicts.length > 0 ? (
          <CustomTable
            columnNames={[
              { name: "ISRC", isSortable: true },
              { name: "Productora Originaria", isSortable: true },
              { name: "Fecha de Inicio", isSortable: true },
              { name: "Fecha de Finalización", isSortable: true },
              { name: "Estado del Conflicto", isSortable: true },
              { name: "Acción", isSortable: false },
            ]}
            columnValues={conflicts.map((c) => [
              c.fonogramaDelConflicto.isrc,
              c.productoraDelConflicto.nombre_productora,
              new Date(c.fecha_periodo_desde).toLocaleString(),
              new Date(c.fecha_periodo_hasta).toLocaleString(),
              c.estado_conflicto,
              <ActionDropdownButton
                menuOptions={handleMenuOptions(c.id_conflicto)}
              />,
            ])}
          />
        ) : (
          <div className="text-black mx-auto pt-[4rem]">
            No se encontraron fonogramas
          </div>
        )}
      </div>
    </CustomLayout>
  );
}

export default page;

const SearchConflictForm: FC = () => {
  const authData = useAppSelector((state) => state.auth);

  return (
    <Form className="w-[100%] mt-[2rem] flex flex-col gap-[1rem]">
      {authData.rol === ROLES.CAPIF_ADMIN ||
      authData.rol === ROLES.SUPER_ADMIN ? (
        <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
          <CustomSearchField
            id="isrc"
            name="isrc"
            type="text"
            labelText="ISRC"
          />
          <CustomSearchField
            id="fecha_desde"
            name="fecha_desde"
            type="date"
            labelText="DESDE"
          />
          <CustomSearchField
            id="fecha_hasta"
            name="fecha_hasta"
            type="date"
            labelText="HASTA"
          />
        </div>
      ) : null}
      <div className="w-[100%] flex justify-start items-end pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomSearchField
          id="estado"
          name="estado"
          labelText="ESTADO"
          type="select"
          options={[
            { name: "TODOS", value: "" },
            ...CONFLICTS_STATES.map((t) => ({ name: t, value: t })),
          ]}
        />
        <CustomButton type="submit">
          <FaSearch />
          Buscar
        </CustomButton>
      </div>
    </Form>
  );
};
