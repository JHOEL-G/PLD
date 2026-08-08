import { useQuery } from "@tanstack/react-query";
import { serviceOperaciones } from "../services/serviceOperaciones";

export function useListarOperacionCliente() {
    return useQuery({
        queryKey: ["operacion"],
        queryFn: serviceOperaciones.getOperacionCliente,
        staleTime: 1000 * 60 * 30,
    })
}