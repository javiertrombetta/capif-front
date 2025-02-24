"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import Spinner from "@/commons/Spinner/Spinner";
import { getPendingSettlements } from "@/services/cashflow";
import { GetPendingSettlementsResponse } from "@/types/cashflow";

function page() {
  const [settlements, setSettlements] = useState<
    GetPendingSettlementsResponse["data"]
  >([]);
  const [loading, setLoading] = useState(true);

  const getPendingSettlementsData = async () => {
    setLoading(true);
    try {
      const response = await getPendingSettlements();
      setSettlements(response);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener las liquidaciones pendientes");
      setSettlements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingSettlementsData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Envio Archivos de Audio" />

      <div className="w-[100%] flex-1 flex flex-col overflow-y-auto">
        <div className="w-[100%] mt-[2rem] flex-1 overflow-y-auto">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner color="black" />
            </div>
          ) : settlements.length > 0 ? (
            <CustomTable
              columnNames={[
                { name: "ISRC", isSortable: true },
                { name: "MONTO", isSortable: true },
              ]}
              columnValues={settlements.map((s) => [s.isrc, s.monto])}
            />
          ) : (
            <div className="text-black justify-self-center pt-[4rem]">
              No se encontraron archivos
            </div>
          )}
        </div>
      </div>
    </CustomLayout>
  );
}

export default page;
