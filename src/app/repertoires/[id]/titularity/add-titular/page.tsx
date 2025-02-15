"use client";
import React, { useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { Form, Formik } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import { useParams, useRouter } from "next/navigation";
import { addRepertoireTitularities } from "@/services/repertoire";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function page() {
  const [percentage, setPercentage] = useState<string | number>("0");
  const { id } = useParams();
  const router = useRouter();

  const initialValues = {
    cuit: "",
    porcentaje_participacion: "",
    fecha_inicio: "",
    fecha_hasta: "",
  };

  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value ? e.target.value : "0");

    if (inputValue <= 100) {
      setPercentage(parseFloat(inputValue.toFixed(2)) || "");
    }
  };

  const handleOnSubmit = async (values: typeof initialValues) => {
    try {
      await addRepertoireTitularities(id as string, {
        participaciones: [
          {
            ...values,
            porcentaje_participacion: parseFloat(percentage.toString()),
          },
        ],
      });
      toast.success("Titularidad agregada exitosamente");
      router.push(`/repertoires/${id}/titularity`);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.response?.data.message);
      }
      toast.error("Error al agregar titularidad");
    }
  };

  return (
    <CustomLayout>
      <Header back title="Agregar Titular" />
      <div className="flex-1 flex flex-col items-center overflow-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleOnSubmit(values)}
        >
          <Form className="max-w-[30rem] w-[100%] p-[2rem] mt-[2rem] flex flex-col items-center gap-[1rem] border-[1px] border-[#c8c8c8]">
            <CustomField id="cuit" name="cuit" type="text" labelText="CUIT" />
            <CustomField
              id="fecha_inicio"
              name="fecha_inicio"
              type="date"
              labelText="DESDE"
            />
            <CustomField
              id="fecha_hasta"
              name="fecha_hasta"
              type="date"
              labelText="HASTA"
            />
            <div className={"w-[100%] container flex flex-col"}>
              <label style={{ color: "black" }} className="font-bold">
                Porcentaje
              </label>
              <input
                type="number"
                step={0.01}
                min={0}
                max={100}
                value={percentage}
                onChange={handleChangePercentage}
                className={
                  "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
                }
              />
              <div className="w-[100%] flex justify-center items-center h-[1rem]">
                {Number(percentage) > 100 && (
                  <p className="text-[#e74c3c] text-[0.9rem] w-[100%] mt-[0.5rem] text-center top-[100%]">
                    Estás excediendo el porcentaje disponible del fonograma.
                  </p>
                )}
              </div>
            </div>
            <CustomButton type="submit">Agregar</CustomButton>
          </Form>
        </Formik>
      </div>
    </CustomLayout>
  );
}
