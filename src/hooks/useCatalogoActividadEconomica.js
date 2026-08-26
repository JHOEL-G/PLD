import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoActividadEconomica() {
    return useQuery({
        queryKey: ["actividadEconomica"],
        queryFn: serviceCatalogosGlobales.getCatalogoActividadEconomica,
        staleTime: 1000 * 60 * 30,
    });
}