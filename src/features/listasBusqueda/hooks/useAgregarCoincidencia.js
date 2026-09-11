import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceCoincidenias } from "../services/serviceCoincidenias";

export function useAgregarCoincidencia() {
    const query = useQueryClient();

    return useMutation({
        mutationFn: serviceCoincidenias.agregarCoincidencia,

        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["coincidencia"],
            })
        },

        onError: (error) => {
            console.log("Error al crear", error)
        }
    })
}