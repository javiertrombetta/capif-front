"use client";
import React, { createContext, FC, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { ModalNames } from "@/types/modalNames";
import { setModal } from "@/store/modalSlice";
import {
  FirstInstance,
  SecondInstance,
  Revision,
  Definition,
} from "../Modals/ActionConflictsDropdown/ActionConflictsDropdown";
import { SendDocumentation } from "../Modals/Conflicts/ConflictsActions";

interface ModalContextType {
  modal: ReactNode | null;
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

interface ModalProvderProps {
  children: ReactNode;
}

const ModalProvider: FC<ModalProvderProps> = ({ children }) => {
  const modalData = useAppSelector((state) => state.modal);
  const [selectedModal, setSelectedModal] = useState<ReactNode | null>(null);

  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    dispatch(setModal({ isActive: false, type: null }));
  };

  const openModal = (modal: ReactNode) => {
    setSelectedModal(modal);
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  const renderModal = (): ReactNode => {
    switch (modalData.type) {
      case ModalNames.FIRST_INSTANCE:
        return <FirstInstance onCloseModal={onCloseModal} />;
      case ModalNames.SECOND_INSTANCE:
        return <SecondInstance onCloseModal={onCloseModal} />;
      case ModalNames.REVISION:
        return <Revision onCloseModal={onCloseModal} />;
      case ModalNames.DEFINITION:
        return <Definition onCloseModal={onCloseModal} />;
      case ModalNames.CONFLICTS_SEND_DOCUMENTATION:
        return <SendDocumentation onCloseModal={onCloseModal} />;
    }
  };

  return (
    <ModalContext.Provider
      value={{ modal: selectedModal, openModal, closeModal }}
    >
      {modalData.isActive && (
        <>
          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-40 flex justify-center items-center">
            {renderModal()}
          </div>
          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-30 bg-[black] opacity-[0.4]" />
        </>
      )}
      {selectedModal && (
        <>
          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-40 flex justify-center items-center">
            {selectedModal}
          </div>
          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-30 bg-[black] opacity-[0.4]" />
        </>
      )}

      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
