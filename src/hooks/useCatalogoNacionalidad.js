import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoNacionalidad() {
    return useQuery({
        queryKey: ["nacionalidad"],
        queryFn: serviceCatalogosGlobales.getCatalogoNacionalidad,
        staleTime: 1000 * 60 * 30,
    });
}