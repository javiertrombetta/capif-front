import React, { FC, ReactNode, useEffect } from "react";
import { useAppSelector } from "@/hooks/storeHooks";
import { usePathname, useRouter } from "next/navigation";
import { match } from "path-to-regexp";
interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard: FC<RouteGuardProps> = ({ children }) => {
  const auth = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  const mapVistasToUrls: Record<string, string[]> = {
    "Buscar Repertorio": ["/repertoires", "/repertoires/:id"],
    "Declaración Repertorio": ["/repertoires/new"],
    "Declaración Bulk Repertorio": ["/repertoires/bulk"],
    "Envío Archivo Audio": ["/repertoires/send-audio-file"],
    Territorialidad: [
      "/repertoires/territoriality",
      "/repertoires/:id/territoriality",
    ],
    Titularidad: [
      "/repertoires/titularity",
      "/repertoires/:id/titularity",
      "/repertoires/:id/titularity/add-titular",
      "/repertoires/:id/titularity/:idtitularity",
    ],
    Conflictos: [
      "/repertoires/conflicts",
      "/repertoires/conflicts/:id/history",
    ],
    "Buscar Usuario": ["/users"],
    "Alta Usuario": ["/users/new", "/users/:id", "/users/:id/application"], // Probablemente crear vista "Editar Usuario"
    "Buscar Productora": [
      "/producers",
      "/producers/:id",
      "/producers/register", // Crear vista nueva "Crear Productora"
    ],
    "Premios Gardel": ["/gardel-awards"],
    Sesiones: ["/audit-sessions"],
    "Cambios de Repertorios": ["/audit-phonogram"],
    "Historial de Cambios": ["/audit-changes"],
    Liquidacioens: [
      "/cashflow-payouts",
      "/cashflow-payouts/list",
      "/cashflow-payouts/export",
    ],
    Pagos: [
      "/cashflow-payments",
      "/cashflow-payments/list",
      "/cashflow-payments/export",
    ],
    Traspasos: [
      "/cashflow-transfers",
      "/cashflow-transfers/list",
      "/cashflow-transfers/export",
    ],
    Rechazos: [
      "/cashflow-rejections",
      "/cashflow-rejections/list",
      "/cashflow-rejections/export",
    ],
    "Estado de Cuenta": [
      "/cashflow-account-statement",
      "/cashflow-account-statement/history",
    ],
  };

  const allowedViews = auth.vistas
    .map((v) => mapVistasToUrls[v.nombre])
    .flat()
    .concat(["/my-profile", "/change-password", "/privacy-policy"]);

  const isRouteAllowed = (path: string) => {
    return allowedViews.some((r) => match(r)(path));
  };

  useEffect(() => {
    if (auth.rol && !isRouteAllowed(pathname)) {
      router.push("/repertoires");
    }
  }, [auth.rol, pathname, router, auth]);

  if (!auth.rol || !isRouteAllowed(pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
