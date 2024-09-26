"use client";
import React, { FC, ReactNode, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { IoMdDownload } from "react-icons/io";
import { PiUserCircleFill } from "react-icons/pi";
import "./UserProfileView.css";

type Tabs = "register" | "consult" | "updates";

interface ViewTabs {
  name: Tabs;
  title: string;
}

const UserProfileView: FC = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>("register");

  const viewTabs: ViewTabs[] = [
    {
      name: "register",
      title: "Datos Registro",
    },
    {
      name: "consult",
      title: "Consultas",
    },
    {
      name: "updates",
      title: "Actualizaciones",
    },
  ];

  const chooseTab = (tab: Tabs): void => {
    setCurrentTab(tab);
  };

  const renderTab = (): ReactNode => {
    if (currentTab === "register") {
      return <RegisterTab />;
    }
    if (currentTab === "consult") {
      return <ConsultTab />;
    }
    if (currentTab === "updates") {
      return <UpdatesTab />;
    }
  };

  return (
    <CustomLayout>
      <Header hr={false} title="Ficha de Usuario" className="" />

      <div className="mt-[1rem] ml-[1rem]">
        <div className="flex">
          {viewTabs.map((tab: ViewTabs, index: number) => (
            <button
              key={index}
              onClick={() => chooseTab(tab.name)}
              className={`w-[9rem] h-[2.5rem] ${currentTab === tab.name ? "border-t-[3.5px] border-t-mainblue" : "border-t-[3.5px] border-t-inherit"} flex justify-center items-center`}
            >
              <p className="text-black hover:text-[#7b7b7b]">{tab.title}</p>
            </button>
          ))}
        </div>
      </div>
      {renderTab()}
    </CustomLayout>
  );
};

const RegisterTab: FC = () => {
  const [currentEntity, setCurrentEntity] = useState<"natural" | "legal">(
    "natural"
  );

  const handleCurrentEntity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEntity(e.target.name as "natural" | "legal");
  };

  return (
    <div className="text-black mt-[1rem] ml-[2rem] mr-[2rem] mb-[3rem]">
      <p className="font-bold">
        Completar los siguientes datos y adjuntar una imagen o archivo PDF de su
        documento nacional de identidad.
      </p>

      <p>
        Cualquier duda o consulta puede realizarlas en la solapa consultas y le
        serán respondidas a la brevedad.
      </p>

      <div className="flex gap-[2rem] mt-[2rem]">
        <div className="flex gap-[0.5rem]">
          <input
            onChange={handleCurrentEntity}
            name="natural"
            checked={currentEntity === "natural"}
            type="radio"
          />
          <h1 className="font-bold">PERSONA FÍSICA</h1>
        </div>

        <div className="flex gap-[0.5rem]">
          <input
            onChange={handleCurrentEntity}
            name="legal"
            checked={currentEntity === "legal"}
            type="radio"
          />
          <h1 className="font-bold">PERSONA JURÍDICA</h1>
        </div>
      </div>

      <EntityForm entity={currentEntity} />
    </div>
  );
};

const ConsultTab: FC = () => {
  return (
    <div className="w-[100%]">
      <CustomButton className="mt-[2rem] ml-[2rem] mr-[2rem]">
        Marcar Notificaciones Como Leídas
      </CustomButton>
      <div className="max-w-[96%] flex mt-[2rem] ml-[2rem] w-[100%] mr-[2rem] gap-[0.5rem]">
        <PiUserCircleFill color="black" size={40} />
        <CustomInput
          className="grow"
          placeholder="Ingresar comentario adicional"
          type="text"
        />
        <CustomButton>Enviar</CustomButton>
      </div>
    </div>
  );
};

const UpdatesTab: FC = () => {
  return (
    <div className="w-[100%] mt-[2rem] flex flex-col justify-center items-center gap-[2rem]">
      {[1, 2, 3, 4, 5].map((_, index: number) => (
        <div key={index} className="w-[90%] flex items-center justify-between">
          <div className="flex">
            <PiUserCircleFill color="black" size={40} />
            <div className="ml-[1rem]">
              <p className="text-black">admin123@gmail.com</p>
              <p className="text-black">Registro Iniciado</p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-center">
            <p className="text-black text-[0.8rem]">19/09/2024 13:45:28 p.m.</p>
            <div className="scale-[0.8] mt-[0.5rem] bg-[#337ab7] font-bold w-fit p-[0.3rem] rounded-[0.2rem]">
              Automatico
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EntityForm: FC<{ entity: "natural" | "legal" }> = ({ entity }) => {
  return (
    <div className="mt-[3rem] w-[100%]">
      <div className="flex w-[100%] gap-[2rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="ESTADO"
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="CUIT/CUIL"
        />
      </div>

      {entity === "legal" && (
        <CustomInput
          containerClassName="w-[100%] mt-[1.5rem]"
          className="w-[100%]"
          type="text"
          label="RAZON SOCIAL"
        />
      )}

      {entity === "natural" ? (
        <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
          <CustomInput
            containerClassName="w-[50%]"
            className="w-[100%]"
            type="text"
            label="NOMBRES"
          />
          <CustomInput
            containerClassName="w-[50%]"
            className="w-[100%]"
            type="text"
            label="APELLIDOS"
          />
        </div>
      ) : (
        <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
          <CustomInput
            containerClassName="w-[50%]"
            className="w-[100%]"
            type="text"
            label="APELLIDOS REPRESENTANTE LEGAL"
          />
          <CustomInput
            containerClassName="w-[50%]"
            className="w-[100%]"
            type="text"
            label="NOMBRES REPRESENTANTE LEGAL"
          />
        </div>
      )}
      {entity === "natural" ? (
        <CustomInput
          containerClassName="w-[100%] mt-[1.5rem]"
          className="w-[100%]"
          type="email"
          label="EMAIL"
        />
      ) : (
        <CustomInput
          containerClassName="w-[100%] mt-[1.5rem]"
          className="w-[100%]"
          type="text"
          label="CUIT REPRESENTANTE LEGAL"
        />
      )}

      <CustomInput
        containerClassName="w-[100%] mt-[1.5rem]"
        className="w-[100%]"
        type="text"
        label="DENOMINACIÓN DEL SELLO Y SUBSELLOS (opcional)"
      />
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="CALLE"
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="number"
          label="NÚMERO"
        />
      </div>

      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="DATOS ADICIONALES"
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="text"
          label="CUIDAD"
        />
      </div>
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="text"
          label="LOCALIDAD"
        />
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="text"
          label="PROVINCIA"
        />
        <CustomInput
          containerClassName="w-full"
          className="w-[100%]"
          type="number"
          label="CÓDIGO POSTAL"
        />
      </div>
      <CustomInput
        containerClassName="w-[100%] mt-[1.5rem]"
        className="w-[100%]"
        type="number"
        label="TELÉFONO"
      />
      <CustomInput
        containerClassName="w-[100%] mt-[1.5rem]"
        className="w-[100%]"
        type="text"
        label="NACIONALIDAD"
      />
      <div className="flex w-[100%] gap-[2rem] mt-[1.5rem]">
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="number"
          label="CBU (opcional)"
        />
        <CustomInput
          containerClassName="w-[50%]"
          className="w-[100%]"
          type="number"
          label="ALIAS (opcional)"
        />
      </div>

      <div className="mt-[1.5rem]">
        <p className="font-bold">
          {entity === "natural"
            ? "CARGAR DOCUMENTO NACIONAL DE IDENTIDAD"
            : "CARGAR ESTATUTO O CONTRATO SOCIAL"}
        </p>
        <input className="mt-[0.3rem]" type="file" />
      </div>

      <div className="w-[100%] flex justify-end">
        <CustomButton className="gap-[0.4rem]">
          <IoMdDownload />
          Descargar Archivo Ingresado
        </CustomButton>
      </div>

      {entity === "legal" && (
        <div className="mt-[1.5rem]">
          <p className="font-bold">
            CARGAR DOCUMENTO NACIONAL DE IDENTIDAD DEL REPRESENTANTE LEGAL
          </p>
          <input className="mt-[0.3rem]" type="file" />
        </div>
      )}

      <div className="aditional-data-text mt-[4rem]">
        <p>
          OTROS Documento Adicionales (Cargue aquí su comprobante de pago de
          alta de ISRC)
        </p>
        <p>
          Para obtener el código de productor, el titular deberá abonar la suma
          de $ 10.000. El pago se realiza por el alta a la siguiente cuenta
          bancaria:
        </p>
        <p>BANCO GALICIA</p>
        <p>SUCURSAL 5</p>
        <p>CUIT: 30-52172973-9</p>
        <p>N°: 9750252-4 005-6</p>
        <p>CBU: 0070005430009750252469</p>
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

      <div className="mt-[5rem] flex gap-[1rem]">
        <CustomButton>Actualizar</CustomButton>

        <CustomButton className="bg-[#008d4c]">
          Confirmar el Registro del Usuario
        </CustomButton>
      </div>
    </div>
  );
};

export default UserProfileView;
