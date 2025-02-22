import { Form, Formik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import useModal from "@/hooks/useModal";
import { toast } from "react-toastify";
import { createNominations } from "@/services/producers";

const initialValues = {
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
};

const GardelAwardsModal = ({ onSuccess }: { onSuccess: () => void }) => {
  const { closeModal } = useModal();

  const handleOnSubmit = async (values: typeof initialValues) => {
    try {
      const { total } = await createNominations({
        startDate: new Date(Date.parse(values.startDate)).toISOString(),
        endDate: new Date(Date.parse(values.endDate)).toISOString(),
      });
      toast.success(`Se crearon ${total} nominaciones`);
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Error al generar los códigos");
    } finally {
      closeModal();
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

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[1.5rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">
          Generar Códigos Premios Gardel
        </p>
        <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
          <Form>
            <CustomField
              id="startDate"
              name="startDate"
              type="date"
              labelText="FECHA DESDE"
            />
            <CustomField
              id="endDate"
              name="endDate"
              type="date"
              labelText="FECHA HASTA"
            />
            <CustomButton type="submit">Generar Códigos</CustomButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default GardelAwardsModal;
