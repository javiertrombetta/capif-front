import { MenuOptions } from "@/types/types";
import { IoIosMail, IoIosWarning } from "react-icons/io";
import { FaTags } from "react-icons/fa6";
import { HiUserPlus } from "react-icons/hi2";
import {
  FaUniversity,
  FaUsers,
  FaInbox,
  FaMusic,
  FaCloudDownloadAlt,
  FaDatabase,
} from "react-icons/fa";
import { GrDocumentMissing } from "react-icons/gr";
import { VscFiles } from "react-icons/vsc";
import { TbCircleLetterR } from "react-icons/tb";

const adminMenuOptions: MenuOptions[] = [
  {
    name: "Registros Pendientes",
    icon: IoIosMail,
    link: "/pending-registrations",
  },

  {
    name: "Listado General",
    icon: FaTags,
    link: "/general-list",
  },

  {
    name: "Registrados",
    icon: HiUserPlus,
    link: "/registered",
  },
  {
    name: "Pagos Manuales",
    icon: FaUniversity,
    link: "/manual-payments",
  },
  {
    name: "Pagos",
    icon: FaUniversity,
    link: "/payments",
  },
  {
    name: "Usuarios",
    icon: FaUsers,
    link: "/users",
  },
  {
    name: "Reporte por ISRC",
    icon: GrDocumentMissing,
    link: "/isrc-reports",
  },
  {
    name: "Cuenta Corriente",
    icon: FaInbox,
    link: "/current-account",
  },
  {
    name: "T y C Políticas de Privacidad",
    icon: VscFiles,
  },
];

const repertoryMenuOptions: MenuOptions[] = [
  {
    name: "Repertorio Declarado",
    icon: FaMusic,
  },

  {
    name: "Resolución de Conflictos",
    icon: IoIosWarning,
  },

  {
    name: "Productores",
    icon: FaUsers,
  },
  {
    name: "Alta Masiva",
    icon: FaDatabase,
  },
  {
    name: "Archivos Repertorio",
    icon: FaDatabase,
  },
  {
    name: "Reglas",
    icon: FaDatabase,
  },
  {
    name: "Modificación de Datos",
    icon: FaDatabase,
  },
  {
    name: "Titularidad",
    icon: TbCircleLetterR,
  },
  {
    name: "Depuración de repertorio",
    icon: FaDatabase,
  },
  {
    name: "Reportes",
    icon: FaCloudDownloadAlt,
  },
];

export default { adminMenuOptions, repertoryMenuOptions };
