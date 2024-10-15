"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/records");
  }, []);

  return <div className="w-[100%] h-[100vh] bg-white"></div>;
}
