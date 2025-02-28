"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import TimerInput from "@/components/TimerInput/TimerInput";
import {
  editRepertoire,
  getRepertoireById,
  uploadPhonogramFile,
} from "@/services/repertoire";
import { Repertoire } from "@/types/repertoire.types";
import CustomFileInput from "@/commons/CustomFileInput/CustomFileInput";

function page() {
  const params = useParams();
  const [repertoire, setRepertoire] = useState<Repertoire | null>(null);
  const [file, setFile] = useState<File>();
  const [year, setYear] = useState("");
  const [time, setTime] = useState<string>("");

  const currentYear = new Date().getFullYear();

  const initialValues = {
    titulo: repertoire?.titulo || "",
    artista: repertoire?.artista || "",
    album: repertoire?.album || "",
    duracion: repertoire?.duracion || "",
  };

  const handleTime = (formatedTime: string) => {
    setTime(formatedTime);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].name.endsWith(".mp3")
    ) {
      setFile(e.target.files[0]);
    } else {
      toast.error("Por favor, seleccione un archivo MP3 válido.");
    }
  };

  const handleSendFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("archivo", file);
      if (params.id && !Array.isArray(params.id)) {
        await uploadPhonogramFile(formData, params.id);
      }
    }
  };

  const handleInputYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      const numericValue = parseInt(value, 10);
      if (value === "" || numericValue <= currentYear) {
        setYear(value);
      }
    }
  };

  const handleGetRepertoire = async () => {
    const response = await getRepertoireById(params.id as string);
    setRepertoire(response);
    setYear(`${response.anio_lanzamiento}`);
    setTime(response.duracion);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (params.id && !Array.isArray(params.id)) {
        const { data, message } = await editRepertoire(params.id, {
          titulo: values.titulo,
          artista: values.artista,
          album: values.album,
          duracion: time,
          anio_lanzamiento: Number(year),
        });
        setRepertoire((prevState: Repertoire | null) => {
          if (prevState) {
            return {
              ...prevState,
              titulo: data.titulo,
              artista: data.artista,
              album: data.album,
              duracion: data.duracion,
              anio_lanzamiento: data.anio_lanzamiento,
            };
          }
          return prevState;
        });
        toast.success(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al editar fonograma.");
    }
  };

  useEffect(() => {
    handleGetRepertoire();
  }, []);

  return (
    <CustomLayout>
      <Header back title="Editar Fonograma" />
      <div className="w-[100%] p-[2rem] flex flex-col justify-center items-center space-y-[2rem]">
        {!repertoire ? null : (
          <>
            <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
              <h3 className="text-black text-3xl font-black mb-[1rem]">
                Datos Repertorio
              </h3>
              <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                {({ isSubmitting, isValid, dirty }) => (
                  <Form className="w-[100%] flex flex-col justify-center items-center">
                    <div className="w-[100%] flex flex-row space-x-[1rem]">
                      <CustomField
                        type="text"
                        id="titulo"
                        name="titulo"
                        labelText="Título"
                      />
                      <CustomField
                        type="text"
                        id="artista"
                        name="artista"
                        labelText="Artista"
                      />
                    </div>
                    <div className="w-[100%] flex flex-row space-x-[1rem]">
                      <CustomField
                        type="text"
                        id="album"
                        name="album"
                        labelText="Album"
                      />
                      <div className="w-[100%] flex flex-col">
                        <label style={{ color: "black" }} className="font-bold">
                          Año de Lanzamiento
                        </label>
                        <input
                          type="text"
                          placeholder="AAAA"
                          value={year}
                          onChange={handleInputYear}
                          className={
                            "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black] "
                          }
                        />
                      </div>
                    </div>
                    <div className="w-[100%] flex flex-col items-center justify-center mb-[1.5rem]">
                      <p className="text-black font-bold">Duración del Tema</p>
                      <TimerInput
                        onChange={handleTime}
                        defaultTime={repertoire.duracion}
                      />
                    </div>
                    <CustomButton
                      type="submit"
                      disabled={isSubmitting || !isValid || !dirty}
                      className="mt-[3rem]"
                    >
                      Guardar
                    </CustomButton>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
              <h3 className="text-black text-3xl font-black mb-[1rem]">
                Archivo de Audio
              </h3>
              <CustomFileInput onChange={handleFileChange}>
                Seleccione Archivo
              </CustomFileInput>
              {file ? (
                <div className="flex flex-row space-x-[1rem] items-center py-[0.5rem]">
                  <p className="text-black">{file.name}</p>
                  <CustomButton onClick={handleSendFile}>Enviar</CustomButton>
                </div>
              ) : (
                <p className="py-[0.5rem] text-black">
                  {repertoire?.archivoDelFonograma?.ruta_archivo_audio || ""}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </CustomLayout>
  );
}

export default page;
