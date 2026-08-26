import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoRangoOperacionMensual() {
    return useQuery({
        queryKey: ["rangoOperacionMensual"],
        queryFn: serviceCatalogosGlobales.getCatalogoRangoOperacionMensual,
        staleTime: 1000 * 60 * 30,
    });
}