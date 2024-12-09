import React, { FC, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { ItemSidebarType } from "@/types/types";
import ItemSidebar from "@/commons/ItemSidebar/ItemSidebar";
// import { AdminSidebarDropdownMenus } from "@/utils/sidebarDropdownMenus";
import "./Sidebar.css";
import { IconType } from "react-icons";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROLES } from "@/types/auth.types";
import { FaBuilding, FaMusic, FaPercentage, FaUsers } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

interface DropdownMenusProps {
  id: number;
  title: string;
  items: ItemSidebarType[];
  icon: IconType;
  height: string;
}

const Sidebar: FC = () => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const userData = useAppSelector((state) => state.user);
  const handleToggle = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const userProducerMenuOptions = {
    fonogramsOptions: [
      {
        name: "Declaración Repertorio",
        link: "/new-phonogram",
      },
      {
        name: "Buscar",
        link: "/search-phonogram",
      },
      {
        name: "Conflictos",
        link: "/conflicts",
      },
    ],

    usersOptions:
      userData.rol === ROLES.EMPLOYEE
        ? [
            {
              name: "Registros",
              link: "/records",
            },
          ]
        : [
            {
              name: "Alta Usuario",
              link: "/add-employee",
            },

            {
              name: "Registros",
              link: "/records",
            },
          ],

    cashFlowOptions: [
      {
        name: "Estado de Cuenta",
        link: "/cashflow-account-statement",
      },
    ],
  };

  const UserProducerDropdownMenus: DropdownMenusProps[] = [
    {
      id: 1,
      title: "REPERTORIO",
      items: userProducerMenuOptions.fonogramsOptions,
      icon: FaMusic,
      height: "6",
    },
    {
      id: 3,
      title: "USUARIOS",
      items: userProducerMenuOptions.usersOptions,
      icon: FaUsers,
      height: userData.rol === ROLES.USER_PRODUCER ? "4" : "2",
    },
    {
      id: 4,
      title: "CUENTAS CORRIENTES",
      items: userProducerMenuOptions.cashFlowOptions,
      icon: FaPercentage,
      height: "2",
    },
  ];

  const adminMenuOptions = {
    fonogramsOptions:
      userData.rol === ROLES.SUPER_ADMIN
        ? [
            {
              name: "Declaración Repertorio",
              link: "/new-phonogram",
            },

            {
              name: "Buscar",
              link: "/search-phonogram",
            },
            {
              name: "Conflictos",
              link: "/conflicts",
            },
            {
              name: "Envio Archivo Audio",
              link: "/send-audio-file",
            },
            {
              name: "Territorialidad",
              link: "/territoriality",
            },
          ]
        : [
            {
              name: "Declaración Repertorio",
              link: "/new-phonogram",
            },
            {
              name: "Buscar",
              link: "/search-phonogram",
            },
            {
              name: "Conflictos",
              link: "/conflicts",
            },
            {
              name: "Envio Archivo Audio",
              link: "/send-audio-file",
            },
            {
              name: "Territorialidad",
              link: "/territoriality",
            },
          ],

    producersOptions: [
      {
        name: "Buscar",
        link: "/search-production-company",
      },
      {
        name: "Permios Gardel",
        link: "/gardel-awards",
      },
    ],
    usersOptions: [
      {
        name: "Alta Usuario",
        link: "/add-employee",
      },
      {
        name: "Registros",
        link: "/records",
      },
    ],
    cashFlowOptions: [
      {
        name: "Liquidaciones",
        link: "/cashflow-payouts",
      },
      {
        name: "Pagos",
        link: "/cashflow-payments",
      },
      {
        name: "Traspasos",
        link: "/cashflow-transfers",
      },
      {
        name: "Rechazos",
        link: "/cashflow-rejections",
      },
      {
        name: "Estado de Cuenta",
        link: "/cashflow-account-statement",
      },
    ],
    auditoryOptions: [
      {
        name: "Historial de Cambios",
        link: "/audit-changes",
      },
      {
        name: "Cambios en Repertorios",
        link: "/audit-phonogram",
      },
      {
        name: "Sesiones",
        link: "/audit-sessions",
      },
    ],
  };

  const AdminSidebarDropdownMenus: DropdownMenusProps[] = [
    {
      id: 1,
      title: "REPERTORIO",
      items: adminMenuOptions.fonogramsOptions,
      icon: FaMusic,
      height: userData.rol === ROLES.SUPER_ADMIN ? "10" : "10",
    },
    {
      id: 2,
      title: "PRODUCTORAS",
      items: adminMenuOptions.producersOptions,
      icon: FaBuilding,
      height: "4",
    },
    {
      id: 3,
      title: "USUARIOS",
      items: adminMenuOptions.usersOptions,
      icon: FaUsers,
      height: "4",
    },
    {
      id: 4,
      title: "CUENTAS CORRIENTES",
      items: adminMenuOptions.cashFlowOptions,
      icon: FaPercentage,
      height: "10",
    },
    {
      id: 5,
      title: "AUDITORIA",
      items: adminMenuOptions.auditoryOptions,
      icon: IoDocumentText,
      height: "6",
    },
  ];

  return (
    <div className="w-[100%]">
      <div className="w-[100%] h-[3rem] bg-[#1a2226] flex items-center pl-[1rem]">
        <p className="text-[#4b646f] text-[0.8rem]">MENU</p>
      </div>

      {userData.rol === ROLES.USER_PRODUCER || userData.rol === ROLES.EMPLOYEE
        ? UserProducerDropdownMenus.map((item, key) => (
            <GenericMenu
              icon={item.icon}
              isOpen={openDropdownId === item.id}
              key={key}
              id={item.id}
              title={item.title}
              onToggle={handleToggle}
              items={item.items}
              height={item.height}
            />
          ))
        : AdminSidebarDropdownMenus.map((item, key) => (
            <GenericMenu
              icon={item.icon}
              isOpen={openDropdownId === item.id}
              key={key}
              id={item.id}
              title={item.title}
              onToggle={handleToggle}
              items={item.items}
              height={item.height}
            />
          ))}
      <div className="w-[100%] h-[3rem] bg-[#1a2226] flex flex-col items-center justify-center absolute bottom-0">
        <p className="text-[#4b646f] text-[0.8rem]">GIT 2.0</p>
        <p className="text-[#4b646f] text-[0.8rem]">
          Developed by KEIRETSU 2024
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

interface GenericMenuProps {
  id: number;
  isOpen: boolean;
  title: string;
  onToggle: (id: number) => void;
  items: ItemSidebarType[];
  icon: IconType;
  height: string;
}

const GenericMenu: FC<GenericMenuProps> = ({
  id,
  isOpen,
  title,
  onToggle,
  items,
  icon: Icon,
  height,
}) => {
  return (
    <div className="w-[100%]">
      <button
        onClick={() => onToggle(id)}
        className="h-[2.5rem] w-[100%] flex items-center hover:bg-[#1E282C] section pl-[1rem] pr-[1rem] justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <Icon size={15} />
          <p className="text-[1rem] ml-[0.5rem] text-white">{title}</p>
        </div>

        <div>
          <IoIosArrowBack />
        </div>
      </button>
      <div
        style={{
          height: isOpen ? `${height}rem` : "0rem",
          transition: "height 0.3s ease-in-out",
          overflow: "hidden",
        }}
        className={"pl-[1.2rem] mt-1 mb-2 flex flex-col gap-[0.5rem]"}
      >
        {items.map((element: ItemSidebarType, index: number) => (
          <ItemSidebar element={element} key={index} />
        ))}
      </div>
    </div>
  );
};
