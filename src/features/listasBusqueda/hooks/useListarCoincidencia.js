import { useQuery } from "@tanstack/react-query";
import { serviceCoincidenias } from "../services/serviceCoincidenias";

export function useListarCoincidencia() {
    return useQuery({
        queryKey: ["coincidencia"],
        queryFn: serviceCoincidenias.listarCoincidencia,
        staleTime: 1000 * 60 * 30,
    })
}