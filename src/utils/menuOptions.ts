import { MenuOptions } from "@/types/types";
// import { IoIosWarning } from "react-icons/io";
import { HiUserPlus } from "react-icons/hi2";
import {
  // FaUniversity,
  FaUsers,
  // FaInbox,
  FaMusic,
  FaCloudDownloadAlt,
  FaDatabase,
} from "react-icons/fa";
import { GrDocumentMissing } from "react-icons/gr";
import { VscFiles } from "react-icons/vsc";
// import { TbCircleLetterR } from "react-icons/tb";

const adminMenuOptions: MenuOptions[] = [
  {
    name: "Registros",
    icon: HiUserPlus,
    link: "/records",
  },
  // {
  //   name: "Pagos Manuales",
  //   icon: FaUniversity,
  //   link: "/manual-payments",
  // },
  // {
  //   name: "Pagos",
  //   icon: FaUniversity,
  //   link: "/payments",
  // },

  {
    name: "Reporte por ISRC",
    icon: GrDocumentMissing,
    link: "/isrc-reports",
  },
  // {
  //   name: "Cuenta Corriente",
  //   icon: FaInbox,
  //   link: "/current-account",
  // },
  {
    name: "T y C Políticas de Privacidad",
    icon: VscFiles,
    link: "/privacy-policy",
  },
];

const repertoryMenuOptions: MenuOptions[] = [
  {
    name: "Repertorio Declarado",
    icon: FaMusic,
    link: "/repertory",
  },

  // {
  //   name: "Resolución de Conflictos",
  //   icon: IoIosWarning,
  // },

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
    name: "Depuración de repertorio",
    icon: FaDatabase,
  },
  {
    name: "Reportes",
    icon: FaCloudDownloadAlt,
  },
];

export default { adminMenuOptions, repertoryMenuOptions };
