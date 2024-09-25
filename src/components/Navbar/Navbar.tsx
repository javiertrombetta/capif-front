"use client";
import React, { FC, ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gitLogo from "../../assets/GIT LOGO.png";
import { IoMenuSharp } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";
import Sidebar from "../Sidebar/Sidebar";
import "../../styles/globals.css";
import "./Navbar.css";

interface NavbarProps {
  children: ReactNode;
}
const Navbar: FC<NavbarProps> = ({ children }) => {
  const pathname = usePathname();
  const noUserPathnames: string[] = ["/login", "/signup", "/forgot-password"];

  const checkForbbidenPathname = (
    forbiddenPathnames: string[],
    pathname: string
  ): boolean => {
    return forbiddenPathnames.some((element: string) => element === pathname);
  };

  return (
    <>
      {checkForbbidenPathname(noUserPathnames, pathname) ? (
        children
      ) : (
        <div className="w-[100%] border-[black] max-h-[100vh] overflow-y-hidden">
          <div className="w-[100%] h-[3.2rem] background z-20 absolute flex items-center">
            <div className="w-[15rem] flex items-center justify-center">
              <Image
                className="w-[6.3rem]"
                height={2000}
                width={2000}
                alt="GIT CAPIF"
                src={gitLogo}
              />
            </div>
            <div className="h-[100%] flex-grow flex justify-between items-center pr-[1rem]">
              <button className="w-[2rem] h-[2rem] rounded-full hover:bg-[#4d9bca] flex items-center justify-center">
                <IoMenuSharp className="w-[1.3rem] h-[1.3rem]" />
              </button>
              <div className="flex items-center gap-[0.5rem]">
                <PiUserCircleFill
                  className="h-[1.8rem] w-[1.8rem]"
                  color="white"
                />
                <p className="text-white">admin@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="w-[15rem] navbar-background fixed h-[100vh] z-10 pt-[3rem]">
            <Sidebar />
          </div>
          <div className="flex h-[100%] pl-[15rem] pt-[3.2rem] overflow-y-hidden">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
