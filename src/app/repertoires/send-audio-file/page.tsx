"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import {
  RejectAudio,
  SendAudioFile,
  SetSendAudioError,
  SetSendAudioPending,
} from "@/components/Modals/SendAudioFileModals/SendAudioFileModals";
import useModal from "@/hooks/useModal";
import { getSendAudioFiles } from "@/services/repertoire";
import {
  ESTADOS_ENVIO,
  GetSendAudioFilesResponse,
} from "@/types/repertoire.types";

function page() {
  const { openModal } = useModal();
  const [audioFiles, setAudioFiles] = useState<
    GetSendAudioFilesResponse["data"]
  >([]);
  const [loading, setLoading] = useState(true);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const initialValues = {
    nombre_tema: "",
    estado_envio: "",
    fecha_desde: "",
    fecha_hasta: "",
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSeleccionados(
      checked ? [id, ...seleccionados] : seleccionados.filter((s) => s !== id)
    );
  };

  const handleOnSubmit = async (values: typeof initialValues) => {
    for (const key in values) {
      if (!values[key as keyof typeof values])
        delete values[key as keyof typeof values];
    }
    await getSendAudioFilesData(values);
  };

  const getSendAudioFilesData = async (values?: typeof initialValues) => {
    setLoading(true);
    try {
      const response = await getSendAudioFiles(values);
      setAudioFiles(response);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener los archivos enviados");
      setAudioFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSendAudioFilesData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Envio Archivos de Audio" />

      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          <Form className="h-[4rem] w-[100%] flex items-end mt-[1rem] gap-[2rem] pl-[1rem] pr-[2rem]">
            <CustomSearchField
              id="nombre_tema"
              name="nombre_tema"
              type="text"
              labelText="NOMBRE"
            />
            <CustomSearchField
              id="estado_envii"
              name="estado_envio"
              type="select"
              labelText="ESTADO"
              options={[
                { name: "", value: "" },
                ...ESTADOS_ENVIO.map((e) => ({ name: e, value: e })),
              ]}
            />
            <CustomSearchField
              id="fecha_desde"
              name="fecha_desde"
              labelText="FECHA CREACIÓN DESDE"
              type="date"
            />
            <CustomSearchField
              id="fecha_hasta"
              name="fecha_hasta"
              labelText="FECHA CREACIÓN HASTA"
              type="date"
            />
            <CustomButton type="submit">Buscar</CustomButton>
          </Form>
        </Formik>
        <div className="w-[100%] mt-[2rem] flex-1 overflow-y-auto">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner color="black" />
            </div>
          ) : audioFiles.length > 0 ? (
            <CustomTable
              columnNames={[
                { name: "SELECCIONAR", isSortable: false, selectBox: true },
                { name: "TEMA", isSortable: true },
                { name: "ESTADO", isSortable: true },
                { name: "FECHA DESDE", isSortable: true },
                { name: "FECHA HASTA", isSortable: true },
                { name: "ACCIÓN", isSortable: false },
              ]}
              columnValues={audioFiles.map((a) => [
                <input
                  id={a.fonogramaDelEnvio.id_fonograma}
                  type="checkbox"
                  className="scale-[1.5]"
                  onChange={handleOnChange}
                  checked={seleccionados.includes(
                    a.fonogramaDelEnvio.id_fonograma
                  )}
                />,
                a.fonogramaDelEnvio.titulo,
                a.tipo_estado,
                a.fecha_envio_inicial ?? "",
                a.fecha_envio_ultimo ?? "",
                <ActionDropdownButton
                  menuOptions={[
                    {
                      label: "Rechazar",
                      onClick: () =>
                        openModal(
                          <RejectAudio
                            idSend={a.id_envio_vericast}
                            idRepertoire={a.fonogramaDelEnvio.id_fonograma}
                            onSuccess={() => getSendAudioFilesData()}
                          />
                        ),
                    },
                    {
                      label: "Error",
                      onClick: () =>
                        openModal(
                          <SetSendAudioError
                            idSend={a.id_envio_vericast}
                            idRepertoire={a.fonogramaDelEnvio.id_fonograma}
                            onSuccess={() => getSendAudioFilesData()}
                          />
                        ),
                    },
                    {
                      label: "Pendiente",
                      onClick: () =>
                        openModal(
                          <SetSendAudioPending
                            idSend={a.id_envio_vericast}
                            idRepertoire={a.fonogramaDelEnvio.id_fonograma}
                            onSuccess={() => getSendAudioFilesData()}
                          />
                        ),
                    },
                  ]}
                />,
              ])}
            />
          ) : (
            <div className="text-black justify-self-center pt-[4rem]">
              No se encontraron archivos
            </div>
          )}
        </div>
      </div>
      <div className="w-[100%] py-[1rem] px-[2rem] flex items-center justify-end space-x-[0.5rem]">
        <CustomButton
          onClick={() => openModal(<SendAudioFile ids={seleccionados} />)}
          {...(seleccionados.length === 0
            ? { disabled: true, background: "disabled" }
            : {})}
        >
          ENVIAR SELECCIONADOS
        </CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;
