"use client";
import { useRouter } from "next/navigation";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import CustomTable from "@/commons/CustomTable/CustomTable";
import Header from "@/commons/Header/Header";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";

function page() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpenModal = (type: ModalNames) => {
    dispatch(setModal({ type, isActive: true }));
  };

  const menuOptions = (id: string) => {
    return [
      {
        label: "Modificar",
        onClick: () =>
          router.push(`/repertoires/${id}/titularity/:idtitularity`),
      },
      {
        label: "Fijar Porcentaje",
        onClick: () => handleOpenModal(ModalNames.CONFLICTS_CONFIRM_PERCENTAGE),
      },
      {
        label: "Aceptar",
        onClick: () => handleOpenModal(ModalNames.CONFLICTS_ACCEPT),
      },
    ];
  };

  return (
    <CustomLayout>
      <Header back title="Titulares de Conflicto" />

      <div className="w-[100%] flex items-center pr-[2rem] pl-[2rem] mt-[2rem] gap-[1rem]">
        <CustomInput type="text" label="Buscar Productora" />

        <select className="w-[13rem] mt-[1.5rem] text-black pl-[0.3rem] border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem]">
          <option>PENDIENTE </option>
          <option>RESPONDIDO</option>
          <option>DESISTIDO</option>
          <option>MODIFICADO </option>
          <option>RETIRADO</option>
          <option>ACEPTADO</option>
        </select>
      </div>

      <div className="mt-[2rem] w-[100%]">
        <CustomTable
          columnNames={[
            {
              name: "PRODUCTORA",
              isSortable: true,
            },
            { name: "ISRC", isSortable: true },
            { name: "PORCENTAJE DECLARADO", isSortable: true },
            { name: "DOCUMENTACIÓN ENVIADA", isSortable: true },
            { name: "PORCENTAJE DEFINITIVO", isSortable: true },
            { name: "ESTADO", isSortable: true },
            { name: "ACCIÓN", isSortable: false },
          ]}
          columnValues={Array(4).fill([
            "Sony Music",
            "AR6548646",
            "50%",
            "NO",
            "50%",
            "PENDIENTE DE RESPUESTA",
            <ActionDropdownButton menuOptions={menuOptions("1")} />,
          ])}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
