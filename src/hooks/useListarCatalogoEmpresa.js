import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useListarCatalogoEmpresa() {
    return useQuery({
        queryKey: ["empresa"],
        queryFn: serviceCatalogosGlobales.getCatalogoEmpresa,
        staleTime: 1000 * 60 * 30,
    })
}