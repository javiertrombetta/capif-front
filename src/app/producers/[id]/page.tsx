"use client";
import React from "react";
import ProducerView from "@/components/ProducerView/ProducerView";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import { useParams } from "next/navigation";
import Header from "@/commons/Header/Header";

export default function page() {
  const { id } = useParams();

  return (
    <CustomLayout>
      <Header title="Ficha Productora" />
      <div className="flex flex-col w-[100%] overflow-auto p-[1rem]">
        <ProducerView fieldsDisabled={false} idProducer={id as string} />
      </div>
    </CustomLayout>
  );
}
