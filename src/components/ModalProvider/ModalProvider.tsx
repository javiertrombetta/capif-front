"use client";
import React, { FC, ReactNode, useEffect } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { ModalNames } from "@/types/modalNames";
import { IoClose } from "react-icons/io5";
import { setModal } from "@/store/modalSlice";
import CustomInput from "@/commons/CustomInput/CustomInput";
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
import GardelAwardsModal from "../Modals/GardelAwardsModal/GardelAwardsModal";
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
import GardelAwardsPurge from "../Modals/GardelAwardsPurge/GardelAwardsPurge";
import {
  SaveEditPhonogramModal,
  CancelEditPhonogramModal,
} from "../Modals/EditPhonogramModals/EditPhonogramModals";
import {
  TitularityPhonogramEdit,
  TitularityPhonogramRemove,
} from "../Modals/TitularityPhonogramActionModal/TitularityPhonogramActionModal";
import TerritorialitySaveModal from "../Modals/TerritorialitySaveModal/TerritorialitySaveModal";
import {
  SendAudioFile,
  SetSendError,
  RejectAudio,
} from "../Modals/SendAudioFileModals/SendAudioFileModals";
import TerritorialityUnableModal from "../Modals/TerritorialityUnableModal/TerritorialityUnableModal";

import {
  GrantExtension,
  ConfirmPercentage,
  SendDocumentation,
  Desist,
  Accept,
} from "../Modals/Conflicts/ConflictsActions";
import AuditSessionsPurgeModal from "../Modals/AuditSessionsPurgeModal/AuditSessionsPurgeModal";
import SubmitSendApplication from "../Modals/SubmitSendApplication/SubmitSendApplication";
import RejectApplication from "../Modals/RejectApplication/RejectApplication";
import AcceptApplication from "../Modals/AcceptApplication/AcceptApplication";
import { selectProductionCompany } from "@/services/auth";
import { setAuthData } from "@/store/authSlice";
import { getProducerById } from "@/services/productionCompanies";

interface ModalProvderProps {
  children: ReactNode;
}

const ModalProvider: FC<ModalProvderProps> = ({ children }) => {
  const modalData = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const onCloseModal = () => {
    dispatch(setModal({ isActive: false, type: null }));
  };
  const renderModal = (): ReactNode => {
    switch (modalData.type) {
      case ModalNames.COMPLETE_REGISTRATION:
        return <EndRegisterUserModal />;
      case ModalNames.REJECT_REGISTRATION:
        return <RejectApplication onCloseModal={onCloseModal} />;
      case ModalNames.ACCEPT_APPLICATION:
        return <AcceptApplication onCloseModal={onCloseModal} />;
      case ModalNames.CHANGE_PRODUCER:
        return <ChangeProducerModal onCloseModal={onCloseModal} />;
      case ModalNames.ADD_TERRITORIALITY:
        return <AddTerritorialityModal onCloseModal={onCloseModal} />;
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
      case ModalNames.GARDEL_AWARDS:
        return <GardelAwardsModal onCloseModal={onCloseModal} />;
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
      case ModalNames.GARDEL_AWARDS_PURGE:
        return <GardelAwardsPurge onCloseModal={onCloseModal} />;
      case ModalNames.EDIT_PHONOGRAM_SAVE:
        return <SaveEditPhonogramModal onCloseModal={onCloseModal} />;
      case ModalNames.EDIT_PHONOGRAM_CANCEL:
        return <CancelEditPhonogramModal onCloseModal={onCloseModal} />;
      case ModalNames.TITULARITY_PHOGRAM_EDIT:
        return <TitularityPhonogramEdit onCloseModal={onCloseModal} />;
      case ModalNames.TITULARITY_PHOGRAM_REMOVE:
        return <TitularityPhonogramRemove onCloseModal={onCloseModal} />;
      case ModalNames.TERRITORIALITY_SAVE:
        return <TerritorialitySaveModal onCloseModal={onCloseModal} />;
      case ModalNames.SEND_AUDIO_FILE:
        return <SendAudioFile onCloseModal={onCloseModal} />;
      case ModalNames.SEND_AUDIO_REJECT:
        return <RejectAudio onCloseModal={onCloseModal} />;
      case ModalNames.SEND_AUDIO_SET_ERROR_SEND:
        return <SetSendError onCloseModal={onCloseModal} />;
      case ModalNames.TERRITORIALITY_UNABLE:
        return <TerritorialityUnableModal onCloseModal={onCloseModal} />;
      case ModalNames.CASHFLOW_TRANSFERS_EXPORT:
        return <CashflowTransfersExportModal onCloseModal={onCloseModal} />;

      case ModalNames.CONFLICTS_GRANT_EXTENSION:
        return <GrantExtension onCloseModal={onCloseModal} />;
      case ModalNames.CONFLICTS_CONFIRM_PERCENTAGE:
        return <ConfirmPercentage onCloseModal={onCloseModal} />;
      case ModalNames.CONFLICTS_ACCEPT:
        return <Accept onCloseModal={onCloseModal} />;
      case ModalNames.CONFLICTS_SEND_DOCUMENTATION:
        return <SendDocumentation onCloseModal={onCloseModal} />;
      case ModalNames.CONFLICTS_DESIST:
        return <Desist onCloseModal={onCloseModal} />;
      case ModalNames.AUDIT_SESSIONS_PURGE:
        return <AuditSessionsPurgeModal onCloseModal={onCloseModal} />;
      case ModalNames.SUBMIT_SEND_APPILICATION:
        return <SubmitSendApplication onCloseModal={onCloseModal} />;
    }
    <></>;
  };

  return (
    <>
      {modalData.isActive && (
        <>
          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-40 flex justify-center items-center">
            {renderModal()}
          </div>
          <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-30 bg-[black] opacity-[0.4]" />
        </>
      )}

      {children}
    </>
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

const ChangeProducerModal: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);

  const selectProductora = async (element: {
    id: string;
    productora: string;
  }) => {
    try {
      await selectProductionCompany(element.id);
      const company = await getProducerById(element.id);
      const productionCompany = { ...element, cuit_cuil: company.cuit_cuil };
      if (window && window.localStorage) {
        localStorage.setItem("company", JSON.stringify(productionCompany));
      }
      dispatch(
        setAuthData({ ...authData, productoraActiva: productionCompany })
      );
    } catch (error) {
      console.log(error);
    } finally {
      onCloseModal();
    }
  };

  useEffect(() => {
    if (
      authData.productoras &&
      authData.id_usuario &&
      !authData.productoras[0].id
    ) {
      onCloseModal();
    }
  }, [authData]);
  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>

      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        Selecciona una productora.
      </p>
      {authData.productoras && authData.productoras.length > 0
        ? authData.productoras.map((element, index) => (
            <div
              key={index}
              className="w-[100%] cursor-pointer"
              onClick={() => selectProductora(element)}
            >
              <p className="text-center text-black hover:bg-[#d8d8d8]">
                {element.productora}
              </p>
            </div>
          ))
        : null}
      {/* <div
        onClick={() => handleChangeProductionModal("SONY MUSIC")}
        className="w-[100%] cursor-pointer"
      >
        <p className="text-center text-black hover:bg-[#d8d8d8]">Sony Music</p>
      </div>
      <div
        onClick={() => handleChangeProductionModal("GOLDSTEIN")}
        className="w-[100%] cursor-pointer"
      >
        <p className="text-center text-black hover:bg-[#d8d8d8]">Goldstein</p>
      </div> */}
    </div>
  );
};

const AddTerritorialityModal: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  return (
    <div className="relative bg-white h-[19rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>
      <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem]">
        <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
          Agregar Territorio
        </p>
        <CustomInput className="w-[19rem]" type="text" label="ISO del País" />
        <CustomInput
          className="w-[19rem]"
          type="text"
          label="Nombre del País"
        />
        <CustomButton>Aceptar</CustomButton>
      </div>
    </div>
  );
};

export default ModalProvider;
