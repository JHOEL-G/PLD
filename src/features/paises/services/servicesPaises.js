import { apiPlataformaPld } from "../../../api/apiPlataformaPld";

export const servicesPaises = {
    listarPaises: async () => (await apiPlataformaPld.get('/GestionPaises/listar-paises')).data,
    agregarPaises: async (datos) => (await apiPlataformaPld.post('/GestionPaises/agregar-paises', datos)).data,
}