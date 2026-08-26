import { useQuery } from "@tanstack/react-query";
import { serviceCatalogosGlobales } from "../services/serviceCatalogosGlobales";

export function useCatalogoTipoPersona() {
    return useQuery({
        queryKey: ["tipoPersona"],
        queryFn: serviceCatalogosGlobales.getCatalogoTipoPersona,
        staleTime: 1000 * 60 * 30,
    });
}