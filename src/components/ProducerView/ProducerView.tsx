"use client";
import React, { FC, useEffect, useState } from "react";
import { Field, Form, Formik, FormikErrors } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { validationEditProducer } from "@/utils/formValidations";
import CustomField from "@/commons/CustomField/CustomField";
import { getProducerById, updateProducer } from "@/services/producers";
import {
  ProductionCompanyByIdResponse,
  PROVINCIAS,
  TipoPersona,
  UpdateProducerPayload,
} from "@/types/producers.types";
import { Documents } from "./DocumentsView";
import { toast } from "react-toastify";

const ProducerView = ({
  idProducer,
  fieldsDisabled = true,
}: {
  idProducer: string;
  fieldsDisabled?: boolean;
}) => {
  const [currentEntity, setCurrentEntity] = useState<TipoPersona>("FISICA");
  const [companyData, setCompanyData] = useState<
    ProductionCompanyByIdResponse["productora"] | null
  >(null);

  const initialValues: UpdateProducerPayload = {
    nombre_productora: companyData?.nombre_productora || "",
    tipo_persona: companyData?.tipo_persona || "FISICA",
    cuit_cuil: companyData?.cuit_cuil || "",
    email: companyData?.email || "",
    calle: companyData?.calle || "",
    numero: companyData?.numero || "",
    ciudad: companyData?.ciudad || "",
    localidad: companyData?.localidad || "",
    provincia: companyData?.provincia || "",
    codigo_postal: companyData?.codigo_postal || "",
    telefono: companyData?.telefono || "",
    nacionalidad: companyData?.nacionalidad || "",
    datos_adicionales: companyData?.datos_adicionales || "",
    denominacion_sello: companyData?.denominacion_sello || "",
    razon_social: companyData?.razon_social || "",
    apellidos_representante:
      companyData?.apellidos_representante || companyData?.apellidos || "",
    nombres_representante:
      companyData?.nombres_representante || companyData?.nombres || "",
    cuit_representante: companyData?.cuit_representante || "",
    cbu: companyData?.cbu || "",
    alias_cbu: companyData?.alias_cbu || "",
  };

  const onRadioFieldChange = (
    entity: TipoPersona,
    values: UpdateProducerPayload,
    setValues: (
      values: React.SetStateAction<UpdateProducerPayload>,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<UpdateProducerPayload>>
  ) => {
    setCurrentEntity(entity);
    setValues({
      ...values,
      tipo_persona: entity,
    });
  };

  const handleEditCompany = async (values: UpdateProducerPayload) => {
    const payload: UpdateProducerPayload = {
      nombre_productora: values.nombre_productora,
      tipo_persona: values.tipo_persona,
      telefono: values.telefono,
      email: values.email,
      cuit_cuil: values.cuit_cuil,
      calle: values.calle,
      numero: values.numero,
      ciudad: values.ciudad,
      localidad: values.localidad,
      provincia: values.provincia,
      codigo_postal: values.codigo_postal,
      nacionalidad: values.nacionalidad,
      datos_adicionales: values.datos_adicionales,
      denominacion_sello: values.denominacion_sello,
      cbu: values.cbu,
      alias_cbu: values.alias_cbu,
      ...(values.tipo_persona === "FISICA"
        ? {
            nombres: values.nombre_productora,
            apellidos: values.apellidos_representante,
          }
        : {
            razon_social: values.razon_social,
            nombres_representante: values.nombres_representante,
            apellidos_representante: values.apellidos_representante,
            cuit_representante: values.cuit_representante,
          }),
    };
    try {
      await updateProducer(idProducer as string, payload);
      toast.success("Productora Actualizada.");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar productora.");
    }
  };

  const getCompanyData = async () => {
    if (idProducer && !Array.isArray(idProducer)) {
      const company = await getProducerById(idProducer);
      setCompanyData(company);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  return companyData ? (
    <>
      <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
        <h3 className="text-black text-3xl font-black mb-[1rem]">
          Datos Productora
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationEditProducer}
          onSubmit={(values, { resetForm }) => {
            handleEditCompany(values);
            resetForm({ values });
          }}
        >
          {({ isSubmitting, isValid, dirty, values, setValues }) => (
            <Form id="form" className="w-[100%]">
              <div className="flex gap-[2rem]">
                <label className="font-bold text-black">TIPO PERSONA</label>
                <div className="flex gap-[0.5rem]">
                  <Field
                    onChange={() => {
                      onRadioFieldChange("FISICA", values, setValues);
                    }}
                    name="tipo_persona"
                    id="tipo_persona"
                    checked={currentEntity === "FISICA"}
                    value="FISICA"
                    type="radio"
                  />
                  <h1 className="font-bold text-black">PERSONA FÍSICA</h1>
                </div>

                <div className="flex gap-[0.5rem]">
                  <Field
                    onChange={() => {
                      onRadioFieldChange("JURIDICA", values, setValues);
                    }}
                    name="tipo_persona"
                    id="tipo_persona"
                    checked={currentEntity === "JURIDICA"}
                    value="JURIDICA"
                    type="radio"
                  />
                  <h1 className="font-bold text-black">PERSONA JURÍDICA</h1>
                </div>
              </div>

              <EntityForm disabled={fieldsDisabled} entity={currentEntity} />
              <CustomButton
                {...(isSubmitting || !isValid || !dirty
                  ? { disabled: true, background: "disabled" }
                  : {})}
                type="submit"
                className="mt-[1rem]"
              >
                Guardar
              </CustomButton>
            </Form>
          )}
        </Formik>
      </div>
      <div className="p-[1rem] mt-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
        <h3 className="text-black text-3xl font-black mb-[1rem]">Documentos</h3>
        <Documents entity={currentEntity} idProductora={idProducer} />
      </div>
    </>
  ) : null;
};

export default ProducerView;

const EntityForm: FC<{
  disabled: boolean;
  entity: TipoPersona;
}> = ({ entity, disabled }) => {
  return (
    <div className="w-[100%]">
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomField
          disabled={disabled}
          width="w-[100%]"
          id="nombre_productora"
          name="nombre_productora"
          type="text"
          labelText="NOMBRE PRODUCTORA"
        />
        <CustomField
          disabled
          width="w-[100%]"
          id="cuit_cuil"
          name="cuit_cuil"
          type="text"
          labelText="CUIT/CUIL"
        />
      </div>
      {entity === "JURIDICA" && (
        <CustomField
          disabled={disabled}
          width="w-[100%]"
          id="razon_social"
          name="razon_social"
          type="text"
          labelText="RAZON SOCIAL"
        />
      )}
      {entity === "FISICA" ? (
        <div className="flex w-[100%] gap-[2rem] mt-[1rem]">
          <CustomField
            disabled={disabled}
            width="w-[100%]"
            id="nombres_representante"
            name="nombres_representante"
            type="text"
            labelText="NOMBRES"
          />
          <CustomField
            disabled={disabled}
            width="w-[100%]"
            id="apellidos_representante"
            name="apellidos_representante"
            type="text"
            labelText="APELLIDOS"
          />
        </div>
      ) : (
        <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
          <CustomField
            disabled={disabled}
            width="w-[100%]"
            id="apellidos_representante"
            name="apellidos_representante"
            type="text"
            labelText="APELLIDOS REPRESENTANTE LEGAL"
          />
          <CustomField
            disabled={disabled}
            width="w-[100%]"
            id="nombres_representante"
            name="nombres_representante"
            type="text"
            labelText="NOMBRES REPRESENTANTE LEGAL"
          />
        </div>
      )}
      {entity === "FISICA" ? (
        <CustomField
          disabled={disabled}
          width="w-[100%]"
          id="email"
          name="email"
          type="email"
          labelText="EMAIL"
        />
      ) : (
        <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
          <CustomField
            disabled={disabled}
            width="w-[100%]"
            id="email"
            name="email"
            type="email"
            labelText="EMAIL"
          />

          <CustomField
            disabled={disabled}
            width="w-[100%]"
            id="cuit_representante"
            name="cuit_representante"
            type="text"
            labelText="CUIT REPRESENTANTE LEGAL"
          />
        </div>
      )}
      <CustomField
        disabled={disabled}
        width="w-[100%]"
        id="denominacion_sello"
        name="denominacion_sello"
        type="text"
        labelText="DENOMINACIÓN DEL SELLO Y SUBSELLOS (opcional)"
      />
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomField
          width="w-[100%]"
          id="calle"
          name="calle"
          type="text"
          labelText="CALLE"
        />
        <CustomField
          width="w-[100%]"
          id="numero"
          name="numero"
          type="text"
          labelText="NÚMERO"
        />
      </div>
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomField
          width="w-[100%]"
          id="datos_adicionales"
          name="datos_adicionales"
          type="text"
          labelText="DATOS ADICIONALES"
        />
        <CustomField
          width="w-[100%]"
          id="ciudad"
          name="ciudad"
          type="text"
          labelText="CUIDAD"
        />
      </div>
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomField
          width="w-[100%]"
          id="localidad"
          name="localidad"
          type="text"
          labelText="LOCALIDAD"
        />
        <CustomField
          width="w-[100%]"
          id="provincia"
          name="provincia"
          type="select"
          labelText="PROVINCIA"
          options={PROVINCIAS.map((p) => ({ name: p, value: p }))}
        />
        <CustomField
          width="w-[100%]"
          id="codigo_postal"
          name="codigo_postal"
          type="text"
          labelText="CÓDIGO POSTAL"
        />
      </div>
      <CustomField
        disabled={disabled}
        width="w-[100%]"
        id="telefono"
        name="telefono"
        type="text"
        labelText="TELÉFONO"
      />
      <CustomField
        disabled={disabled}
        width="w-[100%]"
        id="nacionalidad"
        name="nacionalidad"
        type="text"
        labelText="NACIONALIDAD"
      />
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomField
          width="w-[100%]"
          id="cbu"
          name="cbu"
          type="text"
          labelText="CBU/CVU"
        />
        {/* <CustomField
          width="w-[100%]"
          id="alias_cbu"
          name="alias_cbu"
          type="text"
          labelText="ALIAS"
        /> */}
      </div>
    </div>
  );
};
