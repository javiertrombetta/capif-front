"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTimes, FaUserAlt } from "react-icons/fa";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import RemoveUserModal from "@/components/Modals/RemoveUserModal/RemoveUserModal";
import { useAppSelector } from "@/hooks/storeHooks";
import useModal from "@/hooks/useModal";
import { getUsers } from "@/services/users";
import { ESTADOS, User } from "@/types/user.types";

export default function page() {
  const authData = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { openModal } = useModal();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    estado: "",
  };

  const getUsersData = async (values?: Record<string, string>) => {
    setLoading(true);
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
    for (const key in values) {
      if (!values[key]) delete values[key];
    }

    await getUsersData(values);
  };

  return (
    <CustomLayout>
      <Header title="Usuarios" />
      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          {({ submitForm }) => (
            <>
              <Form className="h-[4rem] w-[100%] flex items-end gap-[2rem] mt-[1rem] px-[2rem]">
                <CustomSearchField
                  id="email"
                  labelText="EMAIL"
                  name="email"
                  type="text"
                />
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
                    { name: "TODOS", value: "" },
                    ...ESTADOS.map((t) => ({ name: t, value: t })),
                  ]}
                />

                <CustomButton type="submit">Buscar</CustomButton>
              </Form>
              <div className="w-[100%] mt-[2rem] flex-1 overflow-y-auto">
                {loading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner color="black" />
                  </div>
                ) : users.length > 0 ? (
                  <CustomTable
                    columnNames={[
                      { name: "EMAIL", isSortable: true },
                      { name: "TIPO REGISTRO", isSortable: true },
                      { name: "NOMBRES", isSortable: true },
                      { name: "APELLIDOS", isSortable: true },
                      { name: "TELÉFONO", isSortable: true },
                      { name: "ROL", isSortable: true },
                      { name: "SELLO", isSortable: true },
                      { name: "ACCIÓN", isSortable: false },
                    ]}
                    columnValues={users.map((element) => {
                      return [
                        element.email,
                        element.estado,
                        element.nombre,
                        element.apellido,
                        element.telefono || "",
                        element.rol,
                        element.productoras[0]?.nombre || "",
                        <ActionDropdownButton
                          menuOptions={[
                            {
                              label: "Editar",
                              icon: <FaEdit />,
                              onClick: () => {
                                redirectToOption(`/users/${element.id}`);
                              },
                            },
                            ...(authData.vistas.some(
                              (v) => v.nombre === "Desvincular Usuario"
                            )
                              ? [
                                  {
                                    label: "Desvincular",
                                    icon: <FaTimes />,
                                    onClick: async () => {
                                      openModal(
                                        <RemoveUserModal
                                          idUsuario={element.id}
                                          onSuccess={submitForm}
                                        />
                                      );
                                    },
                                  },
                                ]
                              : []),
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
                      ];
                    })}
                  />
                ) : (
                  <div className="text-black justify-self-center pt-[4rem]">
                    No se encontraron usuarios
                  </div>
                )}
              </div>
            </>
          )}
        </Formik>
      </div>
    </CustomLayout>
  );
}
