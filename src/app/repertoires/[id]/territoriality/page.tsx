"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomTable from "@/commons/CustomTable/CustomTable";
import {
  getRepertoireTerritoriality,
  updateRepertoireTerritory,
} from "@/services/repertoire";
import { GetRepertoireTerritorialityResponse } from "@/types/repertoire.types";
import Spinner from "@/commons/Spinner/Spinner";
import { toast } from "react-toastify";

function page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [territories, setTerritories] = useState<
    GetRepertoireTerritorialityResponse["territorios"]
  >([]);

  const handleOnChecked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const { id: idTerritory, checked } = e.target;
    try {
      await updateRepertoireTerritory(id as string, idTerritory, checked);
      setTerritories([
        ...territories.map((t) =>
          t.id_territorio !== idTerritory
            ? t
            : { ...t, is_activo: !t.is_activo }
        ),
      ]);
      toast.success("Territorio actualizado correctamente");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el territorio");
    }
  };

  const getTerritoriesData = async () => {
    setLoading(true);
    try {
      const data = await getRepertoireTerritoriality(id as string);
      setTerritories(data.territorios);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener los territorios");
      setTerritories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTerritoriesData();
  }, []);

  return (
    <CustomLayout>
      <Header back title="Editar Territorialidad" />
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="black" />
          </div>
        ) : (
          <CustomTable
            columnNames={[
              { name: "ACTIVO", isSortable: false, selectBox: true },
              { name: "PAÍS", isSortable: true },
              { name: "ISO", isSortable: true },
            ]}
            columnValues={territories.map((t) => [
              <input
                id={t.id_territorio}
                checked={t.is_activo}
                type="checkbox"
                onChange={handleOnChecked}
              />,
              t.nombre_pais,
              t.codigo_iso,
            ])}
          />
        )}
      </div>
    </CustomLayout>
  );
}

export default page;
