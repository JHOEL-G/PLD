import { useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesPaises } from "../services/servicesPaises";

export function useAgregarPaises() {
    const query = useQueryClient();

    return useMutation({
        mutationFn: servicesPaises.agregarPaises,

        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["paises"]
            })
        },

        onError: (error) => {
            console.error("Error al guardar el país:", error.message || error);
        }
    })
}