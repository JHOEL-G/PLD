import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceBuzonDenuncia } from "../services/serviceBuzonDenuncia";

export function useAgregarBuzonDenuncia() {
    const query = useQueryClient();

    return useMutation({
        mutationFn: serviceBuzonDenuncia.insertAgregar,

        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["denuncias"] })
        },

        onError: (error) => {
            console.log("Error al crear buzon", error)
        }
    })
}