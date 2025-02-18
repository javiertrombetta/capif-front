import { IoCloseSharp } from "react-icons/io5";
import CustomButton from "@/commons/CustomButton/CustomButton";
import useModal from "@/hooks/useModal";
import { updateTerritoryStatus } from "@/services/repertoire";
import { toast } from "react-toastify";

const TerritorialityUnableModal = ({
  idTerritory,
  state,
  onSuccess,
}: {
  idTerritory: string;
  state: boolean;
  onSuccess: () => void;
}) => {
  const { closeModal } = useModal();

  const handleOnAccept = async () => {
    try {
      await updateTerritoryStatus(idTerritory, { is_habilitado: state });
      onSuccess();
      toast.success(
        `Territorio ${state ? "habilitado" : "deshabilitado"} correctamente`
      );
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el territorio");
    } finally {
      closeModal();
    }
  };

  return (
    <div
      className={
        "relative bg-white h-[16rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.3rem] text-center w-[90%]">
          ¿Estás seguro de que deseas {state ? "habilitar" : "deshabilitar"}{" "}
          este territorio?
        </p>

        <div className="flex gap-[3rem] w-[100%] justify-center">
          <CustomButton onClick={handleOnAccept}>Aceptar</CustomButton>
          <CustomButton background="delete" onClick={closeModal}>
            Cancelar
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TerritorialityUnableModal;
