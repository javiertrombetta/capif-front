"use client";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaUserAlt } from "react-icons/fa";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { getUsers } from "@/services/users";
import { ESTADOS, User } from "@/types/user.types";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import Spinner from "@/commons/Spinner/Spinner";
import CustomButton from "@/commons/CustomButton/CustomButton";

export default function page() {
  const authData = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    estado: "",
  };

  const getUsersData = async (values?: Record<string, string>) => {
    try {
      const users = await getUsers(values);
      setUsers(users);
    } catch (error) {
      console.log("🔴", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  const handleOnSubmit = async (values: Record<string, string>) => {
    setLoading(true);
    for (const key in values) {
      if (!values[key]) delete values[key];
    }

    await getUsersData(values);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner color="black" />
      </div>
    );
  }

  return (
    <CustomLayout>
      <Header title="Usuarios" />
      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleOnSubmit(values)}
        >
          <Form className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
            <CustomSearchField
              id="email"
              labelText="EMAIL"
              name="email"
              type="text"
            />
            {authData.rol === ROLES.SUPER_ADMIN ||
            authData.rol === ROLES.CAPIF_ADMIN ? (
              <>
                <CustomSearchField
                  id="nombre"
                  name="nombre"
                  labelText="NOMBRE"
                  type="text"
                />
                <CustomSearchField
                  id="apellido"
                  name="apellido"
                  labelText="APELLIDO"
                  type="text"
                />
                <CustomSearchField
                  id="estado"
                  name="estado"
                  labelText="ESTADO"
                  type="select"
                  options={[
                    { name: "", value: "" },
                    ...ESTADOS.map((t) => ({ name: t, value: t })),
                  ]}
                />
              </>
            ) : (
              <></>
            )}
            <CustomButton type="submit">Buscar</CustomButton>
          </Form>
        </Formik>
        <div className="w-[100%] mt-[2rem] flex-1 overflow-y-auto">
          {users.length > 0 && (
            <CustomTable
              columnNames={
                authData.rol === ROLES.SUPER_ADMIN ||
                authData.rol === ROLES.CAPIF_ADMIN
                  ? [
                      { name: "EMAIL", isSortable: true },
                      { name: "TIPO REGISTRO", isSortable: true },
                      { name: "NOMBRES", isSortable: true },
                      { name: "APELLIDOS", isSortable: true },
                      { name: "TELÉFONO", isSortable: true },
                      { name: "ROL", isSortable: true },
                      { name: "SELLO", isSortable: true },
                      { name: "ACCIÓN", isSortable: false },
                    ]
                  : [
                      { name: "EMAIL", isSortable: true },
                      { name: "NOMBRES", isSortable: true },
                      { name: "APELLIDOS", isSortable: true },
                      { name: "TELÉFONO", isSortable: true },
                      { name: "SELLO", isSortable: true },
                    ]
              }
              columnValues={users.map((element) => {
                return authData.rol === ROLES.SUPER_ADMIN ||
                  authData.rol === ROLES.CAPIF_ADMIN
                  ? [
                      element.email,
                      element.estado,
                      element.nombre,
                      element.apellido,
                      element.telefono,
                      element.rol,
                      element.productoras[0]?.productora || "",
                      <ActionDropdownButton
                        menuOptions={[
                          {
                            label: "Editar",
                            icon: <FaEdit />,
                            onClick: () => {
                              redirectToOption(`/users/${element.id}`);
                            },
                          },
                          ...(element.estado === "ENVIADO"
                            ? [
                                {
                                  label: "Ver Aplicación",
                                  icon: <FaUserAlt />,
                                  onClick: () => {
                                    redirectToOption(
                                      `/users/${element.id}/application`
                                    );
                                  },
                                },
                              ]
                            : []),
                        ]}
                      />,
                    ]
                  : [
                      element.email,
                      element.nombre,
                      element.apellido,
                      element.telefono,
                      element.productoras[0]?.productora || "",
                    ];
              })}
            />
          )}
        </div>
      </div>
    </CustomLayout>
  );
}
