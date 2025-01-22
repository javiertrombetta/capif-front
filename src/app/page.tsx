"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";

export default function Home() {
  const router = useRouter();

  return (
    <CustomLayout>
      <>{router.push("/login")}</>
    </CustomLayout>
  );
}
