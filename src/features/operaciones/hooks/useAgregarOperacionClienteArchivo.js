import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceOperaciones } from "../services/serviceOperaciones";

export function useAgregarOperacionClienteArchivo() {
    const query = useQueryClient();

    return useMutation({
        mutationFn: serviceOperaciones.insertOperacionClienteArchivo,

        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["operacion"]
            })
        }
    })
}