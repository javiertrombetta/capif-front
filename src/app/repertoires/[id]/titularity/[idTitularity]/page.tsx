"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import {
  getRepertoireTitularity,
  updateRepertoireTitularity,
} from "@/services/repertoire";
import { GetRepertoireTitularityResponse } from "@/types/repertoire.types";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [titularity, setTitularity] = useState<
    GetRepertoireTitularityResponse["participaciones"][0] | null
  >();
  const { id, idTitularity } = useParams();
  const router = useRouter();

  const initialValues = {
    porcentaje_participacion: titularity?.porcentaje_participacion || "",
    fecha_participacion_inicio:
      titularity?.fecha_participacion_inicio.split("T")[0] || "",
    fecha_participacion_hasta:
      titularity?.fecha_participacion_hasta.split("T")[0] || "",
  };

  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value ? e.target.value : "0");

    if (titularity && inputValue <= 100) {
      setTitularity({
        ...titularity,
        porcentaje_participacion: inputValue || 0,
      });
    }
  };

  const handleOnSubmit = async (values: typeof initialValues) => {
    if (!titularity) return;

    try {
      await updateRepertoireTitularity(id as string, idTitularity as string, {
        ...values,
        porcentaje_participacion: parseFloat(
          titularity.porcentaje_participacion.toString()
        ),
      });
      toast.success("Titularidad editada con éxito");
      router.push(`/repertoires/${id}/titularity`);
    } catch (error) {
      console.error(error);
      toast.error("Error al editar la titularidad");
    }
  };

  const getTitularityData = async () => {
    try {
      const titularities = await getRepertoireTitularity(id as string);

      setTitularity(
        titularities.find((t) => t.id_participacion === idTitularity)
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener las productoras");
      setTitularity(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTitularityData();
  }, []);

  return (
    <CustomLayout>
      <Header back title="Editar Titular" />
      <div className="flex-1 flex flex-col items-center overflow-auto">
        {!loading && titularity && (
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleOnSubmit(values)}
          >
            <Form className="max-w-[30rem] w-[100%] p-[2rem] mt-[2rem] flex flex-col items-center gap-[1rem] border-[1px] border-[#c8c8c8]">
              <div className="w-[100%] text-black flex flex-col">
                <p className="font-black">PRODUCTORA</p>
                {titularity?.productoraDeParticipante.nombre_productora} -{" "}
                {titularity?.productoraDeParticipante.cuit_cuil}
              </div>
              <CustomField
                id="fecha_participacion_inicio"
                name="fecha_participacion_inicio"
                type="date"
                labelText="DESDE"
              />
              <CustomField
                id="fecha_participacion_hasta"
                name="fecha_participacion_hasta"
                type="date"
                labelText="HASTA"
              />
              <div className={"w-[100%] container flex flex-col"}>
                <label style={{ color: "black" }} className="font-bold">
                  Porcentaje
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={titularity.porcentaje_participacion}
                  onChange={handleChangePercentage}
                  className={
                    "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black]"
                  }
                />
                <div className="w-[100%] flex justify-center items-center h-[1rem]">
                  {Number(titularity.porcentaje_participacion) > 100 && (
                    <p className="text-[#e74c3c] text-[0.9rem] w-[100%] mt-[0.5rem] text-center top-[100%]">
                      Estás excediendo el porcentaje disponible del fonograma.
                    </p>
                  )}
                </div>
              </div>
              <CustomButton type="submit">Guardar</CustomButton>
            </Form>
          </Formik>
        )}
      </div>
    </CustomLayout>
  );
}
