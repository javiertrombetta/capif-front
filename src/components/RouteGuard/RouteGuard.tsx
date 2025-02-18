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
      "/repertoires",
      "/new-phonogram",
      "/edit-phonogram/:id",
      "/titularity-phonogram/:id",
      "/titularity-phonogram/:id/add-titular",
      "/titularity-phonogram/:id/edit-titular",
      "/send-audio-file",
      "/territoriality",
      "/territoriality-phonogram/:id",
      "/conflicts",
      "/conflicts-history/:id",
      "/users",
      "/users/:id",
      "/users/:id/application",
      "/users/add-user",
      "/producers",
      "/producers/:id",
      "/edit-production-company",
      "/producers/register",
      "/gardel-awards",
      "/audit-changes",
      "/audit-sessions",
      "/audit-phonogram",
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
      "/my-profile",
      "/change-password",
      "/privacy-policy",
    ],
    [ROLES.CAPIF_ADMIN]: [
      "/",
      "/repertoires",
      "/new-phonogram",
      "/edit-phonogram/:id",
      "/send-audio-file",
      "/conflicts",
      "/conflicts-history",
      "/territoriality",
      "/territoriality-phonogram/:id",
      "/users",
      "/users/:id",
      "/users/:id/application",
      "/users/add-user",
      "/producers",
      "/producers/:id",
      "/producers/register",
      "/edit-production-company",
      "/gardel-awards",
      "/audit-changes",
      "/audit-sessions",
      "/audit-phonogram",
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
      "/my-profile",
      "/change-password",
    ],
    [ROLES.USER_PRODUCER]: [
      "/",
      "/new-phonogram",
      "/repertoires",
      "/edit-phonogram/:id",
      "/territoriality-phonogram/:id",
      "/conflicts",
      "/users",
      "/users/add-user",
      "/cashflow-account-statement",
      "/producers/register",
      "/my-profile",
      "/change-password",
    ],
    [ROLES.EMPLOYEE]: [
      "/",
      "/new-phonogram",
      "/repertoires",
      "/edit-phonogram/:id",
      "/territoriality-phonogram/:id",
      "/conflicts",
      "/users",
      "/cashflow-account-statement",
      "/producers/register",
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
