import React, { FC, ReactNode, useEffect } from "react";
import { useAppSelector } from "@/hooks/storeHooks";
import { usePathname, useRouter } from "next/navigation";
import { ROLES } from "@/types/auth.types";
import { match } from "path-to-regexp";

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard: FC<RouteGuardProps> = ({ children }) => {
  const auth = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  const allowedRoutes = {
    [ROLES.SUPER_ADMIN]: [
      "/",
      "/new-phonogram",
      "/search-phonogram",
      "/conflicts",
      "/add-employee",
      "/records",
      "/send-audio-file",
      "/territoriality",
      "/search-production-company",
      "/conflicts-history",
      "/gardel-awards",
      "/territoriality-phonogram/:id",
      "/titularity-phonogram/:id",
      "/titularity-phonogram/:id/add-titular",
      "/titularity-phonogram/:id/edit-titular",
      "/audit-changes",
      "/audit-sessions",
      "/cashflow-payouts",
      "/cashflow-payouts/list",
      "/cashflow-payouts/export",
      "/cashflow-transfers",
      "/cashflow-transfers/list",
      "/cashflow-transfers/export",
      "/cashflow-account-statement",
      "/cashflow-payments",
      "/cashflow-payments/list",
      "/cashflow-payments/export",
      "/cashflow-rejections",
      "/cashflow-rejections/list",
      "/cashflow-rejections/export",
      "/user-profile/:id",
      "/cashflow-account-statement/history",
      "/audit-phonogram",
      "/edit-phonogram/:id",
      "/edit-user/:id",
      "/edit-production-company",
      "/register-production-company",
      "/my-profile",
      "/change-password",
    ],
    [ROLES.CAPIF_ADMIN]: [
      "/",
      "/new-phonogram",
      "/search-phonogram",
      "/conflicts",
      "/add-employee",
      "/records",
      "/send-audio-file",
      "/territoriality",
      "/search-production-company",
      "/conflicts-history",
      "/gardel-awards",
      "/territoriality-phonogram/:id",
      "/audit-changes",
      "/audit-sessions",
      "/cashflow-payouts",
      "/cashflow-payouts/list",
      "/cashflow-payouts/export",
      "/cashflow-transfers",
      "/cashflow-transfers/list",
      "/cashflow-transfers/export",
      "/cashflow-account-statement",
      "/cashflow-payments",
      "/cashflow-payments/list",
      "/cashflow-payments/export",
      "/cashflow-rejections",
      "/cashflow-rejections/list",
      "/cashflow-rejections/export",
      "/user-profile/:id",
      "/cashflow-account-statement/history",
      "/audit-phonogram",
      "/edit-phonogram/:id",
      "/edit-user/:id",
      "/edit-production-company",
      "/register-production-company",
      "/my-profile",
      "/change-password",
    ],
    [ROLES.USER_PRODUCER]: [
      "/",
      "/new-phonogram",
      "/search-phonogram",
      "/conflicts",
      "/add-employee",
      "/records",
      "/territoriality-phonogram/:id",
      "/cashflow-account-statement",
      "/edit-phonogram/:id",
      "/register-production-company",
      "/my-profile",
      "/change-password",
    ],
    [ROLES.EMPLOYEE]: [
      "/",
      "/new-phonogram",
      "/search-phonogram",
      "/conflicts",
      "/records",
      "/territoriality-phonogram/:id",
      "/cashflow-account-statement",
      "/edit-phonogram/:id",
      "/register-production-company",
      "/my-profile",
      "/change-password",
    ],
  };

  const isRouteAllowed = (path: string, routes: string[]) => {
    return routes.some((route) => match(route)(path));
  };

  useEffect(() => {
    let isLoged;
    if (window && window.localStorage) {
      isLoged = localStorage.getItem("isLoged");
    }
    if (!isLoged) {
      router.push("/login");
      return;
    }
    if (auth.tipo_registro && auth.tipo_registro !== "HABILITADO") {
      router.push("/register-production-company");
      return;
    }
    if (auth.rol && !isRouteAllowed(pathname, allowedRoutes[auth.rol] || [])) {
      router.push("/records");
    }
  }, [auth.rol, pathname, router, auth]);

  if (!auth.rol || !isRouteAllowed(pathname, allowedRoutes[auth.rol] || [])) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
