import { useCatalogoPrioridades } from "../../../hooks/useCatalogoPrioridades";
import { useCatalogoTipoDenuncia } from "../../../hooks/useCatalogoTipoDenuncia";
import { useListarCatalogoEmpresa } from "../../../hooks/useListarCatalogoEmpresa";
import { useListarCatalogoMoneda } from "../../../hooks/useListarCatalogoMoneda";

export function useCatalogosGlobales() {
    const queryPrioridades = useCatalogoPrioridades();
    const queryTiposDenuncia = useCatalogoTipoDenuncia();
    const queryEmpresas = useListarCatalogoEmpresa();
    const queryMonedas = useListarCatalogoMoneda();

    const isLoading =
        queryPrioridades.isLoading ||
        queryTiposDenuncia.isLoading ||
        queryEmpresas.isLoading ||
        queryMonedas.isLoading;

    const isError =
        queryPrioridades.isError ||
        queryTiposDenuncia.isError ||
        queryEmpresas.isError ||
        queryMonedas.isError;

    return {
        prioridades: queryPrioridades.data ?? [],
        tiposDenuncia: queryTiposDenuncia.data ?? [],
        empresas: queryEmpresas.data ?? [],
        monedas: queryMonedas.data ?? [],
        isLoading,
        isError,
    };
}