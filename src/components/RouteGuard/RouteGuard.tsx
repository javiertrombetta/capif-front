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
      "/repertoires/:id",
      "/repertoires/:id/titularity",
      "/repertoires/:id/titularity/add-titular",
      "/repertoires/:id/titularity/edit-titular",
      "/send-audio-file",
      "/territoriality",
      "/repertoires/:id/territoriality",
      "/conflicts",
      "/conflicts-history",
      "/users",
      "/users/:id",
      "/users/:id/application",
      "/users/new",
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
      "/repertoires/:id",
      "/send-audio-file",
      "/conflicts",
      "/conflicts-history",
      "/territoriality",
      "/repertoires/:id/territoriality",
      "/users",
      "/users/:id",
      "/users/:id/application",
      "/users/new",
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
      "/repertoires",
      "/repertoires/:id",
      "/repertoires/:id/territoriality",
      "/conflicts",
      "/users",
      "/users/new",
      "/cashflow-account-statement",
      "/producers/register",
      "/my-profile",
      "/change-password",
    ],
    [ROLES.EMPLOYEE]: [
      "/",
      "/repertoires",
      "/repertoires/:id",
      "/repertoires/:id/territoriality",
      "/conflicts",
      "/users",
      "/cashflow-account-statement",
      "/producers/register",
      "/my-profile",
      "/change-password",
    ],
  };

  const allowedViews = [
    auth.vistas.find((v) => v.nombre === "Declaración Repertorio") &&
      "/repertoires/new",
  ];

  const isRouteAllowed = (path: string, routes: string[]) => {
    return (
      routes.some((route) => match(route)(path)) || allowedViews.includes(path)
    );
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
