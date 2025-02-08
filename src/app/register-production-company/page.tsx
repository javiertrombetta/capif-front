"use client";
import React, { FC, useState } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { validationRegisterApplication } from "@/utils/formValidations";
import { Field, Form, Formik, FormikErrors } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
// import { SendApplication } from "@/types/user.types";
import { sendApplication } from "@/services/auth";
import CustomFileInput from "@/commons/CustomFileInput/CustomFileInput";
import { SendApplication } from "@/types/user.types";
import { uploadCompanyDocument } from "@/services/productionCompanies";
import useFileHandler from "@/hooks/useFileHandler";
import { toast } from "react-toastify";

export interface ApplicationValues {
  nombre_productora: string;
  nombre: string;
  apellido: string;
  telefono_usuario: string;
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

const page: FC = () => {
  const [currentEntity, setCurrentEntity] = useState<"natural" | "legal">(
    "natural"
  );
  const { files, handleFileChange, handleRemoveFile } = useFileHandler({
    isrcTicketsFile: [],
    nationalIdCardFiles: [],
    bylawsOrSocialContractFiles: [],
  });
  const dispatch = useAppDispatch();

  const authUser = useAppSelector((state) => state.auth);
  const handleCurrentEntity = (value: "natural" | "legal") => {
    setCurrentEntity(value);
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
    nombre: "",
    apellido: "",
    telefono_usuario: "",
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

  const onOpenModal = () => {
    dispatch(
      setModal({ isActive: true, type: ModalNames.SUBMIT_SEND_APPILICATION })
    );
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
          telefono: values.telefono,
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
            ...(currentEntity === "natural"
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

        if (files.isrcTicketsFiles?.length > 0) {
          await uploadFile(
            "isrcTicketsFiles",
            "comprobante_ISRC",
            response.productora
          );
        }
        if (files.nationalIdCardFiles?.length > 0) {
          await uploadFile(
            "nationalIdCardFiles",
            currentEntity === "natural"
              ? "dni_persona_fisica"
              : "dni_representante_legal",
            response.productora
          );
        }
        if (files.bylawsOrSocialContractFiles?.length > 0) {
          await uploadFile(
            "bylawsOrSocialContractFiles",
            "contrato_social",
            response.productora
          );
        }

        onOpenModal();
      }
    } catch (error) {
      toast.error(
        "Error al crear aplicación. Revisar campos e intentar nuevamente"
      );
      console.log(error);
    }
  };

  const uploadFile = async (
    key: string,
    docType: string,
    companyId: string
  ) => {
    const formData = new FormData();
    formData.append("tipoDocumento", docType);
    files[key].forEach((file) => {
      formData.append("documentos", file);
    });
    await uploadCompanyDocument(formData, companyId);
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
              <div className="w-[100%] flex flex-col justify-start mt-[2rem]">
                <p className="text-black font-bold text-[1.3rem]">
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
                isrcFiles={{
                  files: files.isrcTicketsFiles,
                  handleFileChange: handleFileChange("isrcTicketsFiles"),
                  handleRemoveFile: handleRemoveFile("isrcTicketsFiles"),
                }}
                nationalIdCard={{
                  files: files.nationalIdCardFiles,
                  handleFileChange: handleFileChange("nationalIdCardFiles"),
                  handleRemoveFile: handleRemoveFile("nationalIdCardFiles"),
                }}
                bylawsOrSocialContract={{
                  files: files.bylawsOrSocialContractFiles,
                  handleFileChange: handleFileChange(
                    "bylawsOrSocialContractFiles"
                  ),
                  handleRemoveFile: handleRemoveFile(
                    "bylawsOrSocialContractFiles"
                  ),
                }}
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

export default page;
/*
const ApplicationStatus: FC = () => {
  return (
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
        className="font-bold text-black text-[1.2rem]"
      >
        APROBADO
      </p>
      <p
        style={{ color: "#e74c3c" }}
        className="font-bold text-black text-[1.2rem]"
      >
        RECHAZADO
      </p>
    </div>
  );
};
*/

const EntityForm: FC<{
  entity: "natural" | "legal";
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  isrcFiles: {
    files: File[];
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveFile: (index: number) => void;
  };
  nationalIdCard: {
    files: File[];
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveFile: (index: number) => void;
  };
  bylawsOrSocialContract: {
    files: File[];
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveFile: (index: number) => void;
  };
}> = ({
  entity,
  isSubmitting,
  isValid,
  dirty,
  isrcFiles,
  nationalIdCard,
  bylawsOrSocialContract,
}) => {
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
          labelText="CBU"
        />
        <CustomField
          width="w-[100%]"
          id="alias_cbu"
          name="alias_cbu"
          type="text"
          labelText="ALIAS"
        />
      </div>

      <div className="mt-[1.5rem] flex flex-col items-start">
        <p className="font-bold text-black">
          {entity === "natural"
            ? "CARGAR DOCUMENTO NACIONAL DE IDENTIDAD"
            : " CARGAR DOCUMENTO NACIONAL DE IDENTIDAD DEL REPRESENTANTE LEGAL"}
        </p>
        <input
          onChange={nationalIdCard.handleFileChange}
          className="mt-[0.3rem]"
          type="file"
          accept="image/*,application/pdf"
          multiple
        />
        <div className="mt-[1rem] flex flex-col">
          {nationalIdCard.files?.map((file: File, index: number) => (
            <div className="flex gap-[1rem]">
              <p className="text-mainblue">{file.name}</p>
              <button
                onClick={() => {
                  nationalIdCard.handleRemoveFile(index);
                }}
                className="text-[#e74c3c]"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {entity === "legal" && (
        <div className="mt-[1.5rem] flex flex-col items-start">
          <p className="font-bold text-black">
            CARGAR ESTATUTO O CONTRATO SOCIAL
          </p>
          <input
            onChange={bylawsOrSocialContract.handleFileChange}
            className="mt-[0.3rem]"
            type="file"
            accept="image/*,application/pdf"
            multiple
          />
          <div className="mt-[1rem] flex flex-col">
            {bylawsOrSocialContract.files?.map((file: File, index: number) => (
              <div className="flex gap-[1rem]">
                <p className="text-mainblue">{file.name}</p>
                <button
                  onClick={() => {
                    bylawsOrSocialContract.handleRemoveFile(index);
                  }}
                  className="text-[#e74c3c]"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
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
      <div className="pt-[1rem] pb-[1rem] mt-[2rem] w-[100%] h-auto border-[#c5c5c5] border-[1px] rounded-[0.7rem] overflow-hidden">
        {/* <CustomButton type="file" className="mt-[1rem] ml-[1rem]">
          Seleccione Archivos
        </CustomButton> */}
        <CustomFileInput
          onChange={isrcFiles.handleFileChange}
          className="ml-[1rem]"
        >
          {" "}
          Seleccione un Archivo
        </CustomFileInput>
        {isrcFiles.files?.map((file: File, index: number) => (
          <div
            key={index}
            className="w-[100%] h-[3rem] bg-[#EBF6E0] flex items-center justify-between pr-[1rem] pl-[1rem] mt-[1rem] shadow-sm shadow-black"
          >
            <p className="text-mainblue">{file.name}</p>
            <button
              onClick={() => {
                isrcFiles.handleRemoveFile(index);
              }}
              className="text-mainblue"
            >
              Eliminar
            </button>
          </div>
        ))}
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

        {/* <CustomButton onClick={handleRejectRegister}>Cancelar</CustomButton> */}
      </div>
    </div>
  );
};

/*

 const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    values: ApplicationValues
  ) => {
    e.preventDefault();
    ((values: ApplicationValues) => {
      if (authUser.id_usuario) {
        const formData = new FormData();
        formData.append("id_usuario", authUser.id_usuario);
        formData.append("nombre", values.nombre);
        formData.append("apellido", values.apellido);
        formData.append("telefono", values.telefono_usuario);

        if (currentEntity === "natural") {
          formData.append(
            "productoraData",
            JSON.stringify({
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
            })
          );
        }
        if (currentEntity === "legal") {
          formData.append(
            "productoraData",
            JSON.stringify({
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
            })
          );
        }

        isrcTicketsFiles.forEach((file, index) => {
          formData.append(
            `documentos[${index}]`,
            JSON.stringify({
              nombre_documento: `documento_${index + 1}`,
              ruta_archivo_documento: `/uploads/${file.name}`,
            })
          );
          formData.append(`archivo_${index}`, file);
        });

        sendApplication(formData);
        // onOpenModal();
      }
    })(values);
  };

*/
