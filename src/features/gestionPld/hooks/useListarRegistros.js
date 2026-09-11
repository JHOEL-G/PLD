import { useQuery } from "@tanstack/react-query";

import { serviceRegistroGeneral } from "../services/serviceRegistroGeneral";

export function useListarRegistros() {
    return useQuery({
        queryKey: ["registros-general"],
        queryFn: serviceRegistroGeneral.listarRegistros,
        staleTime: 1000 * 60 * 30,
    });
}