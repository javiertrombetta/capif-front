"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProducerView from "@/components/ProducerView/ProducerView";
import { useParams } from "next/navigation";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { acceptApplication, getPendingApplications } from "@/services/auth";
import { ModalNames } from "@/types/modalNames";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import UserFieldsView from "@/components/UserFieldsView/UserFieldsView";
import { User } from "@/types/user.types";

export default function page() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>();

  const getProductoraPendiente = async () => {
    const user = await getPendingApplications(id as string);
    setUser(user);
  };

  useEffect(() => {
    getProductoraPendiente();
  }, []);

  const handleAccept = async () => {
    if (!id) return;

    try {
      await acceptApplication(id as string);
      toast.success("La solicitud fue aceptada correctamente");
    } catch (error) {
      toast.error("Error al aceptar la solicitud");
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  const rejectApplication = () => {
    dispatch(
      setModal({
        type: ModalNames.REJECT_REGISTRATION,
        isActive: true,
      })
    );
  };

  const onAcceptApplication = () => {
    dispatch(
      setModal({
        type: ModalNames.ACCEPT_APPLICATION,
        isActive: true,
        handleAccept,
      })
    );
  };

  if (!user) return;

  return (
    <CustomLayout>
      <Header back title="Ficha de Productora" />
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto p-[1rem]">
        <div className="p-[1rem] w-[100%] flex flex-col border-[1px] border-[#c8c8c8]">
          <h3 className="text-black text-3xl font-black mb-[1rem]">
            Datos Usuario
          </h3>
          <UserFieldsView userData={user} disabled={true} />
        </div>
        <ProducerView idProducer={user?.productoras[0].id} fieldsDisabled />
      </div>
      <div className="relative flex flex-row gap-[1rem] p-[1rem]">
        <CustomButton onClick={onAcceptApplication} className="bg-[#008d4c]">
          Confirmar el Registro del Usuario
        </CustomButton>
        <CustomButton background="delete" onClick={rejectApplication}>
          Rechazar
        </CustomButton>
      </div>
    </CustomLayout>
  );
}
