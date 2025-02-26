import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import useModal from "@/hooks/useModal";
import {
  downloadTerritoriesReport,
  DownloadTerritoriesReportParams,
} from "@/services/repertoire";
import CustomSearchField from "@/commons/CustomSearchField/CustomSearchField";
import { formatDate } from "@/utils/formatDate";

const TIPOS_MODIFICACION: Array<
  DownloadTerritoriesReportParams["tipo_modificacion"]
> = ["ALTA", "ARCHIVO", "DATOS", "PARTICIPACION", "TERRITORIO"];

export const TerritorialityReportsModal = () => {
  const { closeModal } = useModal();

  const initialValues: DownloadTerritoriesReportParams = {
    fecha_desde: "",
    fecha_hasta: "",
    isrc: "",
    productora: "",
    titulo: "",
    tipo_modificacion: undefined,
  };

  const handleOnAccept = async (values: typeof initialValues) => {
    try {
      const data = await downloadTerritoriesReport(values);
      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast.error((error as Error).message || "Error al descargar archivo.");
    } finally {
      closeModal();
    }
  };

  return (
    <div className="relative bg-white py-[1rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>
      <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem]">
        <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
          Descargar Reporte
        </p>
        <Formik initialValues={initialValues} onSubmit={handleOnAccept}>
          <Form className="w-[100%] flex flex-col items-center space-y-[1rem] mt-[1rem] pl-[1rem] pr-[2rem]">
            <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
              <CustomSearchField
                name="titulo"
                id="titulo"
                type="text"
                labelText="TITULO"
              />
              <CustomSearchField
                name="isrc"
                id="isrc"
                type="text"
                labelText="ISRC"
              />
              <CustomSearchField
                name="productora"
                id="productora"
                type="text"
                labelText="PRODUCTORA"
              />
            </div>
            <div className="w-[100%] flex justify-start items-end pl-[2rem] pr-[2rem] gap-[2rem]">
              <CustomSearchField
                id="estado"
                name="estado"
                labelText="ESTADO"
                type="select"
                options={[
                  { name: "", value: "" },
                  ...TIPOS_MODIFICACION.map((t) => ({
                    name: t ?? "",
                    value: t ?? "",
                  })),
                ]}
              />
              <CustomSearchField
                id="fecha_desde"
                name="fecha_desde"
                labelText="FECHA CREACIÓN DESDE"
                type="date"
              />
              <CustomSearchField
                id="fecha_hasta"
                name="fecha_hasta"
                labelText="FECHA CREACIÓN HASTA"
                type="date"
              />
            </div>
            <CustomButton type="submit">Aceptar</CustomButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
