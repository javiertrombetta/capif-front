import React, { FC, ReactNode, useState } from "react";
import { IoIosSpeedometer, IoIosArrowBack, IoIosWarning } from "react-icons/io";
import Link from "next/link";
import { AdminMenuOptions } from "@/types/types";
import menuOptions from "@/utils/adminMenuOptions";
import { usePathname } from "next/navigation";
import { FaRegCircle, FaCircle } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar: FC = () => {
  const [showAdminMenu, setShowAdminMenu] = useState<boolean>(false);
  const [showRepertorynMenu, setShowRepertorynMenu] = useState<boolean>(false);
  const pathname = usePathname();

  const handleShowAdminMenu = (): void => {
    setShowAdminMenu((prevState: boolean) => !prevState);
    setShowRepertorynMenu(false);
  };

  const handleShowRepertoryMenu = (): void => {
    setShowRepertorynMenu((prevState: boolean) => !prevState);
    setShowAdminMenu(false);
  };

  const renderMenuOption = (
    element: AdminMenuOptions,
    key: number
  ): ReactNode => {
    if (element.link) {
      return (
        <Link
          href={element.link}
          key={key}
          className={`flex items-center gap-[0.5rem] ${element.link === pathname ? "menu-option-selected" : "menu-option"}`}
        >
          <element.icon size={17} />
          <p>{element.name}</p>
        </Link>
      );
    }
    return (
      <div key={key} className="flex items-center gap-[0.5rem] menu-option">
        <element.icon size={17} />
        <p>{element.name}</p>
      </div>
    );
  };

  const renderConflictsResolution: FC = () => {
    return (
      <>
        <div className="flex items-center gap-[0.5rem] menu-option relative">
          <div className="flex items-center gap-[0.5rem]">
            <IoIosWarning size={17} />
            <p>Resolución de conflictos</p>
          </div>
        </div>

        <div className="solve-conflicts-slide-visible">
          <Link href={"/admin/start-conflict"}>
            <p
              className={`${pathname === "/admin/start-conflict" && "text-white"} text-#8aa4af hover:text-white cursor-pointer flex items-center gap-[0.3rem]`}
            >
              {pathname === "/admin/start-conflict" ? (
                <FaCircle size={10} />
              ) : (
                <FaRegCircle size={10} />
              )}
              Iniciar Conflicto
            </p>
          </Link>
          <Link href={"/admin/pending-resolution"}>
            <p
              className={`${pathname === "/admin/pending-resolution" && "text-white"} text-#8aa4af hover:text-white cursor-pointer flex items-center gap-[0.3rem]`}
            >
              {pathname === "/admin/pending-resolution" ? (
                <FaCircle size={10} />
              ) : (
                <FaRegCircle size={10} />
              )}
              Pendientes de resolución
            </p>
          </Link>
          <Link href={"/admin/solved"}>
            <p
              className={`${pathname === "/admin/solved" && "text-white"} text-#8aa4af hover:text-white cursor-pointer flex items-center gap-[0.3rem]`}
            >
              {pathname === "/admin/solved" ? (
                <FaCircle size={10} />
              ) : (
                <FaRegCircle size={10} />
              )}
              Resueltos
            </p>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="w-[100%]">
      <div className="w-[100%] h-[3rem] bg-[#1a2226] flex items-center pl-[1rem]">
        <p className="text-[#4b646f] text-[0.8rem]">MENU</p>
      </div>
      <div className="w-[100%]">
        <button
          onClick={handleShowAdminMenu}
          className="h-[2.5rem] w-[100%] flex items-center hover:bg-[#1E282C] section pl-[1rem] pr-[1rem] justify-between cursor-pointer"
        >
          <div className="flex items-center">
            <IoIosSpeedometer />
            <p className="text-[1rem] ml-[0.5rem] text-white">Administración</p>
          </div>

          <div>
            <IoIosArrowBack />
          </div>
        </button>

        <div
          className={`mt-[0.5rem] ${showAdminMenu ? "admin-slide-visible" : "admin-slide"}`}
        >
          {menuOptions.administrationMenuOptions.map(
            (element: AdminMenuOptions, index: number) =>
              renderMenuOption(element, index)
          )}
        </div>
      </div>

      <div className="w-[100%]">
        <button
          onClick={handleShowRepertoryMenu}
          className="h-[2.5rem] w-[100%] flex items-center hover:bg-[#1E282C] section pl-[1rem] pr-[1rem] justify-between cursor-pointer"
        >
          <div className="flex items-center">
            <IoIosSpeedometer />
            <p className="text-[1rem] ml-[0.5rem] text-white">Repertorio</p>
          </div>

          <div>
            <IoIosArrowBack />
          </div>
        </button>

        <div
          className={`mt-[0.5rem] ${showRepertorynMenu ? "repertory-slide-visible" : "repertory-slide"}`}
        >
          {renderConflictsResolution({})}

          {menuOptions.repertoryMenuOptions.map(
            (element: AdminMenuOptions, index: number) =>
              renderMenuOption(element, index)
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
