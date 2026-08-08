import { useQuery } from "@tanstack/react-query";
import { serviceOperaciones } from "../services/serviceOperaciones";

export function useObtenerOperacionCliente(idOperacion) {
    return useQuery({
        queryKey: ["operacion", idOperacion],
        queryFn: () => serviceOperaciones.obtenerOperacionCliente(idOperacion),
        staleTime: 1000 * 60 * 30,
        enabled: !!idOperacion,
    })
}