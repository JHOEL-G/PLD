import { apiPlataformaPld } from "../api/apiPlataformaPld";

export const serviceCatalogosGlobales = {
    getCatalogoEmpresa: async () => (await apiPlataformaPld.get('/CatalogosGlobales/catalogo-empresas')).data,
    getCatalogoMoneda: async () => (await apiPlataformaPld.get('/CatalogosGlobales/catalogo-monedas')).data,
    getCatalogoPrioridades: async () => (await apiPlataformaPld.get('/CatalogosGlobales/catalogo-prioridades')).data,
    getCatalogoTipoDenuncia: async () => (await apiPlataformaPld.get('/CatalogosGlobales/catalogo-tipos-denuncia')).data,
    getCatalogoTipoPersona: async () => (await apiPlataformaPld.get("/CatalogosGlobales/catalogo-tipos-persona")),
    getCatalogoNivelRiesgo: async () => (await apiPlataformaPld.get("/CatalogosGlobales/catalogo-niveles-riesgo")),
    getCatalogoNacionalidad: async () => (await apiPlataformaPld.get("/CatalogosGlobales/catalogo-nacionalidades")),
    getCatalogoActividadEconomica: async () => (await apiPlataformaPld.get("/CatalogosGlobales/catalogo-actividades-economicas")),
    getCatalogoTipoIdentificador: async () => (await apiPlataformaPld.get("/CatalogosGlobales/catalogo-tipos-identificador")),
    getCatalogoRangoOperacionMensual: async () => (await apiPlataformaPld.get("/CatalogosGlobales/catalogo-rangos-operacion-mensual")),
    getCatalogoTipoOperacionEfectivo: async () => (await apiPlataformaPld.get("/CatalogosGlobales/catalogo-tipos-operacion-efectivo")),
}