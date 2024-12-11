"use client";
import React from "react";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import Header from "@/commons/Header/Header";
import CustomInput from "@/commons/CustomInput/CustomInput";
import CustomTable from "@/commons/CustomTable/CustomTable";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import CustomButton from "@/commons/CustomButton/CustomButton";

function page() {
  const userData = useAppSelector((state) => state.user);

  // const toggleDropdown = (id: number) => {
  //   if (activeDropdown === id) {
  //     setActiveDropdown(null);
  //   } else {
  //     setActiveDropdown(id);
  //   }
  // };

  // const redirectToOption = (route: string): void => {
  //   router.push(route);
  // };
  return (
    <CustomLayout>
      <Header title="Envio Archivo de Audio" />

      <div className="w-[100%] pr-[2rem] pl-[2rem] mt-[2rem] flex items-center justify-start gap-[1rem]">
        <CustomInput type="text" label="Buscar" />
        {userData.rol === ROLES.SUPER_ADMIN ||
        userData.rol === ROLES.CAPIF_ADMIN ? (
          <>
            <select className="text-black border-[#c8c8c8] border-[2px] outline-0 focus:border-[2px] focus:border-[#1280e1] h-[2rem] w-[15rem] text-black mt-[1.4rem]">
              <option>Pendientes de Envio</option>
              <option>Enviado Sin Audio</option>
              <option>Enviado Con Audio</option>
              <option>Rechazado Por Vericast</option>
              <option>Error En El Envio</option>
            </select>

            <CustomInput
              className="w-[15rem]"
              label="FECHA CREACIÓN DESDE"
              type="date"
            />
            <CustomInput
              className="w-[15rem]"
              label="FECHA CREACIÓN HASTA"
              type="date"
            />
          </>
        ) : null}
      </div>

      <div className="w-[100%] mt-[2rem] pr-[2rem] pl-[2rem]">
        <CustomTable
          columnNames={[
            { name: "", isSortable: false, selectBox: true },
            { name: "TEMA", isSortable: true },
            { name: "ARTISTA", isSortable: true },
            { name: "ISRC", isSortable: true },
            { name: "SELLO", isSortable: true },
            { name: "TITULAR DERECHO", isSortable: true },
            { name: "AÑO DE PUBLICACIÓN", isSortable: true },
            { name: "ÁLBUM", isSortable: true },
            { name: "ESTADO", isSortable: true },
          ]}
          columnValues={[
            [
              <input type="checkbox" className="scale-[1.5]" />,
              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A. (100%)",
              "2003",
              "Argentina",
              "Enviado",
            ],
            [
              <input type="checkbox" className="scale-[1.5]" />,

              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A. (100%)",
              "2003",
              "Argentina",
              "Enviado",
            ],
            [
              <input type="checkbox" className="scale-[1.5]" />,

              "Himno Nacional Argentino",
              "Charly Garcia",
              "ARF100300069",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A.",
              "SONY MUSIC ENTERTAINMENT ARGENTINA S.A. (100%)",
              "2003",
              "Argentina",
              "Enviado",
            ],
          ]}
        />
      </div>
      <div className="w-[100%] pr-[3rem] pl-[3rem] flex justify-end gap-[1rem] items-center mt-[2rem]">
        <CustomButton>ENVIAR</CustomButton>
        <CustomButton>RECHAZADO</CustomButton>
        <CustomButton>ERROR EN EL ENVIO</CustomButton>
      </div>
    </CustomLayout>
  );
}

export default page;
// interface ActionDropdownButtonProps {
//   toggleDropdown: (id: number) => void;
//   id: number;
//   activeDropdown: number | null;
//   redirectToOption: (route: string) => void;
// }

// const ActionDropdownButton: FC<ActionDropdownButtonProps> = ({
//   toggleDropdown,
//   id,
//   activeDropdown,
//   redirectToOption,
// }) => {
//   return (
//     <div className="px-6 py-4 relative group">
//       <button
//         onClick={() => toggleDropdown(id)}
//         className="bg-[#1280e1] text-white w-[2rem] h-[2rem] flex justify-center items-center rounded-[0.3rem]"
//       >
//         <IoMdSettings size={20} />
//       </button>
//       <ul
//         className={`absolute right-0 mt-2 w-[8rem] bg-slate-900 border rounded-md shadow-lg z-30 overflow-hidden ${
//           activeDropdown === id ? "" : "hidden"
//         }`}
//       >
//         <li
//           onClick={() => redirectToOption("/edit-user")}
//           className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
//         >
//           <p>Titularidad</p>
//         </li>
//         <li
//           onClick={() => redirectToOption("/user-profile")}
//           className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white flex items-center justify-start gap-[0.7rem]"
//         >
//           <p>Territorialidad</p>
//         </li>
//       </ul>
//     </div>
//   );
// };
