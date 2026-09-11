import { useQuery } from "@tanstack/react-query";
import { serviceTipoAlertas } from "../services/serviceTipoAlertas";

export function useListarTipoAlertas() {
    return useQuery({
        queryKey: ["alertas"],
        queryFn: serviceTipoAlertas.listarTipoAlertas,
        staleTime: 1000 * 60 * 30,
    })
}