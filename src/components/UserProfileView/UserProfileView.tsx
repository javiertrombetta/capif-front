"use client";
import React, { FC, useState } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { validationRegisterApplication } from "@/utils/formValidations";
import { Field, Form, Formik, FormikErrors } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";

export interface ApplicationValues {
  nombre_productora: string;
  apellido_productor: string;
  tipo_persona: "FISICA" | "JURIDICA";
  cuit_cuil: string;
  email: string;
  calle: string;
  numero: string;
  ciudad: string;
  localidad: string;
  provincia: string;
  codigo_postal: string;
  telefono: string;
  nacionalidad: string;
  alias_cbu: string;
  cbu: string;
  datos_adicionales?: string;
  denominacion_sello?: string;
  razon_social?: string;
  apellidos_representante?: string;
  nombres_representante?: string;
  cuit_representante?: string;
}

const UserProfileView: FC = () => {
  const [currentEntity, setCurrentEntity] = useState<"natural" | "legal">(
    "natural"
  );
  const [_uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  /*
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth);
  */
  const handleCurrentEntity = (value: "natural" | "legal") => {
    setCurrentEntity(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const onRadioFieldChange = (
    entity: "natural" | "legal",
    values: ApplicationValues,
    setValues: (
      values: React.SetStateAction<ApplicationValues>,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<ApplicationValues>>
  ) => {
    handleCurrentEntity(entity);
    setValues({
      ...values,
      tipo_persona: entity === "natural" ? "FISICA" : "JURIDICA",
    });
  };
  const initialValues: ApplicationValues = {
    nombre_productora: "",
    apellido_productor: "",
    tipo_persona: "FISICA",
    cuit_cuil: "",
    email: "",
    calle: "",
    numero: "",
    ciudad: "",
    localidad: "",
    provincia: "",
    codigo_postal: "",
    telefono: "",
    nacionalidad: "",
    alias_cbu: "",
    cbu: "",
    datos_adicionales: "",
    denominacion_sello: "",
    razon_social: "",
    apellidos_representante: "",
    nombres_representante: "",
    cuit_representante: "",
  };

  return (
    <CustomLayout>
      <Header back title="Ficha de Usuario" className="" />
      <div className="pr-[2rem] pl-[2rem] w-[100%]">
        {/*
        <div className="w-[100%] mt-[2rem] flex gap-[0.5rem]">
          <p className="text-black text-[1.2rem]">Estado de Solicitud:</p>

          <p
            style={{ color: "#f1c40f" }}
            className="font-bold text-black text-[1.2rem]"
          >
            PENDIENTE
          </p>
           <p
           style={{ color: "#2ecc71" }}
          className="font-bold text-black text-[1.2rem]">
            APROBADO
          </p>
          <p
           style={{ color: "#e74c3c" }}
          className="font-bold text-black text-[1.2rem]">
            RECHAZADO
          </p>
        </div>
*/}

        <Formik
          initialValues={initialValues}
          validationSchema={validationRegisterApplication}
          onSubmit={() => {}}
        >
          {({ isSubmitting, isValid, dirty, values, setValues }) => (
            <Form id="form" className="w-[100%]">
              <div className="flex gap-[2rem] mt-[2rem]">
                <div className="flex gap-[0.5rem]">
                  <Field
                    onChange={() => {
                      onRadioFieldChange("natural", values, setValues);
                    }}
                    name="tipo_persona"
                    id="tipo_persona"
                    checked={currentEntity === "natural"}
                    value="FISICA"
                    type="radio"
                  />
                  <h1 className="font-bold text-black">PERSONA FÍSICA</h1>
                </div>

                <div className="flex gap-[0.5rem]">
                  <Field
                    onChange={() => {
                      onRadioFieldChange("legal", values, setValues);
                    }}
                    name="tipo_persona"
                    id="tipo_persona"
                    checked={currentEntity === "legal"}
                    value="JURIDICA"
                    type="radio"
                  />
                  <h1 className="font-bold text-black">PERSONA JURÍDICA</h1>
                </div>
              </div>

              <EntityForm
                handleFileChange={handleFileChange}
                dirty={dirty}
                isValid={isValid}
                isSubmitting={isSubmitting}
                entity={currentEntity}
              />
            </Form>
          )}
        </Formik>
      </div>
    </CustomLayout>
  );
};

export default UserProfileView;

const EntityForm: FC<{
  entity: "natural" | "legal";
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ entity, handleFileChange }) => {
  const dispatch = useAppDispatch();

  const rejectApplication = () => {
    dispatch(
      setModal({
        type: ModalNames.REJECT_REGISTRATION,
        isActive: true,
      })
    );
  };

  const acceptApplication = () => {
    dispatch(
      setModal({
        type: ModalNames.ACCEPT_APPLICATION,
        isActive: true,
      })
    );
  };

  return (
    <div className="mt-[3rem] w-[100%]">
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomField
          width="w-[100%]"
          id="nombre_productora"
          name="nombre_productora"
          type="text"
          labelText="NOMBRE PRODUCTORA"
        />
        <CustomField
          width="w-[100%]"
          id="cuit_cuil"
          name="cuit_cuil"
          type="text"
          labelText="CUIT/CUIL"
        />
      </div>
      {entity === "legal" && (
        <CustomField
          width="w-[100%]"
          id="razon_social"
          name="razon_social"
          type="text"
          labelText="RAZON SOCIAL"
        />
      )}

      {entity === "natural" ? (
        <div className="flex w-[100%] gap-[2rem] mt-[1rem]">
          <CustomField
            width="w-[100%]"
            id="nombre_productor"
            name="nombre_productor"
            type="text"
            labelText="NOMBRES"
          />
          <CustomField
            width="w-[100%]"
            id="apellido_productor"
            name="apellido_productor"
            type="text"
            labelText="APELLIDOS"
          />
        </div>
      ) : (
        <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
          <CustomField
            width="w-[100%]"
            id="apellidos_representante"
            name="apellidos_representante"
            type="text"
            labelText="APELLIDOS REPRESENTANTE LEGAL"
          />
          <CustomField
            width="w-[100%]"
            id="nombres_representante"
            name="nombres_representante"
            type="text"
            labelText="NOMBRES REPRESENTANTE LEGAL"
          />
        </div>
      )}

      {entity === "natural" ? (
        <CustomField
          width="w-[100%]"
          id="email"
          name="email"
          type="email"
          labelText="EMAIL"
        />
      ) : (
        <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
          <CustomField
            width="w-[100%]"
            id="email"
            name="email"
            type="email"
            labelText="EMAIL"
          />

          <CustomField
            width="w-[100%]"
            id="cuit_representante"
            name="cuit_representante"
            type="text"
            labelText="CUIT REPRESENTANTE LEGAL"
          />
        </div>
      )}
      <CustomField
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
          type="text"
          labelText="PROVINCIA"
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
        width="w-[100%]"
        id="telefono"
        name="telefono"
        type="text"
        labelText="TELÉFONO"
      />
      <CustomField
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
          labelText="CBU (opcional)"
        />
        <CustomField
          width="w-[100%]"
          id="alias_cbu"
          name="alias_cbu"
          type="text"
          labelText="ALIAS (opcional)"
        />
      </div>

      <div className="mt-[1.5rem]">
        <p className="font-bold text-black">
          {entity === "natural"
            ? "CARGAR DOCUMENTO NACIONAL DE IDENTIDAD"
            : "CARGAR ESTATUTO O CONTRATO SOCIAL"}
        </p>
        <input
          className="mt-[0.3rem]"
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {entity === "legal" && (
        <div className="mt-[1.5rem]">
          <p className="font-bold text-black">
            CARGAR DOCUMENTO NACIONAL DE IDENTIDAD DEL REPRESENTANTE LEGAL
          </p>
          <input
            className="mt-[0.3rem]"
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* <div className="w-[100%] flex justify-end">
        <CustomButton className="gap-[0.4rem]">
          <IoMdDownload />
          Descargar Archivo Ingresado
        </CustomButton>
      </div> */}
      <div>
        <p className="font-bold text-black mt-[2rem]">
          OTROS Documento Adicionales (Cargue aquí su comprobante de pago de
          alta de ISRC)
        </p>
        <p className="font-bold text-black">
          Para obtener el código de productor, el titular deberá abonar la suma
          de $ 10.000. El pago se realiza por el alta a la siguiente cuenta
          bancaria:
        </p>
        <p className="font-bold text-black">BANCO GALICIA</p>
        <p className="font-bold text-black">SUCURSAL 5</p>
        <p className="font-bold text-black">CUIT: 30-52172973-9</p>
        <p className="font-bold text-black">N°: 9750252-4 005-6</p>
        <p className="font-bold text-black">CBU: 0070005430009750252469</p>
      </div>

      <div className="mt-[2rem] w-[100%] h-[15rem] border-[#c5c5c5] border-[1px] rounded-[0.7rem] overflow-hidden">
        <CustomButton className="mt-[1rem] ml-[1rem]">
          Seleccione Archivos
        </CustomButton>

        <div className="w-[100%] h-[3rem] bg-[#EBF6E0] flex items-center justify-between pr-[1rem] pl-[1rem] mt-[1rem] shadow-sm shadow-black">
          <p className="text-mainblue">1-comprobante pago CAPIF.jpg</p>
          <p className="text-mainblue">Eliminar</p>
        </div>
      </div>

      <div className="mt-[5rem] flex gap-[1rem] ">
        <div className="flex gap-[1rem]">
          <CustomButton onClick={acceptApplication} className="bg-[#008d4c]">
            Confirmar el Registro del Usuario
          </CustomButton>
          <CustomButton background="delete" onClick={rejectApplication}>
            Rechazar
          </CustomButton>
          <CustomButton background="warn">Editar</CustomButton>
        </div>

        {/* <CustomButton onClick={handleRejectRegister}>Cancelar</CustomButton> */}
      </div>
    </div>
  );
};

/*

  const dispatch = useAppDispatch();

  const handleRejectRegister = () => {
    dispatch(
      setModal({ type: ModalNames.REJECT_REGISTRATION, isActive: true })
    );
  };



 <div className="mt-[5rem] flex gap-[1rem]">
        <CustomButton className="bg-[#008d4c]">
          Confirmar el Registro del Usuario
        </CustomButton>
        <CustomButton onClick={handleRejectRegister}>Rechazar</CustomButton>
        <CustomButton>Editar</CustomButton>
      </div>

*/

/*
const onSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  values: ApplicationValues
) => {
  e.preventDefault();
  ((values: ApplicationValues) => {
    if (authUser.id_usuario) {
      const requestData = {
        id_usuario: authUser.id_usuario,
        nombre: values.nombre,
        apellido: values.apellido,
        telefono: values.telefono,
        productoraData:
          currentEntity === "natural"
            ? {
                nombres: values.nombre_productor,
                apellidos: values.apellido_productor,
                nombre_productora: "Rodri",
                tipo_persona: "FISICA",
                cuit_cuil: values.cuit_cuil,
                email: values.email,
                calle: values.calle,
                numero: values.numero,
                ciudad: values.ciudad,
                localidad: values.localidad,
                provincia: values.provincia,
                codigo_postal: values.codigo_postal,
                telefono: values.telefono,
                nacionalidad: values.nacionalidad,
                alias_cbu: values.alias_cbu,
                cbu: values.cbu,
                denominacion_sello: values.denominacion_sello,
                datos_adicionales: values.datos_adicionales,
              }
            : {
                nombre_productora: "Rodri",
                razon_social: values.razon_social,
                apellidos_representante: values.apellidos_representante,
                nombres_representante: values.nombres_representante,
                cuit_representante: values.cuit_representante,
                tipo_persona: "FISICA",
                cuit_cuil: values.cuit_cuil,
                email: values.email,
                calle: values.calle,
                numero: values.numero,
                ciudad: values.ciudad,
                localidad: values.localidad,
                provincia: values.provincia,
                codigo_postal: values.codigo_postal,
                telefono: values.telefono,
                nacionalidad: values.nacionalidad,
                alias_cbu: values.alias_cbu,
                cbu: values.cbu,
                denominacion_sello: values.denominacion_sello,
                datos_adicionales: values.datos_adicionales,
              },
      };

      sendApplication(requestData);
      onOpenModal();
    }
  })(values);
};
*/
