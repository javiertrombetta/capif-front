"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";

function page() {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(
      setModal({ type: ModalNames.AUDIT_SESSIONS_PURGE, isActive: true })
    );
  };

  return (
    <CustomLayout>
      <Header title="Sesiones Iniciadas" />
      <div className="w-[100%] flex justify-end mt-[2rem] pr-[2rem]">
        <CustomButton onClick={openModal}>Depurar</CustomButton>
      </div>

      <div className="w-[100%] flex items-end justify-between pr-[2rem] pl-[2rem]">
        <div className="w-[100%] flex flex-col  justify-between">
          <div className="w-[100%] flex gap-[1rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="NOMBRE"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="APELLIDO"
            />
          </div>

          <div className="w-[100%] flex gap-[1rem] mt-[1rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="email"
              label="EMAIL"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="date"
              label="FECHA"
            />
          </div>

          <div className="w-[100%] mt-[1rem]">
            <CustomButton className="w-full h-[2.5rem] pt-[1.2rem] pb-[1.2rem] text-[1rem] font-bold gap-[0.3rem]">
              <FaSearch />
              Buscar
            </CustomButton>
          </div>
        </div>
      </div>

      <div className="w-[100%] mt-[2rem]">
        <CustomTable
          columnNames={[
            { name: "FECHA INICIO", isSortable: true },
            { name: "FECHA FIN", isSortable: true },
            { name: "USUARIO", isSortable: true },
            { name: "IP ORIGEN", isSortable: true },
            { name: "NAVEGADOR", isSortable: true },
            { name: "DETALLE", isSortable: true },
          ]}
          columnValues={[
            [
              "24/08/24",
              "25/08/24",
              "producer@gmail.com",
              "192.659.762",
              "Chrome",
              "-",
            ],
            [
              "24/08/24",
              "25/08/24",
              "producer@gmail.com",
              "192.659.762",
              "Chrome",
              "-",
            ],
            [
              "24/08/24",
              "25/08/24",
              "producer@gmail.com",
              "192.659.762",
              "Chrome",
              "-",
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
