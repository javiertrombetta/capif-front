"use client";
import React, { createContext, FC, ReactNode, useState } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { ModalNames } from "@/types/modalNames";
import { setModal } from "@/store/modalSlice";
import SearchConflictsFilters from "../Modals/Conflicts/SearchConflictsFilters";
import {
  FirstInstance,
  SecondInstance,
  Revision,
  Definition,
} from "../Modals/ActionConflictsDropdown/ActionConflictsDropdown";
import {
  CashflowPayoutsImportPayoutsModal,
  CashflowPayoutsMatchReportModal,
  CashflowPayoutsExportPayoutsModal,
} from "../Modals/CashflowPayoutsModals/CashflowPayoutsModals";
import SearchPhonogramsExportModal from "../Modals/SearchPhonogramsExportModal/SearchPhonogramsExportModal";
import CashflowTransfersImportModal, {
  CashflowTransfersExportModal,
} from "../Modals/CashflowTransfersImportModal/CashflowTransfersImportModal";
import {
  CashflowPaymentsImportPayment,
  CashflowPaymentsExportPayments,
} from "../Modals/CashflowPayments/CashflowPayments";
import {
  CashflowRejectionsImportRejection,
  CashflowRejectionsExportRejections,
  CashflowRejectionsReversePayment,
} from "../Modals/CashflowRejectionsModals/CashflowRejectionsModals";
import FinishNewPhonogram from "../Modals/FinishNewPhonogram/FinishNewPhonogram";
import {
  SendDocumentation,
  Accept,
} from "../Modals/Conflicts/ConflictsActions";

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
      case ModalNames.COMPLETE_REGISTRATION:
        return <EndRegisterUserModal />;
      case ModalNames.SEARCH_CONFLICTS_FILTERS:
        return <SearchConflictsFilters onCloseModal={onCloseModal} />;
      case ModalNames.FIRST_INSTANCE:
        return <FirstInstance onCloseModal={onCloseModal} />;
      case ModalNames.SECOND_INSTANCE:
        return <SecondInstance onCloseModal={onCloseModal} />;
      case ModalNames.REVISION:
        return <Revision onCloseModal={onCloseModal} />;
      case ModalNames.DEFINITION:
        return <Definition onCloseModal={onCloseModal} />;
      case ModalNames.CASHFLOW_PAYOUTS_MATCH_REPORT:
        return <CashflowPayoutsMatchReportModal onCloseModal={onCloseModal} />;
      case ModalNames.CASHFLOW_PAYOUTS_IMPORT_PAYOUTS:
        return (
          <CashflowPayoutsImportPayoutsModal onCloseModal={onCloseModal} />
        );
      case ModalNames.CASHFLOW_PAYOUTS_EXPORT_PAYOUTS:
        return (
          <CashflowPayoutsExportPayoutsModal onCloseModal={onCloseModal} />
        );
      case ModalNames.EXPORT_CHANGES_LIST:
        return <SearchPhonogramsExportModal onCloseModal={onCloseModal} />;
      case ModalNames.CASHFLOW_TRANSFERS:
        return <CashflowTransfersImportModal onCloseModal={onCloseModal} />;
      case ModalNames.CASHFLOW_IMPORT_PAYMENT:
        return <CashflowPaymentsImportPayment onCloseModal={onCloseModal} />;
      case ModalNames.CASHFLOW_EXPORT_PAYMENTS:
        return <CashflowPaymentsExportPayments onCloseModal={onCloseModal} />;
      case ModalNames.CASHFLOW_IMPORT_REJECTIONS:
        return (
          <CashflowRejectionsImportRejection onCloseModal={onCloseModal} />
        );
      case ModalNames.CASHFLOW_EXPORT_REJECTIONS:
        return (
          <CashflowRejectionsExportRejections onCloseModal={onCloseModal} />
        );
      case ModalNames.CASHFLOW_EXPORT_REJECTIONS_REVERSE_PAYMENT:
        return <CashflowRejectionsReversePayment onCloseModal={onCloseModal} />;
      case ModalNames.FINISH_NEW_PHONOGRAM:
        return <FinishNewPhonogram onCloseModal={onCloseModal} />;
      case ModalNames.CASHFLOW_TRANSFERS_EXPORT:
        return <CashflowTransfersExportModal onCloseModal={onCloseModal} />;
      case ModalNames.CONFLICTS_ACCEPT:
        return <Accept onCloseModal={onCloseModal} />;
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

const EndRegisterUserModal: FC = () => {
  return (
    <div className="bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        Debes terminar de completar el registro de tu usuario.
      </p>

      <CustomButton>Completar Registro</CustomButton>
    </div>
  );
};

export default ModalProvider;
