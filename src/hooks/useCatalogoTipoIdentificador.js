import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoTipoIdentificador() {
    return useQuery({
        queryKey: ["tipoIdentificador"],
        queryFn: serviceCatalogosGlobales.getCatalogoTipoIdentificador,
        staleTime: 1000 * 60 * 30,
    });
}