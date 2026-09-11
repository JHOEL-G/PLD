import { useMutation, useQueryClient } from "@tanstack/react-query";

import { serviceRegistroGeneral } from "../services/serviceRegistroGeneral";

export function useAgregarRegistroGeneral() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: serviceRegistroGeneral.agregarRegistroGeneral,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["registros-general"],
            });
        },
    });
}