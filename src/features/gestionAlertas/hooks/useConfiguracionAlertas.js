import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceTipoAlertas } from "../services/serviceTipoAlertas";

export function useConfiguracionAlertas() {
    const query = useQueryClient();

    return useMutation({
        mutationFn: serviceTipoAlertas.configuracionAlertas,

        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["alertas"],
            })
        },

        onError: (error) => {
            console.log("error", error)
        }
    })
}