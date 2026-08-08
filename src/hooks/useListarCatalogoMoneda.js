import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useListarCatalogoMoneda() {
    return useQuery({
        queryKey: ["moneda"],
        queryFn: serviceCatalogosGlobales.getCatalogoMoneda,
        staleTime: 1000 * 60 * 30,
    })
}