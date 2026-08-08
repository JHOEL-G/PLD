import { apiPlataformaPld } from "./apiPlataformaPld";

export const serviceCatalogosGlobales = {
    getCatalogoEmpresa: async () => (await apiPlataformaPld.get('/CatalogosGlobales/catalogo-empresas')).data,
    getCatalogoMoneda: async () => (await apiPlataformaPld.get('/CatalogosGlobales/catalogo-monedas')).data,
    getCatalogoPrioridades: async () => (await apiPlataformaPld.get('/CatalogosGlobales/catalogo-prioridades')).data,
    getCatalogoTipoDenuncia: async () => (await apiPlataformaPld.get('/CatalogosGlobales/catalogo-tipos-denuncia')).data,
}