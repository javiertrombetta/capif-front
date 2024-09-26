"use client";
import React, { FC, useState } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import { RiEqualizerFill } from "react-icons/ri";
import Modal from "@/commons/Modal/Modal";

const RepertoryView: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsOpenModal((prevState: boolean) => !prevState);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <CustomLayout className="relative">
      {isOpenModal && <Modal handleCloseModal={handleCloseModal} />}
      <Header title="Repertorio Declarado" />
      <div className="w-[100%] pl-[2rem] pr-[2rem]">
        <CustomButton
          onClick={handleOpenModal}
          className="gap-[0.2rem] mt-[3rem]"
        >
          <RiEqualizerFill color="white" />
          Filtros
        </CustomButton>
      </div>

      <div className="w-[100%] pl-[1rem] pr-[1rem]">
        <div className="relative overflow-x-auto mt-[2rem]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  TEMA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ARTISTA
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ISRC
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  SELLO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  TITULAR DERECHO
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  AÑO DE PUBLICACIÓN
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ÁLBUM
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-[1rem]">
                  ¿ENVÍO A MONITOREO DESDE GIT?
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 font-bold text-[1rem]"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b ">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Himno Nacional Argentino
                </td>
                <td className="px-6 py-4">Charly García</td>
                <td className="px-6 py-4">ARF100300069</td>
                <td className="px-6 py-4">
                  SONY MUSIC ENTERTAINMENT ARGENTINA S.A.
                </td>
                <td className="px-6 py-4">
                  SONY MUSIC ENTERTAINMENT ARGENTINA S.A. (100%)
                </td>
                <td className="px-6 py-4">03</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">NO</td>
                <td className="px-6 py-4">Detalle</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CustomLayout>
  );
};

export default RepertoryView;
