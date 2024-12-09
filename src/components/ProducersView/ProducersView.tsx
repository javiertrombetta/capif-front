"use client";
import React, { FC } from "react";
import Link from "next/link";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import "./ProducersView.css";
import { FaEdit } from "react-icons/fa";
import CustomTable from "@/commons/CustomTable/CustomTable";

const ProducersView: FC = () => {
  return (
    <CustomLayout>
      <Header back title="Productores" />
      <div className="w-[100%] flex justify-between items-center pl-[2rem] pr-[2rem] mt-[2rem]">
        <div>
          <p className="font-bold text-black">VERIFICADO</p>
          <select className="w-[20rem] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-black">
            <option>TODOS</option>
            <option>SI</option>
            <option>NO</option>
          </select>
        </div>
        <div className="flex gap-[1rem]">
          <Link href={"/admin/new-company-file"}>
            <CustomButton>Nueva Compañía Archivo</CustomButton>
          </Link>
          <Link href={"/admin/new-company"}>
            <CustomButton>Nueva Compañía</CustomButton>
          </Link>
        </div>
      </div>
      <div className="mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "NOMBRE", isSortable: true },
            { name: "CUIT", isSortable: true },
            { name: "VISUALIZACIÓN REPERTORIO", isSortable: true },
            { name: "TITULAR DE DERECHOS", isSortable: true },
            { name: "AGENTE COBROS", isSortable: true },
            { name: "ID REPERTORIO", isSortable: true },
            { name: "VERIFICADO", isSortable: true },
            { name: "ACCIÓN", isSortable: false },
          ]}
          columnValues={[
            [
              "Ak Records",
              "123123",
              "NO",
              "-",
              "-",
              "123456",
              "NO",
              <button className="flex items-center gap-[0.4rem] border-[#c8c8c8] border-[1px] pl-[1rem] pr-[1rem] pt-[0.2rem] pb-[0.2rem]">
                <FaEdit size={16} /> Editar
              </button>,
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
};

export default ProducersView;
