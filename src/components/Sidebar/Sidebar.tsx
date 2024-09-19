import React, { FC, ReactNode, useState } from "react";
import { IoIosSpeedometer, IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { MenuOptions } from "@/types/types";
import menuOptions from "@/utils/menuOptions";
import { usePathname } from "next/navigation";
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

  const renderMenuOption = (element: MenuOptions, key: number): ReactNode => {
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
          className={`mt-[0.5rem] ${showAdminMenu ? "slide-visible" : "slide"}`}
        >
          {menuOptions.adminMenuOptions.map(
            (element: MenuOptions, index: number) =>
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
          className={`mt-[0.5rem] ${showRepertorynMenu ? "slide-visible" : "slide"}`}
        >
          {menuOptions.repertoryMenuOptions.map(
            (element: MenuOptions, index: number) =>
              renderMenuOption(element, index)
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
