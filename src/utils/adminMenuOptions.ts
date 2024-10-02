import { AdminMenuOptions } from "@/types/types";
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

const administrationMenuOptions: AdminMenuOptions[] = [
  {
    name: "Registros",
    icon: HiUserPlus,
    link: "/admin/records",
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
    link: "/admin/isrc-reports",
  },
  // {
  //   name: "Cuenta Corriente",
  //   icon: FaInbox,
  //   link: "/current-account",
  // },
  {
    name: "T y C Políticas de Privacidad",
    icon: VscFiles,
    link: "/admin/privacy-policy",
  },
];

const repertoryMenuOptions: AdminMenuOptions[] = [
  {
    name: "Repertorio Declarado",
    icon: FaMusic,
    link: "/admin/repertory",
  },

  // {
  //   name: "Resolución de Conflictos",
  //   icon: IoIosWarning,
  // },

  {
    name: "Productores",
    icon: FaUsers,
    link: "/admin/producers",
  },
  {
    name: "Alta Masiva",
    icon: FaDatabase,
    link: "/admin/mass-registration",
  },
  {
    name: "Archivos Repertorio",
    icon: FaDatabase,
    link: "/admin/repertory-files",
  },

  {
    name: "Depuración de repertorio",
    icon: FaDatabase,
    link: "/admin/refine-repertory",
  },
  {
    name: "Reportes",
    icon: FaCloudDownloadAlt,
    link: "/admin/reports",
  },
];

export default { administrationMenuOptions, repertoryMenuOptions };
