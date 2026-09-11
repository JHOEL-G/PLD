import { apiPlataformaPld } from "../../../api/apiPlataformaPld";

export const serviceRegistroGeneral = {
    listarPld: async () => (await apiPlataformaPld.get('/RegistrosGeneral/listar-pld')),
    agregarRegistroGeneral: async (datos) => (await apiPlataformaPld.post('/RegistrosGeneral', datos)).data,
    listarRegistros: async () => (await apiPlataformaPld.get('/RegistrosGeneral')).data,
}