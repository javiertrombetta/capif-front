import React, { FC, ReactNode, useEffect } from "react";
import { useAppSelector } from "@/hooks/storeHooks";
import { usePathname, useRouter } from "next/navigation";
import { ROLES } from "@/types/auth.types";

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard: FC<RouteGuardProps> = ({ children }) => {
  const { rol } = useAppSelector((state) => state.user);
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
      "/territoriality-phonogram",
      "/titularity-phonogram",
      "/audit-changes",
      "/audit-sessions",
      "/cashflow-payouts",
      "/cashflow-payouts/list",
      "/cashflow-transfers",
      "/cashflow-transfers/list",
      "/cashflow-account-statement",
      "/cashflow-payments",
      "/cashflow-payments/list",
      "/cashflow-rejections",
      "/cashflow-rejections/list",
      "/user-profile",
      "/cashflow-account-statement/history",
      "/audit-phonogram",
      "/edit-phonogram",
      "/edit-user",
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
      "/territoriality-phonogram",
      "/audit-changes",
      "/audit-sessions",
      "/cashflow-payouts",
      "/cashflow-payouts/list",
      "/cashflow-transfers",
      "/cashflow-transfers/list",
      "/cashflow-account-statement",
      "/cashflow-payments",
      "/cashflow-payments/list",
      "/cashflow-rejections",
      "/cashflow-rejections/list",
      "/user-profile",
      "/cashflow-account-statement/history",
      "/audit-phonogram",
      "/edit-phonogram",
      "/edit-user",
    ],
    [ROLES.USER_PRODUCER]: [
      "/",
      "/new-phonogram",
      "/search-phonogram",
      "/conflicts",
      "/add-employee",
      "/records",
      "/territoriality-phonogram",
      "/cashflow-account-statement",
      "/edit-phonogram",
    ],
    [ROLES.EMPLOYEE]: [
      "/",
      "/new-phonogram",
      "/search-phonogram",
      "/conflicts",
      "/records",
      "/territoriality-phonogram",
      "/cashflow-account-statement",
      "/edit-phonogram",
    ],
  };

  useEffect(() => {
    if (rol && !allowedRoutes[rol]?.includes(pathname)) {
      router.push("/records");
    }
  }, [rol, pathname, router]);

  if (!rol || !allowedRoutes[rol]?.includes(pathname)) {
    return null;
  }
  return <>{children}</>;
};

export default RouteGuard;
