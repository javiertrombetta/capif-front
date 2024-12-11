"use client";
import React, { FC, ReactNode } from "react";
import CustomButton from "@/commons/CustomButton/CustomButton";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { ModalNames } from "@/types/modalNames";
import { IoClose } from "react-icons/io5";
import { setModal } from "@/store/modalSlice";
import { setUser } from "@/store/userSlice";
import { ROLES } from "@/types/auth.types";
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
} from "../Modals/CashflowPayoutsModals/CashflowPayoutsModals";
import GardelAwardsModal from "../Modals/GardelAwardsModal/GardelAwardsModal";
import SearchPhonogramsExportModal from "../Modals/SearchPhonogramsExportModal/SearchPhonogramsExportModal";
import CashflowTransfersImportModal from "../Modals/CashflowTransfersImportModal/CashflowTransfersImportModal";
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
        return <RejectRegistration onCloseModal={onCloseModal} />;
      case ModalNames.CHANGE_PRODUCER:
        return <ChangeProducerModal onCloseModal={onCloseModal} />;
      case ModalNames.ACCEPT_REGISTRATION:
        return <AcceptRegistrationModal onCloseModal={onCloseModal} />;
      case ModalNames.CHANGE_USER:
        return <ChangeUserModal onCloseModal={onCloseModal} />;
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
    }
    <></>;
  };

  return (
    <div className="w-[100%] h-[100%] relative">
      {modalData.isActive && (
        <>
          <div className="absolute w-[100%] h-[100%] z-30 flex justify-center items-center">
            {renderModal()}
          </div>
          <div className="z-20 absolute w-[100%] h-[100%] bg-[black] opacity-[0.4]" />
        </>
      )}

      {children}
    </div>
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

const RejectRegistration: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] flex flex-col gap-[1rem] justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>
      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        Comenta la razón del rechazo del registro:
      </p>
      <textarea
        rows={3}
        className={
          "padding-left border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] w-[90%] text-black"
        }
      />

      <CustomButton>Continuar</CustomButton>
    </div>
  );
};

const ChangeProducerModal: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const handleChangeProductionModal = (production: string) => {
    dispatch(setUser({ ...userData, activeProduction: production }));
    onCloseModal();
  };

  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>

      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        Selecciona una productora.
      </p>
      <div
        onClick={() => handleChangeProductionModal("WARNER")}
        className="w-[100%] cursor-pointer"
      >
        <p className="text-center text-black hover:bg-[#d8d8d8]">Warner</p>
      </div>
      <div
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
      </div>
    </div>
  );
};

const ChangeUserModal: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);

  const usersType = [
    {
      names: "Admin",
      email: "superadmin@gmail.com",
      phone: "+54 11-234567",
      rol: ROLES.SUPER_ADMIN,
      activeProduction: userData.activeProduction,
    },
    {
      names: "Capif Admin",
      phone: "+54 11-234567",
      email: "admin@gmail.com",
      rol: ROLES.CAPIF_ADMIN,
      activeProduction: userData.activeProduction,
    },
    {
      names: "Rodrigo Escalera",
      email: "rodrigo@gmail.com",
      phone: "+54 11-234567",
      rol: ROLES.USER_PRODUCER,
      activeProduction: userData.activeProduction,
    },
    {
      names: "Javier Trombetta",
      email: "javiert@gmail.com",
      phone: "+54 11-234567",
      rol: ROLES.EMPLOYEE,
      activeProduction: userData.activeProduction,
    },
  ];

  const handleChangeUser = (userType: ROLES) => {
    switch (userType) {
      case ROLES.SUPER_ADMIN:
        dispatch(setUser(usersType[0]));
        onCloseModal();
        break;
      case ROLES.CAPIF_ADMIN:
        dispatch(setUser(usersType[1]));
        onCloseModal();
        break;

      case ROLES.USER_PRODUCER:
        dispatch(setUser(usersType[2]));
        onCloseModal();
        break;

      case ROLES.EMPLOYEE:
        dispatch(setUser(usersType[3]));
        onCloseModal();
        break;
    }
  };

  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>

      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        Usuarios:
      </p>

      <div
        onClick={() => {
          handleChangeUser(ROLES.SUPER_ADMIN);
        }}
        className="w-[100%] cursor-pointer"
      >
        <p className="text-center text-black hover:bg-[#d8d8d8]">Super Admin</p>
      </div>
      <div
        onClick={() => {
          handleChangeUser(ROLES.CAPIF_ADMIN);
        }}
        className="w-[100%] cursor-pointer"
      >
        <p className="text-center text-black hover:bg-[#d8d8d8]">Capif Admin</p>
      </div>
      <div
        onClick={() => {
          handleChangeUser(ROLES.USER_PRODUCER);
        }}
        className="w-[100%] cursor-pointer"
      >
        <p className="text-center text-black hover:bg-[#d8d8d8]">
          Usuario Productor Principal
        </p>
      </div>
      <div
        onClick={() => {
          handleChangeUser(ROLES.EMPLOYEE);
        }}
        className="w-[100%] cursor-pointer"
      >
        <p className="text-center text-black hover:bg-[#d8d8d8]">
          Usuario Productor Secundario
        </p>
      </div>
    </div>
  );
};

const AcceptRegistrationModal: FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  return (
    <div className="relative bg-white h-[13rem] w-[30rem] mb-[6rem] rounded-[2rem] gap-[0.5rem] flex flex-col justify-center items-center">
      <button onClick={onCloseModal} className="absolute top-[5%] right-[5%]">
        <IoClose size={25} color="black" />
      </button>

      <p className="text-black font-bold text-[1.2rem] text-center w-[95%]">
        Selecciona una productora.
      </p>
      <div className="w-[100%] cursor-pointer">
        <p className="text-center text-black hover:bg-[#d8d8d8]">Warner</p>
      </div>
      <div className="w-[100%] cursor-pointer">
        <p className="text-center text-black hover:bg-[#d8d8d8]">Sony Music</p>
      </div>
      <div className="w-[100%] cursor-pointer">
        <p className="text-center text-black hover:bg-[#d8d8d8]">Goldstein</p>
      </div>
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
