import { useQuery } from "@tanstack/react-query";
import { servicesPaises } from "../services/servicesPaises";

export function useListarPaises() {
    return useQuery({
        queryKey: ["paises"],
        queryFn: servicesPaises.listarPaises,
        staleTime: 1000 * 60 * 30,
    })
}