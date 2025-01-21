"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import gitLogo from "../../assets/GIT LOGO.png";
import { PiUserCircleFill } from "react-icons/pi";
import Sidebar from "../Sidebar/Sidebar";
import { match } from "path-to-regexp";
import { FaUser, FaBuilding } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { setModal } from "@/store/modalSlice";
import { ModalNames } from "@/types/modalNames";
import { ROLES } from "@/types/auth.types";
import "../../styles/globals.css";
import "./Navbar.css";
import RouteGuard from "../RouteGuard/RouteGuard";
import { authLogout } from "@/services/auth";

interface NavbarProps {
  children: ReactNode;
}
const Navbar: FC<NavbarProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const userData = useAppSelector((state) => state.user);
  const authData = useAppSelector((state) => state.auth);
  const noUserPathnames: string[] = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
    "/verify-account/:token",
    "/confirm-account/:token",
    "/password-recovery/:token",
  ];
  const checkForbbidenPathname = (
    forbiddenPathnames: string[],
    pathname: string
  ): boolean => {
    return forbiddenPathnames.some((pattern) => {
      const isMatch = match(pattern, { decode: decodeURIComponent });
      return isMatch(pathname) !== false;
    });
  };

  const [isChangingProducingCompany, setIsChangingProducingCompany] =
    useState<boolean>(false);

  const handleIsChangingProducingCompany = () => {
    setIsChangingProducingCompany((prevState: boolean) => !prevState);
  };

  const openProductionCompanySelection = () => {
    if (window && window.localStorage) {
      const company = localStorage.getItem("company");
      const isLoged = localStorage.getItem("isLoged");

      if (!company && isLoged && authData.id_usuario) {
        dispatch(
          setModal({ type: ModalNames.CHANGE_PRODUCER, isActive: true })
        );
      }
    }
  };

  useEffect(() => {
    openProductionCompanySelection();
  }, []);
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
            {pathname === "/register-production-company" ? (
              <div className="h-[100%] flex-grow flex justify-end items-center pr-[2rem]">
                <button
                  onClick={handleIsChangingProducingCompany}
                  className="flex items-center gap-[0.5rem] cursor-pointer"
                >
                  <PiUserCircleFill
                    className="h-[1.8rem] w-[1.8rem]"
                    color="white"
                  />
                  <p className="text-white">{userData?.email}</p>
                </button>
                {isChangingProducingCompany && (
                  <NavbarMenu
                    isEnabledUser={false}
                    closeMenu={handleIsChangingProducingCompany}
                  />
                )}
              </div>
            ) : (
              <div className="h-[100%] flex-grow flex justify-end items-center pr-[2rem]">
                {userData.rol === ROLES.EMPLOYEE ||
                userData.rol === ROLES.USER_PRODUCER ? (
                  <div className="flex gap-[0.5rem] mr-[1rem]">
                    <p className="">Productora Activa:</p>

                    <p className="font-bold">{userData.activeProduction}</p>
                  </div>
                ) : null}

                {/* <button className="w-[2rem] h-[2rem] rounded-full hover:bg-[#4d9bca] flex items-center justify-center">
                <IoMenuSharp className="w-[1.3rem] h-[1.3rem]" />
              </button> */}
                <button
                  onClick={handleIsChangingProducingCompany}
                  className="flex items-center gap-[0.5rem] cursor-pointer"
                >
                  <PiUserCircleFill
                    className="h-[1.8rem] w-[1.8rem]"
                    color="white"
                  />
                  <p className="text-white">{userData.email}</p>
                </button>
                {isChangingProducingCompany && (
                  <NavbarMenu
                    isEnabledUser={true}
                    closeMenu={handleIsChangingProducingCompany}
                  />
                )}
              </div>
            )}
          </div>

          <div className="w-[15rem] navbar-background fixed h-[100vh] z-10 pt-[3rem]">
            <Sidebar />
          </div>
          <div className="flex flex-col h-[100%] pl-[15rem] pt-[3.2rem]">
            <RouteGuard>{children}</RouteGuard>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

const NavbarMenu: FC<{ closeMenu: () => void; isEnabledUser: boolean }> = ({
  closeMenu,
  isEnabledUser,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChangeProducer = () => {
    dispatch(setModal({ type: ModalNames.CHANGE_PRODUCER, isActive: true }));
    closeMenu();
  };

  const handleChangeUser = () => {
    dispatch(setModal({ type: ModalNames.CHANGE_USER, isActive: true }));
    closeMenu();
  };

  const handleGoToProfile = () => {
    router.push("/my-profile");
  };

  const handleLogout = async () => {
    try {
      await authLogout();
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("isLoged");
      localStorage.removeItem("company");
      router.push("/login");
    }
  };

  return (
    <div className="pt-[0.6rem] pb-[0.6rem] absolute w-[15rem] h-[auto] bg-[#0F172A] right-[1%] top-[100%] rounded-b-[0.5rem] flex flex-col gap-[0.2rem] overflow-hidden">
      {isEnabledUser && (
        <>
          <div
            onClick={handleGoToProfile}
            className="w-[100%] hover:bg-[#29395e] pl-[0.4rem] cursor-pointer flex items-center gap-[0.4rem]"
          >
            <FaUser size={13} />
            <p>Mi Perfil</p>
          </div>
          <div
            onClick={handleChangeProducer}
            className="w-[100%] hover:bg-[#29395e] pl-[0.4rem] cursor-pointer flex items-center gap-[0.4rem]"
          >
            <FaBuilding size={13} />
            <p>Cambiar de Productora </p>
          </div>
          <div
            onClick={handleChangeUser}
            className="w-[100%] hover:bg-[#29395e] pl-[0.4rem] cursor-pointer flex items-center gap-[0.4rem]"
          >
            <FaUser size={13} />
            <p>Cambiar de Usuario</p>
          </div>
        </>
      )}
      <div
        onClick={handleLogout}
        className="w-[100%] hover:bg-[#29395e] pl-[0.4rem] cursor-pointer flex items-center gap-[0.4rem]"
      >
        <CiLogout size={15} />
        <p>Cerrar Sesión</p>
      </div>
    </div>
  );
};
