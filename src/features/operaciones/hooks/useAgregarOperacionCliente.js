import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceOperaciones } from "../services/serviceOperaciones";

export function useAgregarOperacionCliente() {
    const query = useQueryClient();

    return useMutation({
        mutationFn: serviceOperaciones.insertOperacionCliente,

        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["operacion"],
            })
        }
    })
}