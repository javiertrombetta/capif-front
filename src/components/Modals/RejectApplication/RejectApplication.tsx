"use client";
import React, { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { IoClose } from "react-icons/io5";
import { useParams } from "next/navigation";
import { rejectApplication } from "@/services/auth";

const RejectApplication: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const id_usuario = useParams().id;

  const initialValues = {
    comentario: "",
  };

  const validationSchema = Yup.object({
    comentario: Yup.string()
      .min(5, "El comentario debe tener al menos 5 caracteres")
      .required("El comentario es obligatorio"),
  });

  const handleSubmit = async (values: { comentario: string }) => {
    if (!Array.isArray(id_usuario)) {
      try {
        await rejectApplication(id_usuario, values.comentario);
        alert("La solicitud fue rechazada correctamente");
        onCloseModal();
      } catch (error) {
        console.error("Error al rechazar la solicitud:", error);
      }
    }
  };

  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>
      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        Comenta la razón del rechazo del registro:
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full flex flex-col items-center gap-2">
            <Field
              as="textarea"
              id="comentario"
              name="comentario"
              rows={3}
              className="padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] w-[90%] text-black"
            />
            <ErrorMessage
              name="comentario"
              component="div"
              className="text-red-500 text-sm"
            />

            <CustomButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Rechazar"}
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RejectApplication;
