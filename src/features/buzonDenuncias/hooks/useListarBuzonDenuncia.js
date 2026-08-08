import { useQuery } from "@tanstack/react-query";
import { serviceBuzonDenuncia } from "../services/serviceBuzonDenuncia";

export function useListarBuzonDenuncia() {
    return useQuery({
        queryKey: ["denuncias"],
        queryFn: serviceBuzonDenuncia.getListar,
        staleTime: 1000 * 60 * 30,
    })
}