import { useQuery } from "@tanstack/react-query";
import { serviceCatalogoReporte } from "../services/serviceCatalogoReporte";

export function useListarCatalogoReporteUno(catalogo) {
    return useQuery({
        queryKey: ["catalogo", catalogo],
        queryFn: () => serviceCatalogoReporte.listarCatalogoReporteUno(catalogo),
        enabled: !!catalogo,
        staleTime: 1000 * 60 * 30,
    })
}