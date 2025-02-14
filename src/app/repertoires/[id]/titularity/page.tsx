"use client";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomButton from "@/commons/CustomButton/CustomButton";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { useParams, useRouter } from "next/navigation";
import CustomInput from "@/commons/CustomInput/CustomInput";
import { RiProhibited2Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { useAppDispatch } from "@/hooks/storeHooks";
import { ModalNames } from "@/types/modalNames";
import { setModal } from "@/store/modalSlice";
import { ActionDropdownButton } from "@/commons/ActionDropdownButton/ActionDropdownButton";

function page() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleOpenModal = (type: ModalNames) => {
    dispatch(setModal({ type, isActive: true }));
  };

  const redirectToOption = (route: string): void => {
    router.push(route);
  };

  return (
    <CustomLayout>
      <Header back title="Titularidad" />
      {/* <div className="mt-[2rem] mb-[3rem] w-[100%] flex justify-end pr-[2rem] gap-[1rem]">
        <CustomButton>Guardar</CustomButton>
        <CustomButton background="warn">Cancelar</CustomButton>
      </div> */}

      <div className="w-[100%] mt-[1rem] flex items-center justify-between pl-[2rem] pr-[2rem]">
        <CustomInput label="Buscar Titular" type="text" />
        <CustomButton
          onClick={() =>
            redirectToOption(`/repertoires/${id}/titularity/add-titular`)
          }
        >
          Agregar Titular
        </CustomButton>
      </div>

      <div className="mt-[3rem] w-[100%] flex flex-col justify-center items-center">
        <p className="mb-[1rem] font-bold text-[1.2rem] text-black w-[100%] text-start pl-[2rem]">
          INFORMACIÓN DEL FONOGRAMA:
        </p>

        <CustomTable
          columnNames={[
            { name: "Nombre Fonograma", isSortable: false },
            { name: "Artista", isSortable: false },
            { name: "Año de Lanzamiento", isSortable: false },
            { name: "ISRC", isSortable: false },
            { name: "Total Acumulado", isSortable: false },
          ]}
          columnValues={[
            ["Cae el Sol", "Airbag", "2011", "SEBGA2100115", "100%"],
          ]}
        />
      </div>

      {/* <div className="w-[100%] mt-[2rem] mb-[1rem] flex justify-start items-center pl-[2rem]">
        <CustomInput label="Buscar Titular" type="text" />
      </div> */}

      <div className="w-[100%] flex flex-col justify-center items-center gap-[1rem] mt-[3rem]">
        <p className="font-bold text-[1.2rem] text-black w-[100%] text-start pl-[2rem]">
          TITULARES:
        </p>
        <CustomTable
          columnNames={[
            { name: "PRODUCTORA", isSortable: true },
            { name: "PORCENTAJE", isSortable: true },
            { name: "REGISTRO DESDE", isSortable: true },
            { name: "REGISTRO HASTA", isSortable: true },
            { name: "ACCIÓN", isSortable: false },
          ]}
          columnValues={[
            [
              "Warner",
              "33%",
              "12/10/2020",
              "16/07/2030",
              <ActionDropdownButton
                menuOptions={[
                  {
                    label: "Editar",
                    icon: <MdEdit />,
                    onClick: () =>
                      redirectToOption(
                        `/repertoires/${id}/titularity/edit-titular`
                      ),
                  },
                  {
                    label: "Editar",
                    icon: <RiProhibited2Line />,
                    onClick: () =>
                      handleOpenModal(ModalNames.TITULARITY_PHOGRAM_REMOVE),
                  },
                ]}
              />,
            ],
            [
              "Sony Music",
              "33%",
              "12/10/2020",
              "16/07/2030",
              <ActionDropdownButton
                menuOptions={[
                  {
                    label: "Editar",
                    icon: <MdEdit />,
                    onClick: () =>
                      redirectToOption(
                        `/repertoires/${id}/titularity/edit-titular`
                      ),
                  },
                  {
                    label: "Editar",
                    icon: <RiProhibited2Line />,
                    onClick: () =>
                      handleOpenModal(ModalNames.TITULARITY_PHOGRAM_REMOVE),
                  },
                ]}
              />,
            ],
            [
              "Columbia Records",
              "33%",
              "12/10/2020",
              "16/07/2030",
              <ActionDropdownButton
                menuOptions={[
                  {
                    label: "Editar",
                    icon: <MdEdit />,
                    onClick: () =>
                      redirectToOption(
                        `/repertoires/${id}/titularity/edit-titular`
                      ),
                  },
                  {
                    label: "Editar",
                    icon: <RiProhibited2Line />,
                    onClick: () =>
                      handleOpenModal(ModalNames.TITULARITY_PHOGRAM_REMOVE),
                  },
                ]}
              />,
            ],
          ]}
        />
      </div>
    </CustomLayout>
  );
}

export default page;
