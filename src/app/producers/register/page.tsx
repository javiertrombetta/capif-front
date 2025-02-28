"use client";
import React, { FC, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik, FormikErrors } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { validationRegisterApplication } from "@/utils/formValidations";
import CustomField from "@/commons/CustomField/CustomField";
import { useAppSelector } from "@/hooks/storeHooks";
import { sendApplication } from "@/services/auth";
import CustomFileInput from "@/commons/CustomFileInput/CustomFileInput";
import { SendApplication } from "@/types/user.types";
import { uploadProducerDocument } from "@/services/producers";
import { TipoDocumento, TipoPersona } from "@/types/producers.types";
import useModal from "@/hooks/useModal";
import SubmitSendApplication from "@/components/Modals/SubmitSendApplication/SubmitSendApplication";

const PROVINCIAS = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
] as const;

export interface ApplicationValues {
  nombre_productora: string;
  nombre: string;
  apellido: string;
  telefono_usuario: string;
  tipo_persona: TipoPersona;
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

const page: FC = () => {
  const [currentEntity, setCurrentEntity] = useState<TipoPersona>("FISICA");
  const [files, setFiles] = useState<Partial<Record<TipoDocumento, File>>>({});
  const authUser = useAppSelector((state) => state.auth);
  const { openModal } = useModal();

  const initialValues: ApplicationValues = {
    nombre_productora: "",
    nombre: "",
    apellido: "",
    telefono_usuario: "",
    tipo_persona: "FISICA",
    cuit_cuil: "",
    email: authUser.email || "",
    calle: "",
    numero: "",
    ciudad: "",
    localidad: "",
    provincia: "BUENOS AIRES",
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

  const handleCurrentEntity = (value: TipoPersona) => {
    setCurrentEntity(value);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipoDocumento: TipoDocumento
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles({ ...files, [tipoDocumento]: e.target.files[0] });
    }
  };

  const handleFileRemove = (tipoDocumento: TipoDocumento) => {
    const { [tipoDocumento]: _, ...resto } = files;
    setFiles(resto);
  };

  const onRadioFieldChange = (
    entity: TipoPersona,
    values: ApplicationValues,
    setValues: (
      values: React.SetStateAction<ApplicationValues>,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<ApplicationValues>>
  ) => {
    handleCurrentEntity(entity);
    setValues({
      ...values,
      tipo_persona: entity,
    });
  };

  const onOpenModal = () => {
    openModal(<SubmitSendApplication />);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    values: ApplicationValues
  ) => {
    e.preventDefault();
    try {
      if (authUser.id_usuario) {
        const requestData: SendApplication = {
          nombre: values.nombre,
          apellido: values.apellido,
          telefono: values.telefono_usuario,
          productoraData: {
            nombre_productora: values.nombre_productora,
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
            ...(currentEntity === "FISICA"
              ? {
                  tipo_persona: "FISICA",
                  nombres: values.nombres_representante,
                  apellidos: values.apellidos_representante,
                }
              : {
                  tipo_persona: "JURIDICA",
                  razon_social: values.razon_social,
                  nombres_representante: values.nombres_representante,
                  apellidos_representante: values.apellidos_representante,
                  cuit_representante: values.cuit_representante,
                }),
          },
        };

        const response = await sendApplication(requestData);

        await uploadFiles(response.productora);

        onOpenModal();
      }
    } catch (error) {
      toast.error(
        "Error al crear aplicación. Revisar que todos los campos se encuentren completos y los archivos de su DNI y comprobante de pago subidos."
      );
      console.log(error);
    }
  };

  const uploadFiles = async (idProductora: string) => {
    const formData = new FormData();
    const tipoDocumentos = Object.keys(files).join(",");
    formData.append("tipoDocumento", tipoDocumentos);
    Object.values(files).forEach((f) => {
      formData.append("documentos", f);
    });

    await uploadProducerDocument(formData, idProductora);
  };

  return (
    <CustomLayout>
      <Header title="Completar Registro" />
      <div className="flex flex-1 flex-col pr-[2rem] pl-[2rem] mb-[2rem] w-[100%] overflow-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationRegisterApplication}
          onSubmit={() => {}}
        >
          {({ isSubmitting, isValid, dirty, values, setValues }) => (
            <Form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                onSubmit(e, values)
              }
              id="form"
              className="w-[100%]"
            >
              <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8] mt-[2rem]">
                <p className="text-black font-bold text-3xl mb-[1rem]">
                  Datos del Usuario Principal
                </p>
                <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
                  <CustomField
                    width="w-[100%]"
                    type="text"
                    id="nombre"
                    name="nombre"
                    labelText="NOMBRES"
                  />

                  <CustomField
                    width="w-[100%]"
                    type="text"
                    id="apellido"
                    name="apellido"
                    labelText="APELLIDOS"
                  />
                </div>
                <div className="flex w-[100%] gap-[2rem]">
                  <CustomField
                    width="w-[100%]"
                    type="text"
                    id="telefono_usuario"
                    name="telefono_usuario"
                    labelText="TELÉFONO"
                  />
                </div>
              </div>

              <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8] mt-[2rem]">
                <p className="text-black font-bold text-3xl mb-[1rem]">
                  Datos del Productor Fonográfico
                </p>
                <div className="flex gap-[2rem] mt-[2rem]">
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
                <EntityForm entity={currentEntity} />
              </div>
              <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8] mt-[2rem]">
                <p className="text-black font-bold text-3xl mb-[1rem]">
                  Documentos
                </p>
                {currentEntity === "FISICA" ? (
                  <DocumentInput
                    file={files["dni_persona_fisica"]}
                    handleFileChange={(e) =>
                      handleFileChange(e, "dni_persona_fisica")
                    }
                    handleFileRemove={() =>
                      handleFileRemove("dni_persona_fisica")
                    }
                  >
                    Cargue aquí una foto del frente de su documento nacional de
                    identidad.
                  </DocumentInput>
                ) : (
                  <>
                    <DocumentInput
                      file={files["dni_representante_legal"]}
                      handleFileChange={(e) =>
                        handleFileChange(e, "dni_representante_legal")
                      }
                      handleFileRemove={() =>
                        handleFileRemove("dni_representante_legal")
                      }
                    >
                      Cargue aquí una foto del frente del documento del
                      representante legal.
                    </DocumentInput>

                    <DocumentInput
                      file={files["contrato_social"]}
                      handleFileChange={(e) =>
                        handleFileChange(e, "contrato_social")
                      }
                      handleFileRemove={() =>
                        handleFileRemove("contrato_social")
                      }
                    >
                      CARGAR ESTATUTO O CONTRATO SOCIAL
                    </DocumentInput>
                  </>
                )}
                <DocumentInput
                  file={files["comprobante_ISRC"]}
                  handleFileChange={(e) =>
                    handleFileChange(e, "comprobante_ISRC")
                  }
                  handleFileRemove={() => handleFileRemove("comprobante_ISRC")}
                >
                  <p className="font-bold text-black mt-[2rem]">
                    Cargue aquí su comprobante de pago de alta de ISRC
                  </p>
                  <p className="font-bold text-black">
                    Para obtener el código de productor, el titular deberá
                    abonar la suma de $ 15.000. El pago se realiza por el alta a
                    la siguiente cuenta bancaria:
                  </p>
                  <p className="font-bold text-black">BANCO GALICIA</p>
                  <p className="font-bold text-black">SUCURSAL 5</p>
                  <p className="font-bold text-black">CUIT: 30-52172973-9</p>
                  <p className="font-bold text-black">N°: 9750252-4 005-6</p>
                  <p className="font-bold text-black">
                    CBU: 0070005430009750252469
                  </p>
                </DocumentInput>
              </div>
              <div className="mt-[5rem] flex gap-[1rem] ">
                {isSubmitting || !isValid || !dirty ? (
                  <CustomButton
                    disabled={isSubmitting || !isValid || !dirty}
                    background={"disabled"}
                    type="submit"
                    className="bg-[#008d4c]"
                  >
                    Aceptar
                  </CustomButton>
                ) : (
                  <CustomButton
                    disabled={isSubmitting || !isValid || !dirty}
                    type="submit"
                    className="bg-[#008d4c]"
                  >
                    Aceptar
                  </CustomButton>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CustomLayout>
  );
};

export default page;

const EntityForm: FC<{
  entity: TipoPersona;
}> = ({ entity }) => {
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
      {entity === "JURIDICA" && (
        <CustomField
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
            width="w-[100%]"
            id="nombres_representante"
            name="nombres_representante"
            type="text"
            labelText="NOMBRES"
          />
          <CustomField
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
            width="w-[100%]"
            id="nombres_representante"
            name="nombres_representante"
            type="text"
            labelText="NOMBRES REPRESENTANTE LEGAL"
          />
          <CustomField
            width="w-[100%]"
            id="apellidos_representante"
            name="apellidos_representante"
            type="text"
            labelText="APELLIDOS REPRESENTANTE LEGAL"
          />
        </div>
      )}

      {entity === "FISICA" ? (
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
          labelText="DATOS ADICIONALES (OPCIONAL)"
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
        width="w-[100%]"
        id="telefono"
        name="telefono"
        type="text"
        labelText="TELÉFONO PRODUCTORA"
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

interface DocumentInputProps {
  children: ReactNode;
  file?: File;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: () => void;
}

const DocumentInput = ({
  children,
  file,
  handleFileChange,
  handleFileRemove,
}: DocumentInputProps) => {
  return (
    <div className="flex flex-col items-start space-y-[0.5rem]">
      <div className="font-bold text-black">{children}</div>
      <CustomFileInput onChange={(e) => handleFileChange(e)}>
        Seleccione Archivo
      </CustomFileInput>
      {file && (
        <div className="w-[100%] h-[3rem] bg-[#EBF6E0] flex items-center justify-between px-[1rem]">
          <p className="text-mainblue">{file?.name}</p>
          <button onClick={handleFileRemove} className="text-[#e74c3c]">
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};
