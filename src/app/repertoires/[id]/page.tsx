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
import useModal from "@/hooks/useModal";
import { editRepertoire, getRepertoireById } from "@/services/repertoire";
import { Repertoire } from "@/types/repertoire.types";
import { CancelEditPhonogramModal } from "@/components/Modals/EditPhonogramModals/EditPhonogramModals";

function page() {
  const params = useParams();
  const { openModal } = useModal();
  const [repertoire, setRepertoire] = useState<Repertoire | null>(null);
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
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-center items-center">
        {!repertoire ? null : (
          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="w-[60%] flex flex-col justify-center items-center mt-[3rem]">
                <CustomField
                  type="text"
                  id="titulo"
                  name="titulo"
                  labelText="Titulo"
                />
                <CustomField
                  type="text"
                  id="artista"
                  name="artista"
                  labelText="Artista"
                />
                <CustomField
                  type="text"
                  id="album"
                  name="album"
                  labelText="Album"
                />
                <div className="w-[100%] mb-[1.5rem]">
                  <p className="text-black font-bold">
                    Duración del Repertorio
                  </p>
                  <TimerInput
                    onChange={handleTime}
                    defaultTime={repertoire.duracion}
                  />
                </div>
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
                <div className="w-[100%] flex justify-center gap-[1rem] mb-[2rem]">
                  <CustomButton
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                    className="mt-[3rem]"
                  >
                    Guardar
                  </CustomButton>

                  <CustomButton
                    onClick={() => openModal(<CancelEditPhonogramModal />)}
                    type="button"
                    className="mt-[3rem]"
                  >
                    Cancelar
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </CustomLayout>
  );
}

export default page;
