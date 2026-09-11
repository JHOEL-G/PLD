import { apiPlataformaPld } from "../../../api/apiPlataformaPld";

export const serviceCoincidenias = {
    listarCoincidencia: async () => (await apiPlataformaPld.get("/Coincidencias")),
    agregarCoincidencia: async (datos) => (await apiPlataformaPld.post("/Coincidencias", datos)).data,
    obtenerCoincidencia: async (idCoincidencia) => (await apiPlataformaPld.get(`/Coincidencias/${idCoincidencia}`)).data,
}