import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceBuzonDenuncia } from "../services/serviceBuzonDenuncia";

export function useAgregarBuzonDenunciaArchivo() {
    const query = useQueryClient();

    return useMutation({
        mutationFn: serviceBuzonDenuncia.insertAgregarArchivo,

        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["denuncias"]
            })
        },

        onError: (error) => {
            console.log("Error al crear el archivo", error)
        }
    })
}