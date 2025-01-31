"use client";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
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

  const handleOnSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: Record<string, string>
  ) => {
    setLoading(true);
    e.preventDefault();
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

  console.log(users);

  return (
    <CustomLayout>
      <Header title="Registros" />
      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({ values }) => (
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleOnSubmit(e, values)
              }
              className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]"
            >
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
              <button className="text-white w-[100%] max-w-[6rem] bg-mainblue text-[1rem] font-bold flex justify-center items-center p-[0.5rem] space-x-2">
                <FaSearch />
                <p>Buscar</p>
              </button>
            </Form>
          )}
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
                      { name: "CUIT", isSortable: true },
                      { name: "NOMBRES", isSortable: true },
                      { name: "APELLIDOS", isSortable: true },
                      { name: "TELÉFONO", isSortable: true },
                      { name: "SELLO", isSortable: true },
                      { name: "ACCIÓN", isSortable: false },
                    ]
                  : [
                      { name: "EMAIL", isSortable: true },
                      { name: "CUIT", isSortable: true },
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
                      "123123",
                      element.nombre,
                      element.apellido,
                      element.telefono,
                      "Sony Music",
                      <ActionDropdownButton
                        menuOptions={[
                          {
                            label: "Editar",
                            icon: <FaEdit />,
                            onClick: () => {
                              redirectToOption(
                                `/users/edit-user/${element.id}`
                              );
                            },
                          },
                        ]}
                      />,
                    ]
                  : [
                      element.email,
                      "123123",
                      element.nombre,
                      element.apellido,
                      element.telefono,
                      "Sony Music",
                    ];
              })}
            />
          )}
        </div>
      </div>
    </CustomLayout>
  );
}
