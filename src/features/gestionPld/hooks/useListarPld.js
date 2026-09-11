import { useQuery } from "@tanstack/react-query";
import { serviceRegistroGeneral } from "../services/serviceRegistroGeneral";

export function useListarPld() {
    return useQuery({
        queryKey: ["lista-pld"],
        queryFn: serviceRegistroGeneral.listarPld,
        staleTime: 1000 * 60 * 30,
    })
}