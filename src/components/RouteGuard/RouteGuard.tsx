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
      "/conflicts-history",
      "/users",
      "/users/add-user",
      "/users/edit-user/:id",
      "/send-audio-file",
      "/territoriality",
      "/search-production-company",
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
      "/cashflow-account-statement/history",
      "/cashflow-payments",
      "/cashflow-payments/list",
      "/cashflow-payments/export",
      "/cashflow-rejections",
      "/cashflow-rejections/list",
      "/cashflow-rejections/export",
      "/audit-phonogram",
      "/edit-phonogram/:id",
      "/edit-production-company",
      "/user-profile/:id",
      "/register-production-company",
      "/my-profile",
      "/change-password",
      "/privacy-policy",
    ],
    [ROLES.CAPIF_ADMIN]: [
      "/",
      "/new-phonogram",
      "/search-phonogram",
      "/conflicts",
      "/conflicts-history",
      "/users",
      "/users/add-user",
      "/users/edit-user/:id",
      "/send-audio-file",
      "/territoriality",
      "/search-production-company",
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
      "/cashflow-account-statement/history",
      "/cashflow-payments",
      "/cashflow-payments/list",
      "/cashflow-payments/export",
      "/cashflow-rejections",
      "/cashflow-rejections/list",
      "/cashflow-rejections/export",
      "/user-profile/:id",
      "/audit-phonogram",
      "/edit-phonogram/:id",
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
      "/users/add-user",
      "/users",
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
      "/users",
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
    if (auth.rol && !isRouteAllowed(pathname, allowedRoutes[auth.rol] || [])) {
      router.push("/users");
    }
  }, [auth.rol, pathname, router, auth]);

  if (!auth.rol || !isRouteAllowed(pathname, allowedRoutes[auth.rol] || [])) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
