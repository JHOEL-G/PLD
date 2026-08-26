import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoTipoOperacionEfectivo() {
    return useQuery({
        queryKey: ["tipoOperacionEfectivo"],
        queryFn: serviceCatalogosGlobales.getCatalogoTipoOperacionEfectivo,
        staleTime: 1000 * 60 * 30,
    });
}