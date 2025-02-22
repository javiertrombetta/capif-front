"use client";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import CustomButton from "@/commons/CustomButton/CustomButton";
import useModal from "@/hooks/useModal";
import { removeUserFromProducer } from "@/services/users";

const RemoveUserModal = ({
  idUsuario,
  onSuccess,
}: {
  idUsuario: string;
  onSuccess: () => void;
}) => {
  const { closeModal } = useModal();

  const handleRemoveUser = async () => {
    try {
      await removeUserFromProducer(idUsuario);
      toast.success("Usuario desvinculado correctamente");
      await onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Error al desvincular el usuario");
    } finally {
      closeModal();
    }
  };

  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>

      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.3rem] text-center w-[90%]">
          ¿Estás seguro de que deseas desvincular al usuario de la productora?
        </p>

        <div className="flex gap-[3rem] w-[100%] justify-center">
          <CustomButton onClick={handleRemoveUser} background="delete">
            Desvincular
          </CustomButton>
          <CustomButton onClick={closeModal}>Cancelar</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default RemoveUserModal;
