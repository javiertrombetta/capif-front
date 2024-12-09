"use client";
import React, { useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { useAppSelector } from "@/hooks/storeHooks";
import { Form, Formik } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import TimerInput from "@/components/TimerInput/TimerInput";
import CustomButton from "@/commons/CustomButton/CustomButton";

function page() {
  const userData = useAppSelector((state) => state.user);
  const initialValues = {
    titulo: "Cae el Sol",
    artista: "Airbag",
    album: "Voragine",
    duracion: "00:03:57",
    productor_originario: userData.activeProduction,
    año_lanzamiento: "2011",
  };

  const [year, setYear] = useState("2011");
  const currentYear = new Date().getFullYear();

  const handleInputYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      const numericValue = parseInt(value, 10);
      if (value === "" || numericValue <= currentYear) {
        setYear(value);
      }
    }
  };

  const handleSubmit = () => {};

  return (
    <CustomLayout>
      <Header back title="Editar Fonograma" />
      <div className="w-[100%] pr-[2rem] pl-[2rem] flex justify-center items-center">
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
                <p className="text-black font-bold">Duración del Repertorio</p>
                <TimerInput
                  defaultTime={{ hours: 0, minutes: 3, seconds: 27 }}
                />
              </div>
              <CustomField
                type="text"
                id="productor_originario"
                name="productor_originario"
                labelText="Productor Originario"
                disabled
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
              <div className="w-[100%] flex justify-center gap-[1rem]">
                <CustomButton
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="mt-[3rem]"
                >
                  Guardar
                </CustomButton>

                <CustomButton type="button" className="mt-[3rem]">
                  Cancelar
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CustomLayout>
  );
}

export default page;
