import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoNivelRiesgo() {
    return useQuery({
        queryKey: ["nivelRiesgo"],
        queryFn: serviceCatalogosGlobales.getCatalogoNivelRiesgo,
        staleTime: 1000 * 60 * 30,
    });
}