import React, { FC, useState } from "react";
import { IconType } from "react-icons";
import { IoIosArrowBack } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { FaBuilding, FaMusic, FaPercentage, FaUsers } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ItemSidebar from "@/commons/ItemSidebar/ItemSidebar";
import { useAppSelector } from "@/hooks/storeHooks";
import { ItemSidebarType } from "@/types/types";
import "./Sidebar.css";

interface DropdownMenusProps {
  id: number;
  title: string;
  items: ItemSidebarType[];
  icon: IconType;
  height?: string;
}

const Sidebar: FC = () => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const pathname = usePathname();
  const authData = useAppSelector((state) => state.auth);
  const handleToggle = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const mapVistaUrl: Record<string, { name: string; link: string }> = {
    "Declaración Repertorio": {
      name: "Declaración Repertorio",
      link: "/repertoires/new",
    },
    "Envío Archivo Audio": {
      name: "Envío Archivo Audio",
      link: "/repertoires/send-audio-file",
    },
    Territorialidad: {
      name: "Territorialidad",
      link: "/repertoires/territoriality",
    },
    "Declaración Bulk Repertorio": {
      name: "Declaración Masiva",
      link: "/repertoires/bulk",
    },
    "Buscar Repertorio": {
      name: "Buscar Repertorio",
      link: "/repertoires",
    },
    Conflictos: {
      name: "Conflictos",
      link: "/repertoires/conflicts",
    },
    "Buscar Usuario": {
      name: "Buscar",
      link: "/users",
    },
    "Alta Usuario": {
      name: "Altas",
      link: "/users/new",
    },
    "Buscar Productora": {
      name: "Buscar",
      link: "/producers",
    },
    "Premios Gardel": {
      name: "Permios Gardel",
      link: "/producers/gardel-awards",
    },
    Liquidaciones: {
      name: "ISRCs No Asignados",
      link: "/cashflow/settlements",
    },
    "Estado de Cuenta": {
      name: "Estado de Cuenta",
      link: "/cashflow",
    },
    "Historial de Cambios": {
      name: "Historial de Cambios",
      link: "/audits",
    },
    "Cambios en Repertorios": {
      name: "Cambios en Repertorios",
      link: "/audits/repertoire",
    },
    Sesiones: {
      name: "Sesiones",
      link: "/audits/sessions",
    },
  };

  const getItems = (menu: string) => {
    return authData.vistas
      .filter((v) => v.nombre_vista_superior === menu)
      .map((v) => mapVistaUrl[v.nombre])
      .filter(Boolean);
  };

  const SidebarDropdownMenus: DropdownMenusProps[] = [
    {
      id: 1,
      title: "REPERTORIO",
      items: getItems("Repertorio"),
      icon: FaMusic,
    },
    {
      id: 2,
      title: "PRODUCTORAS",
      items: getItems("Productoras"),
      icon: FaBuilding,
    },
    {
      id: 3,
      title: "USUARIOS",
      items: getItems("Usuarios"),
      icon: FaUsers,
    },
    {
      id: 4,
      title: "CUENTAS CORRIENTES",
      items: getItems("Cuentas Corrientes"),
      icon: FaPercentage,
    },
    {
      id: 5,
      title: "AUDITORIA",
      items: getItems("Auditoría"),
      icon: IoDocumentText,
    },
  ];

  return (
    <div className="w-[100%]">
      <div className="w-[100%] h-[3rem] bg-[#1a2226] flex items-center pl-[1rem]">
        {pathname === "/producers/register" ? null : (
          <p className="text-[#4b646f] text-[0.8rem]">MENU</p>
        )}
      </div>
      {pathname === "/producers/register"
        ? null
        : SidebarDropdownMenus.filter((s) => s.items.length !== 0).map(
            (item, key) => (
              <GenericMenu
                icon={item.icon}
                isOpen={openDropdownId === item.id}
                key={key}
                id={item.id}
                title={item.title}
                onToggle={handleToggle}
                items={item.items}
                height={(item.items.length * 2).toString() ?? item.height}
              />
            )
          )}
      <div className="w-[100%] h-[3rem] bg-[#1a2226] flex flex-col items-center justify-center absolute bottom-0">
        <p className="text-[#4b646f] text-[0.8rem]">GIT 2.0</p>
        <p className="text-[#4b646f] text-[0.8rem]">
          Developed by KEIRETSU 2025
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
        className="h-[2.5rem] w-[100%] flex items-center hover:bg-[#1E282C] section pl-[0.2rem] pr-[1rem] justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <Icon size={15} />
          <p className="text-[1rem] ml-[1rem] text-white whitespace-nowrap">
            {title}
          </p>
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
