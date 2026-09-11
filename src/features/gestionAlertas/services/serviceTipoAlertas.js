import { apiPlataformaPld } from "../../../api/apiPlataformaPld";

export const serviceTipoAlertas = {
    listarTipoAlertas: async () => (await apiPlataformaPld.get("/TipoAlertas")).data,
    configuracionAlertas: async (datos) => (await apiPlataformaPld.post('/TipoAlertas/configuracion', datos)).data,
}