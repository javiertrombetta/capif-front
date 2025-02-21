"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomFileInput from "@/commons/CustomFileInput/CustomFileInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { declareRepertoiresBulk } from "@/services/repertoire";

export default function Page() {
  const [tableData, setTableData] = useState<{
    columnNames: string[];
    rows: string[][];
  }>({
    columnNames: [],
    rows: [],
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      parseCSV(uploadedFile);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        const [header, ...rows] = result.data as string[][];
        setTableData({
          columnNames: header,
          rows: rows.filter((row) => row.length === header.length),
        });
      },
      skipEmptyLines: true,
    });
  };

  const handleUploadFile = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("repertoiresFile", file);
        const response = await declareRepertoiresBulk(formData);
        toast.success(response.message);
      }
    } catch (error: unknown) {
      toast.error(error as string);
    }
  };

  return (
    <CustomLayout>
      <Header title="Declaración Masiva" />
      <div className="w-[100%] mt-[1rem] flex justify-center items-center flex-col">
        <h2 className="text-black font-bold text-[1.3rem]">
          {tableData.columnNames.length > 0
            ? "Seleccionar Otro Archivo CSV:"
            : "Cargar Archivo CSV:"}
        </h2>
        <CustomFileInput
          className="mt-[1rem]"
          acceptedFormats=".csv"
          onChange={handleFileUpload}
        >
          Seleccionar Archivo
        </CustomFileInput>
      </div>
      {tableData.columnNames.length > 0 && (
        <div className="mb-[2rem] w-[100%] mt-[2rem] flex justify-center items-center flex-col">
          <CustomTable
            columnNames={tableData.columnNames.map((name) => ({
              name,
              isSortable: true,
            }))}
            columnValues={tableData.rows}
          />
          <CustomButton onClick={handleUploadFile} className="mt-[2rem]">
            Subir Archivo
          </CustomButton>
        </div>
      )}
    </CustomLayout>
  );
}
