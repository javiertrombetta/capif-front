import CustomButton from "@/commons/CustomButton/CustomButton";
import useModal from "@/hooks/useModal";
import { IoCloseSharp } from "react-icons/io5";
import {
  GetCashflowTransactionsResponse,
  TipoTransaccion,
} from "@/types/cashflow";

const mapTypeToKey: Partial<
  Record<
    TipoTransaccion,
    keyof GetCashflowTransactionsResponse["transactions"][0]
  >
> = {
  LIQUIDACION: "liquidacion",
  TRASPASO: "traspaso",
  PAGO: "pago",
  RECHAZO: "rechazo",
};

const CashflowTransactionsDetailsModal = ({
  type,
  transaction,
}: {
  type: TipoTransaccion;
  transaction: GetCashflowTransactionsResponse["transactions"][0];
}) => {
  const { closeModal } = useModal();
  const modalData = transaction[mapTypeToKey[type] || "liquidacion"];

  return (
    <div
      className={
        "relative bg-white mb-[4rem] py-[1rem] min-w-[25rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center"
      }
    >
      <button onClick={closeModal} className="absolute top-[5%] right-[5%]">
        <IoCloseSharp size={25} color="black" />
      </button>
      <div className="w-[100%] pr-[1rem] pl-[1rem] flex flex-col items-center gap-[2rem] justify-center">
        <p className="text-black font-bold text-[1.4rem]">
          Detalles de la transacción
        </p>

        <div className="flex flex-col space-y-[0.5rem]">
          {modalData &&
            typeof modalData === "object" &&
            Object.entries(modalData)
              .filter(([key, _]) => {
                return (
                  !/id_/.test(key) &&
                  !/_id/.test(key) &&
                  !["createdAt", "updatedAt"].includes(key)
                );
              })
              .map(([key, value]) => (
                <div key={key} className="flex justify-between space-x-[2rem]">
                  <p className="text-black font-bold">{key}</p>
                  <p className="text-black">{value}</p>
                </div>
              ))}
        </div>
        <CustomButton onClick={closeModal}>Cerrar</CustomButton>
      </div>
    </div>
  );
};

export default CashflowTransactionsDetailsModal;
