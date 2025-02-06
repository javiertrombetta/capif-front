"use client";

import React, { useEffect, useState } from "react";
import ProducerView from "@/components/ProducerView/ProducerView";
import { getUserById } from "@/services/users";
import { useParams } from "next/navigation";
import { User } from "@/types/user.types";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { acceptApplication } from "@/services/auth";
import { toast } from "react-toastify";
import { ModalNames } from "@/types/modalNames";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";

export default function page() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    const user = await getUserById(id as string);
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleAccept = async () => {
    if (!user?.id) return;

    try {
      await acceptApplication(user?.id);
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
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto py-[1rem]">
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
