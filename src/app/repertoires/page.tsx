"use client";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import { useAppSelector } from "@/hooks/storeHooks";
import { getRepertoires } from "@/services/repertoire";
import { ROLES } from "@/types/auth.types";
import { Repertoire } from "@/types/repertoire.types";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

function page() {
  const router = useRouter();
  const { rol } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [repertoires, setRepertoires] = useState<Repertoire[]>([]);

  const initialValues = {
    titulo: "",
    artista: "",
    album: "",
    nombre_prodcutora: "",
    sello_discografico: "",
    isrc: "",
    anio_lanzamiento: "",
  };

  const menuOptions = (id: string) => {
    return [
      {
        label: "Editar",
        onClick: () => {
          router.push("/repertoires/" + id);
        },
      },
      ...(rol === ROLES.SUPER_ADMIN || rol === ROLES.CAPIF_ADMIN
        ? [
            {
              label: "Territorialidad",
              onClick: () => {
                router.push(`/repertoires/${id}/territoriality`);
              },
            },
          ]
        : []),
      ...(rol === ROLES.SUPER_ADMIN
        ? [
            {
              label: "Titularidad",
              onClick: () => router.push(`/repertoires/${id}/titularity`),
            },
          ]
        : []),
    ];
  };

  const getRepertoiresData = async (values?: Record<string, string>) => {
    try {
      const repertoires = await getRepertoires(values);
      setRepertoires(repertoires);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener las productoras");
      setRepertoires([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSubmit = async (values: Record<string, string>) => {
    setLoading(true);
    for (const key in values) {
      if (!values[key]) delete values[key];
    }
    await getRepertoiresData(values);
  };

  useEffect(() => {
    getRepertoiresData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Buscar Repertorio" />
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            handleOnSubmit(values);
          }}
        >
          <SearchPhonogramForm />
        </Formik>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="black" />
          </div>
        ) : repertoires && repertoires.length > 0 ? (
          <CustomTable
            columnNames={[
              { name: "TITULO", isSortable: true },
              { name: "ARTISTA", isSortable: true },
              { name: "ÁLBUM", isSortable: true },
              { name: "AÑO DE PUBLICACIÓN", isSortable: true },
              { name: "ISRC", isSortable: true },
              { name: "PRODUCTORA", isSortable: true },
              { name: "SELLO", isSortable: true },
              { name: "ESTADO", isSortable: true },
              { name: "Acción", isSortable: true },
            ]}
            columnValues={repertoires.map((r) => [
              r.titulo,
              r.artista,
              r.album,
              r.anio_lanzamiento,
              r.isrc,
              r.nombre_productora,
              r.sello_discografico,
              r.estado_fonograma,
              <ActionDropdownButton
                menuOptions={menuOptions(r.id_fonograma)}
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

const SearchPhonogramForm: FC = () => {
  return (
    <Form className="w-[100%]  mt-[2rem] flex flex-col gap-[1rem]">
      <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomSearchField
          name="titulo"
          id="titulo"
          type="text"
          labelText="TITULO"
        />
        <CustomSearchField
          name="artista"
          id="artista"
          type="text"
          labelText="ARTISTA"
        />
        <CustomSearchField
          name="album"
          id="album"
          type="text"
          labelText="ALBUM"
        />
        <CustomSearchField
          name="anio"
          id="anio"
          type="text"
          labelText="AÑO DE PUBLICACIÓN"
        />
      </div>
      <div className="w-[100%] flex justify-start items-end pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomSearchField name="isrc" id="isrc" type="text" labelText="ISRC" />
        <CustomSearchField
          name="productora"
          id="productora"
          type="text"
          labelText="PRODUCTORA"
        />
        <CustomSearchField
          name="sello"
          id="sello"
          type="text"
          labelText="SELLO"
        />
        <div className="w-[100%]">
          <CustomButton type="submit">
            <FaSearch />
            Buscar
          </CustomButton>
        </div>
      </div>
    </Form>
  );
};
