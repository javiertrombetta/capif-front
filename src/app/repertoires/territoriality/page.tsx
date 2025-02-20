"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import TerritorialityUnableModal from "@/components/Modals/TerritorialityModals/TerritorialityUnableModal";
import { TerritorialityAddModal } from "@/components/Modals/TerritorialityModals/TerritioralityAddModal";
import useModal from "@/hooks/useModal";
import { GetTerritoriesResponse } from "@/types/repertoire.types";
import { getTerritories } from "@/services/repertoire";

function page() {
  const { openModal } = useModal();
  const [territories, setTerritories] = useState<
    GetTerritoriesResponse["data"]
  >([]);
  const [loading, setLoading] = useState(true);

  const handleAddTerritoriality = () => {
    openModal(
      <TerritorialityAddModal onSuccess={() => getTerritoriesData()} />
    );
  };

  const handleToggleSwitch = async () => await getTerritoriesData();

  const getTerritoriesData = async () => {
    setLoading(true);
    try {
      const data = await getTerritories();
      setTerritories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTerritoriesData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Gestionar Territorialidad" />

      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="black" />
          </div>
        ) : territories.length > 0 ? (
          <CustomTable
            columnNames={[
              { name: "ISO", isSortable: true },
              { name: "PAÍS", isSortable: true },
              { name: "ESTADO", isSortable: true },
              { name: "ACCIÓN", isSortable: true },
            ]}
            columnValues={territories.map((t) => {
              return [
                t.codigo_iso,
                t.nombre_pais,
                t.is_habilitado ? "HABILITADO" : "DESHABILITADO",
                <CustomButton
                  background={t.is_habilitado ? "delete" : undefined}
                  onClick={() =>
                    openModal(
                      <TerritorialityUnableModal
                        idTerritory={t.id_territorio}
                        state={!t.is_habilitado}
                        onSuccess={handleToggleSwitch}
                      />
                    )
                  }
                >
                  {t.is_habilitado ? "Deshabilitar" : "Habilitar"}
                </CustomButton>,
              ];
            })}
          />
        ) : (
          <div className="text-black justify-self-center pt-[4rem]">
            No se encontraron territorios
          </div>
        )}
      </div>
      <div className="w-[100%] py-[1rem] px-[2rem] flex items-center justify-end">
        <CustomButton onClick={handleAddTerritoriality}>
          Agregar Territorio
        </CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;
