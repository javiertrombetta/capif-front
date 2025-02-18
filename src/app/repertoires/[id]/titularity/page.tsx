"use client";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { useParams, useRouter } from "next/navigation";
import { RiProhibited2Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import { GetRepertoireTitularityResponse } from "@/types/repertoire.types";
import { useEffect, useState } from "react";
import { getRepertoireTitularity } from "@/services/repertoire";
import { toast } from "react-toastify";
import Spinner from "@/commons/Spinner/Spinner";
import useModal from "@/hooks/useModal";
import TitularityPhonogramRemove from "@/components/Modals/TitularityPhonogramRemove/TitularityPhonogramRemove";

function page() {
  const router = useRouter();
  const { id } = useParams();
  const { openModal } = useModal();
  const [loading, setLoading] = useState(true);
  const [titularities, setTitularities] = useState<
    GetRepertoireTitularityResponse["participaciones"]
  >([]);

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  const handleOnRemove = (idTitularity: string) => {
    setTitularities(
      titularities.filter((t) => t.id_participacion !== idTitularity)
    );
  };

  const getTitularityData = async () => {
    try {
      const titularityData = await getRepertoireTitularity(id as string);
      setTitularities(titularityData);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener las productoras");
      setTitularities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTitularityData();
  }, []);

  return (
    <CustomLayout>
      <Header back title="Titularidad" />
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="black" />
          </div>
        ) : (
          titularities &&
          titularities.length > 0 && (
            <CustomTable
              columnNames={[
                { name: "PRODUCTORA", isSortable: true },
                { name: "PORCENTAJE", isSortable: true },
                { name: "REGISTRO DESDE", isSortable: true },
                { name: "REGISTRO HASTA", isSortable: true },
                { name: "ACCIÓN", isSortable: false },
              ]}
              columnValues={titularities.map((t) => [
                t.productoraDeParticipante.nombre_productora,
                t.porcentaje_participacion,
                t.fecha_participacion_inicio,
                t.fecha_participacion_hasta,
                <ActionDropdownButton
                  menuOptions={[
                    {
                      label: "Editar",
                      icon: <MdEdit />,
                      onClick: () =>
                        redirectToOption(
                          `/repertoires/${id}/titularity/${t.id_participacion}`
                        ),
                    },
                    {
                      label: "Eliminar",
                      icon: <RiProhibited2Line />,
                      onClick: () =>
                        openModal(
                          <TitularityPhonogramRemove
                            idRepertoire={id as string}
                            idTitularity={t.id_participacion}
                            onRemove={() => handleOnRemove(t.id_participacion)}
                          />
                        ),
                    },
                  ]}
                />,
              ])}
            />
          )
        )}
      </div>
      <div className="w-[100%] py-[1rem] px-[2rem] flex items-center justify-end">
        <CustomButton
          onClick={() =>
            redirectToOption(`/repertoires/${id}/titularity/add-titular`)
          }
        >
          Agregar Titular
        </CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;
