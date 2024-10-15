import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import Header from "@/commons/Header/Header";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomInput from "@/commons/CustomInput/CustomInput";

export default function page() {
  return (
    <CustomLayout>
      <Header title="Declarar Nuevo Repertorio" />

      <div className="w-[100%] flex justify-end mt-[1rem]">
        <CustomButton>Volver a la lista</CustomButton>
      </div>

      <div className="ml-[2rem]">
        <div className="flex gap-[0.5rem] justify-center items-center w-fit">
          <FaQuestionCircle size={20} color="#dd4b39" />
          <p className="text-black font-bold">
            ¿Cómo declaro nuevo repertorio por álbum?
          </p>
        </div>

        <ul className="text-black mt-[0.5rem] ml-[2rem]">
          <li className="font-bold text-mainblue cursor-pointer hover:text-[#52abfa] w-fit">
            Ver Instructivo
          </li>
          <li className="font-bold text-mainblue cursor-pointer hover:text-[#52abfa] w-fit">
            Ver Modelo
          </li>
          <li className="font-bold text-mainblue cursor-pointer hover:text-[#52abfa] w-fit">
            Ver Tutorial
          </li>
        </ul>
      </div>

      {/*  */}

      <div className="w-[100%] pl-[2rem] pr-[2rem] flex flex-col gap-[2rem] mt-[2rem] mb-[3rem]">
        <CustomInput className="w-[20rem]" type="text" label="ESTADO" />
        <CustomInput className="w-[20rem]" type="text" label="TITULAR" />
        <CustomInput
          className="w-[20rem]"
          type="text"
          label="DIRECTORIO BMAT"
        />

        <div>
          <p className="font-bold text-black">
            ¿INFORMAR AL SISTEMA DE MONITOREO?
          </p>
          <p className="text-black text-[0.9rem]">
            En caso de consignar que “SI” CAPIF enviará los datos de los temas
            indicados y los audios al proveedor del sistema de monitoreo.
          </p>

          <p className="text-black text-[0.9rem]">
            Si ese paso ya estuviera realizado y solo desea declarar repertorio
            en CAPIF debe consignar “NO” y deberá cargar solamente los datos de
            los temas indicados en el archivo.
          </p>

          <select className="mt-[0.5rem] w-[20rem] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
            <option>SI</option>
            <option>NO</option>
          </select>
        </div>

        <div>
          <p className="text-black font-bold">
            Cargue aquí el archivo en formato .zip
          </p>
          <input type="file" />
        </div>

        <p className="text-black font-bold">
          Conforme los datos consignados en el formulario, declaro bajo
          juramento que poseo derechos suficientes sobre el repertorio declarado
          para proceder al cobro de los derechos de comunicación al público en
          el territorio de la República Argentina en los períodos informados
          conforme lo establecido en las normas internas y reglamento de CAPIF.
          Asimismo, me comprometo a notificar a CAPIF de cualquier cambio
          respecto de dicha condición en un plazo máximo de diez (10) días desde
          ocurrido el cambio o modificación. Presto conformidad para que CAPIF
          efectúe notificaciones por medios electrónicos a la casilla de correo
          denunciada como domicilio electrónico, manifestando que será válida
          toda notificación e información de toda índole allí enviada. La
          información ingresada en el formulario/archivo reviste el carácter de
          declaración jurada debiendo ser fiable y fiel expresión de la
          realidad. Toda información personal (por ej. nombre, apellido, DNI,
          dirección, teléfono, casilla de correo, cuenta bancaria, etc) es
          privada y confidencial y se utiliza sólo a los fines, objeto y
          actividad de CAPIF. Por su parte, CAPIF garantiza el cumplimiento con
          los términos de la Ley 25.326 de Protección de Datos Personales,
          asegurando el acceso, actualización, supresión o rectificación de los
          datos por su titular.
        </p>

        <div className="flex gap-[0.5rem]">
          <input type="checkbox" className="w-[1rem] " />
          <p className="text-black font-bold">
            He leído y acepto los términos legales
          </p>
        </div>

        <CustomButton>Grabar</CustomButton>
      </div>
    </CustomLayout>
  );
}
