import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomFileInput from "@/commons/CustomFileInput/CustomFileInput";
import {
  uploadProducerDocument,
  getProducerDocuments,
  downloadProducerDocuments,
} from "@/services/producers";
import { TipoDocumento, GetDocumentsResponse } from "@/types/producers.types";
import { useState, useEffect, ReactNode, FC } from "react";
import { IoMdDownload } from "react-icons/io";
import { toast } from "react-toastify";

export const Documents = ({
  entity,
  idProductora,
}: {
  entity: string;
  idProductora: string;
}) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<
    {
      tipoDocumento: TipoDocumento;
      documento: File;
      idDocumento?: string;
    }[]
  >([]);
  const [documents, setDocuments] = useState<
    GetDocumentsResponse["documentos"]
  >([]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipoDocumento: TipoDocumento
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedDocuments([
        ...uploadedDocuments.filter((d) => d.tipoDocumento !== tipoDocumento),
        {
          tipoDocumento,
          documento: e.target.files[0],
          idDocumento: documents.filter(
            (d) => d.tipo_documento === tipoDocumento
          )[0]?.id_documento,
        },
      ]);

      setDocuments(documents.filter((d) => d.tipo_documento !== tipoDocumento));
    }
  };

  const handleUpdateDocument = async (tipoDocumento: TipoDocumento) => {
    const document = uploadedDocuments.filter(
      (d) => d.tipoDocumento === tipoDocumento
    )[0];

    try {
      const formData = new FormData();
      formData.append("tipoDocumento", document.tipoDocumento);
      formData.append("documentos", document.documento);
      await uploadProducerDocument(formData, idProductora);
      toast.success("Archivo enviado correctamente.");
      await getDocuments();
      setUploadedDocuments([
        ...uploadedDocuments.filter((d) => d.tipoDocumento !== tipoDocumento),
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar archivo.");
    }
  };

  const handleDownloadDocuments = async () => {
    try {
      const data = await downloadProducerDocuments(idProductora);
      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "documents.zip");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
      toast.error("Error al descargar archivos.");
    }
  };

  const getDocuments = async () => {
    const documents = await getProducerDocuments(idProductora);
    setDocuments(documents);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="mt-[1.5rem]">
      {entity === "FISICA" ? (
        <DocumentInput
          handleUpdateDocument={handleUpdateDocument}
          handleFileChange={handleFileChange}
          documents={documents}
          uploadedDocuments={uploadedDocuments}
          documentType="dni_persona_fisica"
        >
          <p className="font-black">CARGAR DOCUMENTO NACIONAL DE IDENTIDAD</p>
        </DocumentInput>
      ) : (
        <div className="flex flex-col space-y-[1rem]">
          <DocumentInput
            handleFileChange={handleFileChange}
            handleUpdateDocument={handleUpdateDocument}
            documents={documents}
            uploadedDocuments={uploadedDocuments}
            documentType="contrato_social"
          >
            <p className="font-bold text-black">
              CARGAR ESTATUTO O CONTRATO SOCIAL
            </p>
          </DocumentInput>
          <DocumentInput
            handleFileChange={handleFileChange}
            handleUpdateDocument={handleUpdateDocument}
            documents={documents}
            uploadedDocuments={uploadedDocuments}
            documentType="dni_representante_legal"
          >
            <p className="font-bold text-black">
              CARGAR DOCUMENTO NACIONAL DE IDENTIDAD DEL REPRESENTANTE LEGAL
            </p>
          </DocumentInput>
        </div>
      )}
      <DocumentInput
        handleFileChange={handleFileChange}
        handleUpdateDocument={handleUpdateDocument}
        documents={documents}
        uploadedDocuments={uploadedDocuments}
        documentType="comprobante_ISRC"
      >
        <div>
          <p className="font-bold text-black mt-[2rem]">
            OTROS Documento Adicionales (Cargue aquí su comprobante de pago de
            alta de ISRC)
          </p>
          <p className="font-bold text-black">
            Para obtener el código de productor, el titular deberá abonar la
            suma de $ 10.000. El pago se realiza por el alta a la siguiente
            cuenta bancaria:
          </p>
          <p className="font-bold text-black">BANCO GALICIA</p>
          <p className="font-bold text-black">SUCURSAL 5</p>
          <p className="font-bold text-black">CUIT: 30-52172973-9</p>
          <p className="font-bold text-black">N°: 9750252-4 005-6</p>
          <p className="font-bold text-black">CBU: 0070005430009750252469</p>
        </div>
      </DocumentInput>
      <div className="w-[100%] flex justify-end">
        <CustomButton
          onClick={handleDownloadDocuments}
          className="gap-[0.4rem]"
        >
          <IoMdDownload />
          Descargar Archivos
        </CustomButton>
      </div>
    </div>
  );
};

interface DocumentInputProps {
  handleUpdateDocument: (tipoDocumento: TipoDocumento) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    tipoDocumento: TipoDocumento
  ) => void;
  documents: GetDocumentsResponse["documentos"];
  uploadedDocuments: {
    tipoDocumento: TipoDocumento;
    documento: File;
    idDocumento?: string;
  }[];
  documentType: TipoDocumento;
  children: ReactNode;
}

const DocumentInput: FC<DocumentInputProps> = ({
  handleUpdateDocument,
  handleFileChange,
  documents,
  uploadedDocuments,
  documentType,
  children,
}) => {
  return (
    <div className="text-black flex flex-col space-y-[1rem]">
      {children}
      <CustomFileInput onChange={(e) => handleFileChange(e, documentType)}>
        <p>Seleccione un Archivo</p>
      </CustomFileInput>
      {documents
        ?.filter((d) => d.tipo_documento === documentType)
        .map((d) => (
          <p key={d.id_documento}>
            {d.ruta_archivo_documento.split("/").at(-1)}
          </p>
        ))}
      {uploadedDocuments
        .filter((u) => u.tipoDocumento === documentType)
        .map((d) => (
          <div
            key={d.tipoDocumento}
            className="flex flex-row w-[100%] items-center"
          >
            <p className="pr-[1rem]">{d.documento.name}</p>
            <CustomButton onClick={() => handleUpdateDocument(documentType)}>
              Enviar
            </CustomButton>
          </div>
        ))}
    </div>
  );
};
