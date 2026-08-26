import { apiPlataformaPld } from "../api/apiPlataformaPld";

export const serviceCatalogoReporte = {
    listarCatalogoReporteUno: async (catalogo) => (await apiPlataformaPld.get(`/CatalogosReporte/ListarCatalogosReporteUno`, { params: { catalogo } })).data,
}