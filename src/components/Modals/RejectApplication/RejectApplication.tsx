"use client";
import React, { FC } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import CustomButton from "@/commons/CustomButton/CustomButton";
import useModal from "@/hooks/useModal";
import { rejectApplication } from "@/services/auth";

const RejectApplication: FC<{ idUsuario: string }> = ({ idUsuario }) => {
  const { closeModal } = useModal();
  const router = useRouter();

  const handleSubmit = async (values: { comentario: string }) => {
    try {
      await rejectApplication(idUsuario, values.comentario);
      toast.success("La solicitud fue aceptada correctamente");
      closeModal();
      router.push("/users");
    } catch (error) {
      toast.error("Error al aceptar la solicitud");
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  const initialValues = {
    comentario: "",
  };

  const validationSchema = Yup.object({
    comentario: Yup.string()
      .min(5, "El comentario debe tener al menos 5 caracteres")
      .required("El comentario es obligatorio"),
  });

  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
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
