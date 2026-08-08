import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoTipoDenuncia() {
    return useQuery({
        queryKey: ["denuncia"],
        queryFn: serviceCatalogosGlobales.getCatalogoTipoDenuncia,
        staleTime: 1000 * 60 * 30,
    })
}