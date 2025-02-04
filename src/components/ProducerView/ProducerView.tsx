"use client";
import React, { FC, useEffect, useState } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { validationRegisterApplication } from "@/utils/formValidations";
import { Field, Form, Formik } from "formik";
import CustomField from "@/commons/CustomField/CustomField";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import { getCompanyById, updateProducer } from "@/services/productionCompanies";
import { useParams } from "next/navigation";
import {
  ProductionCompanyByIdResponse,
  UpdateProducerPayload,
} from "@/types/productionCompany.types";
import { toast } from "react-toastify";
import { getUsers } from "@/services/users";
import { acceptApplication } from "@/services/auth";

const ProducerView: FC = () => {
  const { id } = useParams();
  const [_uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [companyData, setCompanyData] =
    useState<ProductionCompanyByIdResponse | null>(null);
  const [fieldsDisabled, setFieldsDisabled] = useState<boolean>(true);

  const initialValues: UpdateProducerPayload = {
    nombre_productora: companyData?.nombre_productora || "",
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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleAccept = async () => {
    const users = await getUsers({
      productoraId: companyData?.id_productora,
    });

    const { id } = users[0];

    console.log(id);

    // try {
    //   await acceptApplication(id);
    //   toast.success("La solicitud fue aceptada correctamente");
    // } catch (error) {
    //   toast.error("Error al aceptar la solicitud");
    //   console.error("Error al aceptar la solicitud:", error);
    // }
  };

  const handleEditCompany = async (values: UpdateProducerPayload) => {
    await updateProducer(id as string, values);
  };

  const getCompanyData = async () => {
    if (id && !Array.isArray(id)) {
      const company = await getCompanyById(id);
      setCompanyData(company);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  return (
    <CustomLayout>
      <Header back title="Ficha de Productora" />
      <div className="pr-[2rem] pl-[2rem] w-[100%] mb-[2rem]">
        {companyData ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationRegisterApplication}
            onSubmit={(values) => handleEditCompany(values)}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form id="form" className="w-[100%]">
                <div className="mt-[1rem] pr-[2rem] pl-[2rem] w-[100%] flex justify-end items-center">
                  {fieldsDisabled ? (
                    <CustomButton
                      background="warn"
                      onClick={() => setFieldsDisabled(false)}
                    >
                      Editar
                    </CustomButton>
                  ) : (
                    <div className="flex gap-[1rem]">
                      <CustomButton type="submit">Guardar</CustomButton>
                      <CustomButton
                        background="delete"
                        onClick={() => setFieldsDisabled(true)}
                      >
                        Cancelar
                      </CustomButton>
                    </div>
                  )}
                </div>

                <div className="flex flex-col text-[#a6acaf]">
                  <label className="font-bold">TIPO PERSONA</label>
                  <p
                    className={
                      "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black"
                    }
                  >
                    {companyData.tipo_persona}
                  </p>
                </div>
                <EntityForm
                  disabled={fieldsDisabled}
                  handleFileChange={handleFileChange}
                  dirty={dirty}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  entity={companyData.tipo_persona}
                  handleAccept={handleAccept}
                />
              </Form>
            )}
          </Formik>
        ) : null}
      </div>
    </CustomLayout>
  );
};

export default ProducerView;

const EntityForm: FC<{
  disabled: boolean;
  entity: ProductionCompanyByIdResponse["tipo_persona"];
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAccept: () => void;
}> = ({ entity, handleFileChange, disabled, handleAccept }) => {
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
        handleAccept,
      })
    );
  };

  return (
    <div className="mt-[3rem] w-[100%]">
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
          disabled={disabled}
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
          disabled={disabled}
          width="w-[100%]"
          id="calle"
          name="calle"
          type="text"
          labelText="CALLE"
        />
        <CustomField
          disabled={disabled}
          width="w-[100%]"
          id="numero"
          name="numero"
          type="text"
          labelText="NÚMERO"
        />
      </div>

      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomField
          disabled={disabled}
          width="w-[100%]"
          id="datos_adicionales"
          name="datos_adicionales"
          type="text"
          labelText="DATOS ADICIONALES"
        />
        <CustomField
          disabled={disabled}
          width="w-[100%]"
          id="ciudad"
          name="ciudad"
          type="text"
          labelText="CUIDAD"
        />
      </div>
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomField
          disabled={disabled}
          width="w-[100%]"
          id="localidad"
          name="localidad"
          type="text"
          labelText="LOCALIDAD"
        />
        <CustomField
          disabled={disabled}
          width="w-[100%]"
          id="provincia"
          name="provincia"
          type="text"
          labelText="PROVINCIA"
        />
        <CustomField
          disabled={disabled}
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

      <div className="mt-[1.5rem]">
        <p className="font-bold text-black">
          {entity === "FISICA"
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

      {entity === "JURIDICA" && (
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
          {/* <CustomButton background="warn">Editar</CustomButton> */}
        </div>

        {/* <CustomButton onClick={handleRejectRegister}>Cancelar</CustomButton> */}
      </div>
    </div>
  );
};

{
  /*
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
*/
}

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
  values: CompanyValues
) => {
  e.preventDefault();
  ((values: CompanyValues) => {
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
