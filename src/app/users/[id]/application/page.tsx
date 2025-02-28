"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import AcceptApplication from "@/components/Modals/AcceptApplication/AcceptApplication";
import RejectApplication from "@/components/Modals/RejectApplication/RejectApplication";
import ProducerView from "@/components/ProducerView/ProducerView";
import UserFieldsView from "@/components/UserFieldsView/UserFieldsView";
import useModal from "@/hooks/useModal";
import { getPendingApplications } from "@/services/auth";
import { User } from "@/types/user.types";

export default function page() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const { openModal } = useModal();

  const getProductoraPendiente = async () => {
    const user = await getPendingApplications(id as string);
    setUser(user);
  };

  useEffect(() => {
    getProductoraPendiente();
  }, []);

  const onRejectApplication = () => {
    openModal(<RejectApplication idUsuario={id as string} />);
  };

  const onAcceptApplication = () => {
    openModal(<AcceptApplication idUsuario={id as string} />);
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
        <ProducerView idProducer={user?.productoras[0].id} />
      </div>
      <div className="relative flex flex-row gap-[1rem] p-[1rem]">
        <CustomButton onClick={onAcceptApplication} className="bg-[#008d4c]">
          Confirmar el Registro del Usuario
        </CustomButton>
        <CustomButton background="delete" onClick={onRejectApplication}>
          Rechazar el Registro del Usuario
        </CustomButton>
      </div>
    </CustomLayout>
  );
}
