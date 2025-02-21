"use client";
import React, { FC, useEffect, useState } from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import {
  desistConflict,
  getConflicts,
  grantExtension,
} from "@/services/conflicts";
import { Conflicto } from "@/types/conflicts.types";
import { toast } from "react-toastify";
import useModal from "@/hooks/useModal";
import {
  GrantExtension,
  Desist,
} from "@/components/Modals/Conflicts/ConflictsActions";
import Spinner from "@/commons/Spinner/Spinner";

function page() {
  const [conflicts, setConflicts] = useState<Conflicto[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const getConflictsData = async () => {
    try {
      const response = await getConflicts();
      setConflicts(response.data);
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
      setConflicts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (modalType: ModalNames) => {
    dispatch(setModal({ isActive: true, type: modalType }));
  };

  const onGrantExtension = async (id: string) => {
    try {
      const response = await grantExtension(id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const onDesistConflict = async (id: string) => {
    try {
      const response = await desistConflict(id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleMenuOptions = (id: string) => {
    return [
      ...(authData.rol === ROLES.SUPER_ADMIN ||
      authData.rol === ROLES.CAPIF_ADMIN
        ? [
            {
              label: "Otorgar Prórroga",
              onClick: () =>
                openModal(
                  <GrantExtension
                    onGrantExtension={() => onGrantExtension(id)}
                    onCloseModal={closeModal}
                  />
                ),
            },
            {
              label: "Ver Titulares",
              onClick: () =>
                router.push(`/repertoires/conflicts/${id}/history`),
            },
          ]
        : []),
      ...(authData.rol === ROLES.USER_PRODUCER ||
      authData.rol === ROLES.EMPLOYEE
        ? [
            {
              label: "Confirmar Porcentaje",
              onClick: () =>
                handleOpenModal(ModalNames.CONFLICTS_CONFIRM_PERCENTAGE),
            },
            {
              label: "Enviar Documentación",
              onClick: () =>
                handleOpenModal(ModalNames.CONFLICTS_SEND_DOCUMENTATION),
            },
          ]
        : []),
      {
        label: "Desistir conflicto",
        onClick: () =>
          openModal(
            <Desist
              onDesistConflict={() => onDesistConflict(id)}
              onCloseModal={closeModal}
            />
          ),
      },
    ];
  };

  useEffect(() => {
    getConflictsData();
  }, []);

  return (
    <CustomLayout>
      <Header title="Conflictos" />
      <div className="w-[100%] flex-1 flex flex-col space-y-[1rem] overflow-y-auto">
        <SearchConflictForm />
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="black" />
          </div>
        ) : conflicts && conflicts.length > 0 ? (
          <CustomTable
            columnNames={[
              { name: "Productora", isSortable: true },
              { name: "ISRC", isSortable: true },
              { name: "Fecha de Inicio", isSortable: true },
              { name: "Fecha de Finalización", isSortable: true },
              { name: "Estado del Conflicto", isSortable: true },
              { name: "Acción", isSortable: false },
            ]}
            columnValues={conflicts.map((c) => [
              c.productoraDelConflicto.nombre_productora,
              c.fonogramaDelConflicto.isrc,
              c.fecha_periodo_desde,
              c.fecha_periodo_hasta,
              c.estado_conflicto,
              <ActionDropdownButton
                menuOptions={handleMenuOptions(c.id_conflicto)}
              />,
            ])}
          />
        ) : (
          <div className="text-black mx-auto pt-[4rem]">
            No se encontraron fonogramas
          </div>
        )}
      </div>
    </CustomLayout>
  );
}

export default page;

const SearchConflictForm: FC = () => {
  const authData = useAppSelector((state) => state.auth);

  // const handleSearchButton = () => {
  //   dispatch(
  //     setModal({ isActive: true, type: ModalNames.SEARCH_CONFLICTS_FILTERS })
  //   );
  // };

  return (
    <div className="w-[100%]  mt-[2rem] flex flex-col gap-[1rem]">
      {authData.rol === ROLES.CAPIF_ADMIN ||
      authData.rol === ROLES.SUPER_ADMIN ? (
        <>
          <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ISRC"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ALBUM"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="ARTISTA"
            />
          </div>

          <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="PARTES"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="DESDE"
            />
            <CustomInput
              containerClassName="w-[100%]"
              className="w-[100%]"
              type="text"
              label="HASTA"
            />
          </div>
        </>
      ) : null}
      <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <div className="w-[100%]">
          <p className="text-black font-bold">ESTADO</p>
          <select className="w-[100%] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem]">
            <option>PRIMERA INSTANCIA</option>
            <option>PRIMERA PRORROGA</option>
            <option>SEGUNDA INSTANCIA</option>
            <option>SEGUNDA PRORROGA</option>
            <option>VENCIDO</option>
            <option>CERRADO</option>
          </select>
        </div>
      </div>

      <div className="w-[100%] flex justify-center items-center pl-[2rem] pr-[2rem] gap-[2rem]">
        <button className="text-white w-[100%] h-[2.5rem] bg-mainblue text-[1rem] font-bold flex justify-center items-center gap-[0.3rem]">
          <FaSearch />
          Buscar
        </button>
      </div>
    </div>
  );
};

/*
 {userData.rol === ROLES.USER_PRODUCER ||
        userData.rol === ROLES.EMPLOYEE ? (
          <>
            <li
              onClick={() => handleOpenModal(ModalNames.FIRST_INSTANCE)}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Primera Instancia</p>
            </li>
            <li
              onClick={() => handleOpenModal(ModalNames.SECOND_INSTANCE)}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Segunda Instancia</p>
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => handleOpenModal(ModalNames.REVISION)}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Revisión</p>
            </li>

            <li
              onClick={() => handleOpenModal(ModalNames.DEFINITION)}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-center gap-[0.7rem]"
            >
              <p>Definición</p>
            </li>
          </>
        )}

*/
