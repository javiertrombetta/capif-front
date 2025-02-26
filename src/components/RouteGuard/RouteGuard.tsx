import React, { FC, ReactNode, useEffect } from "react";
import { useAppSelector } from "@/hooks/storeHooks";
import { usePathname, useRouter } from "next/navigation";
import { match } from "path-to-regexp";
import { toast } from "react-toastify";
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
    "Ver Titularidad": ["/repertoires/:id/titularity"],
    "Crear Titularidad": ["/repertoires/:id/titularity/add-titular"],
    "Editar Titularidad": ["/repertoires/:id/titularity/:idtitularity"],
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
    "Premios Gardel": ["/producers/gardel-awards"],
    Liquidaciones: ["/cashflow/settlements"],
    "Estado de Cuenta": ["/cashflow", "/cashflow/transactions"],
    Sesiones: ["/audits/sessions"],
    "Cambios en Repertorios": ["/audits/repertoire"],
    "Historial de Cambios": ["/audits"],
  };

  const allowedViews = auth.vistas
    .map((v) => mapVistasToUrls[v.nombre])
    .filter(Boolean)
    .flat()
    .concat(["/my-profile", "/change-password", "/privacy-policy"]);

  const isRouteAllowed = (path: string) => {
    return allowedViews.some((r) => match(r)(path));
  };

  useEffect(() => {
    if (auth.rol && !isRouteAllowed(pathname)) {
      toast.error("No tienes permisos para acceder a esta vista");
      router.push("/repertoires");
    }
  }, [auth.rol, pathname, router, auth]);

  if (!auth.rol || !isRouteAllowed(pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
