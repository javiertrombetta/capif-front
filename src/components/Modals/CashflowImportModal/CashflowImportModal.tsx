import React, { useState } from "react";
import { toast } from "react-toastify";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomFileInput from "@/commons/CustomFileInput/CustomFileInput";
import useModal from "@/hooks/useModal";
import {
  uploadPaymentsFile,
  uploadRejectionsFile,
  uploadReproductionsFile,
  uploadSettlementsFile,
  uploadTransfersFile,
} from "@/services/cashflow";
import { IoCloseSharp } from "react-icons/io5";

const cashflowModals = {
  ["TRANSFERS"]: {
    title: "Traspasos",
    submit: uploadTransfersFile,
  },
  ["SETTLEMENTS"]: {
    title: "Liquidaciones",
    submit: uploadSettlementsFile,
  },
  ["REPRODUCTIONS"]: {
    title: "Pasadas",
    submit: uploadReproductionsFile,
  },
  ["REJECTIONS"]: {
    title: "Rechazos",
    submit: uploadRejectionsFile,
  },
  ["PAYMENTS"]: {
    title: "Pagos",
    submit: uploadPaymentsFile,
  },
};

const CashflowImportModal = ({
  type,
}: {
  type: keyof typeof cashflowModals;
}) => {
  const { closeModal } = useModal();
  const [file, setFile] = useState<File | null>();
  const modalData = cashflowModals[type];

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Por favor, seleccione un archivo");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      await modalData.submit(formData);
      toast.success("Traspasos importados con éxito");
    } catch (error) {
      console.error("Error al importar traspasos:", error);
      toast.error("Error al importar traspasos");
    } finally {
      closeModal();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={
        "relative bg-white h-[20rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>
      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">
          Importar {modalData.title}
        </p>
        <div className="flex flex-col space-y-[0.5rem]">
          <CustomFileInput onChange={handleFileChange}>
            Seleccione Archivo
          </CustomFileInput>
          {file && <p className="text-black">{file.name}</p>}
        </div>
        <CustomButton onClick={handleSubmit}>Aceptar</CustomButton>
      </div>
    </div>
  );
};

export default CashflowImportModal;
