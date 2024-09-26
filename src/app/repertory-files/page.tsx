import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import React, { FC } from "react";
import { FaEdit } from "react-icons/fa";

export default function page() {
  const Table: FC = () => {
    return (
      <div className="w-[100%] pl-[1rem] pr-[1rem]">
        <div className="relative mt-[2rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ESTADO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ARCHIVO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  USUARIO CREACIÓN
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  TITULAR
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  FECHA CREACIÓN
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  CÓDIGO ENVIO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((_, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    ENVIADO Y PROCESADO POR VERICAST
                  </td>
                  <td className="px-6 py-4">LOTE</td>
                  <td className="px-6 py-4 text-mainblue">
                    user1234@gmail.com
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">06/08/2020</td>
                  <td className="px-6 py-4">20200806_0088</td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-[0.4rem] border-[#c8c8c8] border-[1px] pl-[1rem] pr-[1rem] pt-[0.2rem] pb-[0.2rem]">
                      <FaEdit size={16} /> Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <CustomLayout>
      <Header title="Repertorio Declarado (por álbum)" />
      <div className="mt-[2rem] w-[100%] flex justify-end items-center gap-[0.5rem]">
        <CustomButton>Declarar Nuevo Repertorio</CustomButton>
        <CustomButton>Generar Lote Envio</CustomButton>
        <CustomButton className="bg-[#f39c12]">
          Rechazar Sin Envío a Vericast
        </CustomButton>
      </div>

      <div className="mt-[2rem] w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="ESTADO"
        />

        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="PRODUCTOR"
        />
      </div>
      <div className="mt-[1.5rem] w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="FECHA CREACIÓN DESDE"
        />

        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="text"
          label="FECHA CREACIÓN HASTA"
        />
      </div>

      <div className="w-[100%] pl-[2rem] mt-[2rem]">
        <CustomInput label="Buscar" type="text" />
      </div>

      <Table />
    </CustomLayout>
  );
}
