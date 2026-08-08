import { useQuery } from "@tanstack/react-query";
import { serviceBuzonDenuncia } from "../services/serviceBuzonDenuncia";

export function useObtenerBuzonDenuncia(idDenuncias) {
    return useQuery({
        queryKey: ["denuncias", idDenuncias],
        queryFn: (idDenuncias) => serviceBuzonDenuncia.getObtener(idDenuncias),
        enabled: !!idDenuncias,
        staleTime: 1000 * 60 * 30,
    })
}