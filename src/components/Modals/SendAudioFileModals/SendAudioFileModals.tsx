import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomField from "@/commons/CustomField/CustomField";
import useModal from "@/hooks/useModal";
import { sendAudioFiles, updateSendAudioFile } from "@/services/repertoire";

const SendAudioFile = ({ ids }: { ids: string[] }) => {
  const { closeModal } = useModal();

  const handleOnAccept = async () => {
    try {
      await sendAudioFiles(ids);
      toast.success("Archivos enviados correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar archivos.");
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
          ¿Estás seguro de que deseas enviar el/los archivo(s)?
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

interface RejectAudioProps {
  idRepertoire: string;
  idSend: string;
  onSuccess: () => void;
}

const RejectAudio = ({ idRepertoire, idSend, onSuccess }: RejectAudioProps) => {
  const { closeModal } = useModal();

  const handleOnAccept = async (values: { comment: string }) => {
    try {
      await updateSendAudioFile(idRepertoire, idSend, {
        nuevoEstado: "RECHAZADO POR VERICAST",
        comentario: values.comment,
      });
      onSuccess();
      toast.success("Archivo actualizado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar archivo.");
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
          ¿Estás seguro de que deseas marcar como "rechazado" el/los archivo(s)?
        </p>
        <Formik initialValues={{ comment: "" }} onSubmit={handleOnAccept}>
          <Form>
            <CustomField
              id="comment"
              name="comment"
              labelText="Comentario"
              type="text"
            />

            <div className="flex gap-[3rem] w-[100%] justify-center">
              <CustomButton type="submit">Aceptar</CustomButton>
              <CustomButton
                type="button"
                background="delete"
                onClick={closeModal}
              >
                Cancelar
              </CustomButton>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

interface SetSendAudioErrorProps {
  idRepertoire: string;
  idSend: string;
  onSuccess: () => void;
}

const SetSendAudioError = ({
  idRepertoire,
  idSend,
  onSuccess,
}: SetSendAudioErrorProps) => {
  const { closeModal } = useModal();

  const handleOnAccept = async () => {
    try {
      await updateSendAudioFile(idRepertoire, idSend, {
        nuevoEstado: "ERROR EN EL ENVIO",
      });
      onSuccess();
      toast.success("Archivo enviado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar archivo.");
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
          ¿Estás seguro de que deseas marcar como "Error en el Envio" el/los
          archivo(s)?
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

export { SendAudioFile, RejectAudio, SetSendAudioError };
