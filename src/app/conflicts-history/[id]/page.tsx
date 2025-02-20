"use client";
import { useParams, useRouter } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import { confirmPercentage, getConflict } from "@/services/conflicts";
import { GetConflictResponse } from "@/types/conflicts.types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useModal from "@/hooks/useModal";
import { ConfirmPercentage } from "@/components/Modals/Conflicts/ConflictsActions";
function page() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { openModal, closeModal } = useModal();
  const [conflict, setConflict] = useState<GetConflictResponse | null>(null);

  const handleGetConflict = async () => {
    try {
      const id = params.id;
      if (id && !Array.isArray(id)) {
        const response = await getConflict(id);
        setConflict(response.data);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleOpenModal = (type: ModalNames) => {
    dispatch(setModal({ type, isActive: true }));
  };

  const handleConfirmPercentage = async (
    id: string,
    confirmedPercentage: number
  ) => {
    try {
      const response = await confirmPercentage(id, confirmedPercentage);
      toast.success(response.message);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleMenuOptions = (
    _id: string,
    participationId: string,
    confirmedPercentage: number,
    idPhonogram: string
  ) => {
    return [
      {
        label: "Modificar",
        onClick: () =>
          router.push(
            `/repertoires/${idPhonogram}/titularity/${participationId}`
          ),
      },
      {
        label: "Fijar Porcentaje",
        onClick: () =>
          openModal(
            <ConfirmPercentage
              handleConfirmPercentage={() =>
                handleConfirmPercentage(participationId, confirmedPercentage)
              }
              onCloseModal={closeModal}
            />
          ),
      },
      {
        label: "Aceptar",
        onClick: () => handleOpenModal(ModalNames.CONFLICTS_ACCEPT),
      },
    ];
  };

  useEffect(() => {
    handleGetConflict();
  }, []);

  return (
    <CustomLayout>
      <Header back title="Titulares de Conflicto" />

      <div className="w-[100%] flex items-center pr-[2rem] pl-[2rem] mt-[2rem] gap-[1rem]">
        <CustomInput type="text" label="Buscar Productora" />

        <select className="w-[13rem] mt-[1.5rem] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem]">
          <option>PENDIENTE </option>
          <option>RESPONDIDO</option>
          <option>DESISTIDO</option>
          <option>MODIFICADO </option>
          <option>RETIRADO</option>
          <option>ACEPTADO</option>
        </select>
      </div>
      {conflict && conflict.partesDelConflicto.length > 0 ? (
        <div className="mt-[2rem] w-[100%]">
          <CustomTable
            columnNames={[
              {
                name: "PRODUCTORA",
                isSortable: true,
              },
              { name: "ISRC", isSortable: true },
              { name: "PORCENTAJE DECLARADO", isSortable: true },
              { name: "DOCUMENTACIÓN ENVIADA", isSortable: true },
              { name: "PORCENTAJE DEFINITIVO", isSortable: true },
              { name: "ESTADO", isSortable: true },
              { name: "ACCIÓN", isSortable: false },
            ]}
            // columnValues={Array(4).fill([
            //   "Sony Music",
            //   "AR6548646",
            //   "50%",
            //   "NO",
            //   "50%",
            //   "PENDIENTE DE RESPUESTA",
            //   <ActionDropdownButton menuOptions={menuOptions("1")} />,
            // ])}
            columnValues={conflict.partesDelConflicto.map((p) => [
              p.participacionDeLaParte.productoraDeParticipante
                .nombre_productora,
              conflict.fonogramaDelConflicto.isrc,
              `${p.porcentaje_declarado}%`,
              p.is_documentos_enviados ? "SI" : "NO",
              p.porcentaje_confirmado || "",
              p.estado,
              <ActionDropdownButton
                menuOptions={handleMenuOptions(
                  p.id_conflicto_participacion,
                  p.participacionDeLaParte.id_participacion,
                  p.participacionDeLaParte.porcentaje_participacion,
                  conflict.fonograma_id
                )}
              />,
            ])}
          />
        </div>
      ) : null}
    </CustomLayout>
  );
}

export default page;
