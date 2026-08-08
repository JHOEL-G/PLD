import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoPrioridades() {
    return useQuery({
        queryKey: ["prioridades"],
        queryFn: serviceCatalogosGlobales.getCatalogoPrioridades,
        staleTime: 1000 * 60 * 30,
    })
}