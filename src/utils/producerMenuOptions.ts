import { AdminMenuOptions } from "@/types/types";
import { FaMusic, FaTrophy, FaEdit, FaCloudDownloadAlt } from "react-icons/fa";
import { VscFiles } from "react-icons/vsc";
import { IoIosWarning } from "react-icons/io";

const administrationMenuOptions: AdminMenuOptions[] = [
  {
    name: "Datos personales",
    icon: FaEdit,
    link: "/producer/personal-data",
  },
  {
    name: "T y C Políticas de Privacidad",
    icon: VscFiles,
    link: "/producer/privacy-policy",
  },
];

const repertoryMenuOptions: AdminMenuOptions[] = [
  {
    name: "Repertorio Declarado",
    icon: FaMusic,
    link: "/producer/repertory",
  },

  {
    name: "Resolución de Conflictos",
    icon: IoIosWarning,
    link: "/producer/conflicts-resolution",
  },
  {
    name: "Reportes",
    icon: FaCloudDownloadAlt,
    link: "/producer/reports",
  },
  {
    name: "Código Premios Gardel",
    icon: FaTrophy,
    link: "/producer/gardel-awards-code",
  },
];

export default { administrationMenuOptions, repertoryMenuOptions };
