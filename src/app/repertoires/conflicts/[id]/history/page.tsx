"use client";
import { useParams, useRouter } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { getConflict } from "@/services/conflicts";
import { GetConflictResponse } from "@/types/conflicts.types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useModal from "@/hooks/useModal";
import { ConfirmPercentage } from "@/components/Modals/Conflicts/ConflictsActions";
import Spinner from "@/commons/Spinner/Spinner";
import { useAppSelector } from "@/hooks/storeHooks";

function page() {
  const params = useParams();
  const router = useRouter();
  const { openModal } = useModal();
  const { vistas } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [conflict, setConflict] = useState<GetConflictResponse | null>(null);

  const getConflictData = async () => {
    setLoading(true);
    try {
      const response = await getConflict(params.id as string);
      setConflict(response.data);
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  const menuOptions = (
    participationId: string,
    idPhonogram: string,
    percentage: number
  ) => {
    return [
      {
        label: "Modificar",
        onClick: () =>
          router.push(
            `/repertoires/${idPhonogram}/titularity/${participationId}`
          ),
      },
      ...(vistas.some((v) => v.nombre === "Confirmar Porcentaje Conflicto")
        ? [
            {
              label: "Fijar Porcentaje",
              onClick: () =>
                openModal(
                  <ConfirmPercentage
                    idConflicto={conflict?.id_conflicto ?? ""}
                    idParticipacion={participationId}
                    actualPercentage={percentage}
                  />
                ),
            },
          ]
        : []),
    ];
  };

  useEffect(() => {
    getConflictData();
  }, []);

  return (
    <CustomLayout>
      <Header back title="Titulares de Conflicto" />
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner color="black" />
        </div>
      ) : conflict ? (
        <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
          <h3 className="text-black font-black text-2xl pt-[1rem] px-[1rem]">
            Fonograma
          </h3>
          <div className="w-[100%] flex flex-row space-x-[1rem] px-[1rem]">
            <CustomInput
              disabled
              type="text"
              label="ISRC"
              initialValue={conflict.fonogramaDelConflicto.isrc}
            />
            <CustomInput
              disabled
              type="text"
              label="Estado"
              initialValue={conflict.estado_conflicto}
            />
            <CustomInput
              disabled
              className="w-[5rem]"
              type="text"
              label="Porcentaje"
              initialValue={conflict.porcentaje_periodo.toString()}
            />
            <CustomInput
              disabled
              type="text"
              label="Fecha Inicio"
              initialValue={new Date(
                conflict?.fecha_inicio_conflicto || ""
              ).toLocaleString()}
            />
            <CustomInput
              disabled
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="Productora Originaria"
              initialValue={conflict.productoraDelConflicto.nombre_productora}
            />
          </div>
          <CustomTable
            columnNames={[
              {
                name: "PRODUCTORA",
                isSortable: true,
              },
              { name: "PORCENTAJE DECLARADO", isSortable: true },
              { name: "DOCUMENTACIÓN ENVIADA", isSortable: true },
              { name: "PORCENTAJE DEFINITIVO", isSortable: true },
              { name: "ESTADO", isSortable: true },
              { name: "ACCIÓN", isSortable: false },
            ]}
            columnValues={conflict.partesDelConflicto.map((p) => [
              p.participacionDeLaParte.productoraDeParticipante
                .nombre_productora,
              `${p.porcentaje_declarado}%`,
              p.is_documentos_enviados ? "SI" : "NO",
              p.porcentaje_confirmado || "",
              p.estado,
              <ActionDropdownButton
                menuOptions={menuOptions(
                  p.participacionDeLaParte.id_participacion,
                  conflict.fonograma_id,
                  p.participacionDeLaParte.porcentaje_participacion
                )}
              />,
            ])}
          />
        </div>
      ) : (
        <div className="text-black justify-self-center pt-[4rem]">
          No se encontraron datos
        </div>
      )}
    </CustomLayout>
  );
}

export default page;
