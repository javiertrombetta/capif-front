"use client";
import React, { useRef, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomTable from "@/commons/CustomTable/CustomTable";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomButton from "@/commons/CustomButton/CustomButton";

export default function page() {
  const [percentage, setPercentage] = useState<string>("33");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const handleChangePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const regex = /^(100|[0-9]{1,2})$/;

    if (regex.test(inputValue) || inputValue === "") {
      setPercentage(inputValue);
    }
  };

  return (
    <CustomLayout>
      <Header back title="Agregar Titular" />
      <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem] mt-[1rem]">
        <div className="w-[100%] flex justify-between pl-[2rem] pr-[2rem] items-end">
          <p className="font-bold text-[1.2rem] text-black w-[100%] text-start">
            TITULARES:
          </p>
          <div className="flex gap-[1rem]">
            <CustomButton>Aceptar</CustomButton>
            <CustomButton background="warn">Cancelar</CustomButton>
          </div>
        </div>
        <CustomTable
          columnNames={[
            { name: "PRODUCTORA", isSortable: true },
            { name: "PORCENTAJE", isSortable: true },
            { name: "REGISTRO DESDE", isSortable: true },
            { name: "REGISTRO HASTA", isSortable: true },
          ]}
          columnValues={[
            ["Warner", "33%", "12/10/2020", "16/07/2030"],
            ["Sony Music", "33%", "12/10/2020", "16/07/2030"],
            ["Columbia Records", "33%", "12/10/2020", "16/07/2030"],
          ]}
        />
      </div>
      <div className="w-[100%] mt-[2rem] flex flex-col justify-center items-center gap-[1rem] relative pr-[2rem] pl-[2rem]">
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="date"
          label="DESDE"
        />
        <CustomInput
          containerClassName="w-[100%]"
          className="w-[100%]"
          type="date"
          label="HASTA"
        />
        <div className={"w-[100%] container flex flex-col"}>
          <label style={{ color: "black" }} className="font-bold">
            Porcentaje
          </label>
          <div
            onClick={handleDivClick}
            className={
              "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] text-[black] relative overflow-hidden"
            }
          >
            <input
              ref={inputRef}
              type="text"
              value={percentage}
              onChange={handleChangePercentage}
              maxLength={3}
              placeholder="0"
              className="w-[14.9%] h-[100%] pl-1 rounded text-black ring-0 outline-0 focus-ring-0"
            />
            <span className="absolute left-[3.2%] top-[50%] transform -translate-y-1/2 text-gray-500 ">
              %
            </span>
          </div>
          <div className="w-[100%] flex justify-center items-center h-[1rem]">
            {Number(percentage) > 33 && (
              <p className="text-[#e74c3c] text-[0.9rem] w-[100%] mt-[0.5rem] text-center top-[100%]">
                Estás excediendo el porcentaje disponible del fonograma.
              </p>
            )}
          </div>
        </div>
      </div>
    </CustomLayout>
  );
}
