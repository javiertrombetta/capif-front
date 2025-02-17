import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import useModal from "@/hooks/useModal";
import { addTerritory } from "@/services/repertoire";

export const TerritorialityAddModal = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const { closeModal } = useModal();

  const initialValues = {
    codigo_iso: "",
    nombre_pais: "",
  };

  const handleOnAccept = async (values: typeof initialValues) => {
    try {
      await addTerritory({ ...values, is_habilitado: true });
      toast.success("Territorio agregado correctamente.");
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar territorio.");
    } finally {
      closeModal();
    }
  };

  return (
    <div className="relative bg-white h-[19rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>
      <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem]">
        <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
          Agregar Territorio
        </p>
        <Formik initialValues={initialValues} onSubmit={handleOnAccept}>
          <Form>
            <CustomField
              id="codigo_iso"
              name="codigo_iso"
              type="text"
              labelText="ISO del País"
            />
            <CustomField
              id="nombre_pais"
              name="nombre_pais"
              type="text"
              labelText="Nombre del País"
            />
            <CustomButton type="submit">Aceptar</CustomButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
