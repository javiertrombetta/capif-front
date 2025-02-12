"use client";
import React, { useEffect, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { useAppDispatch } from "@/hooks/storeHooks";
import { Form, Formik } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import TimerInput from "@/components/TimerInput/TimerInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import { editPhonogram, getPhonogramById } from "@/services/repertoire";
import { useParams } from "next/navigation";
import { GetRepertoireByIdResponse } from "@/types/repertoire.types";
import { toast } from "react-toastify";
function page() {
  const params = useParams();
  // const authData = useAppSelector((state) => state.auth);
  const [phonogram, setPhonogram] = useState<GetRepertoireByIdResponse | null>(
    null
  );

  const dispatch = useAppDispatch();
  const [year, setYear] = useState("");
  const [time, setTime] = useState<string>("");
  const currentYear = new Date().getFullYear();

  const initialValues = {
    titulo: phonogram?.titulo || "",
    artista: phonogram?.artista || "",
    album: phonogram?.album || "",
    duracion: phonogram?.duracion || "",
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

  const handleGetPhonogram = async () => {
    const response = await getPhonogramById(params.id as string);
    setPhonogram(response);
    setYear(`${response.anio_lanzamiento}`);
    setTime(response.duracion);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: {
      titulo: string;
      artista: string;
      album: string;
      duracion: string;
    }
  ) => {
    try {
      e.preventDefault();
      if (params.id && !Array.isArray(params.id)) {
        const { data, message } = await editPhonogram(params.id, {
          titulo: values.titulo,
          artista: values.artista,
          album: values.album,
          duracion: time,
          anio_lanzamiento: Number(year),
        });
        setPhonogram((prevState: GetRepertoireByIdResponse | null) => {
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
      toast.error("Error al editar fonograma.");
    }
  };

  const handleOpenModal = (type: ModalNames) => {
    dispatch(setModal({ type, isActive: true }));
  };

  useEffect(() => {
    handleGetPhonogram();
  }, []);

  return (
    <CustomLayout>
      <Header back title="Editar Fonograma" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-center items-center">
        {!phonogram ? null : (
          <Formik onSubmit={() => {}} initialValues={initialValues}>
            {({ isSubmitting, isValid, dirty, values }) => (
              <Form
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) =>
                  await handleSubmit(e, values)
                }
                className="w-[60%] flex flex-col justify-center items-center mt-[3rem]"
              >
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
                    defaultTime={phonogram.duracion}
                  />
                </div>

                {/* <CustomField
                  type="text"
                  id="productor_originario"
                  name="productor_originario"
                  labelText="Productor Originario"
                  disabled
                /> */}

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
                    // onClick={() =>
                    //   handleOpenModal(ModalNames.EDIT_PHONOGRAM_SAVE)
                    // }
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                    className="mt-[3rem]"
                  >
                    Guardar
                  </CustomButton>

                  <CustomButton
                    onClick={() =>
                      handleOpenModal(ModalNames.EDIT_PHONOGRAM_CANCEL)
                    }
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
