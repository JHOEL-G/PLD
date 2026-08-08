import { apiPlataformaPld } from "../../../services/apiPlataformaPld";

export const serviceOperaciones = {
    getOperacionCliente: async () => (await apiPlataformaPld.get('/OperacionesCliente/Listar')).data,
    obtenerOperacionCliente: async (idOperacion) => (await apiPlataformaPld.get(`/OperacionesCliente/Obtener/${idOperacion}`)).data,
    insertOperacionCliente: async (operacion) => (await apiPlataformaPld.post('/OperacionesCliente/Agregar', operacion)).data,
    insertOperacionClienteArchivo: async (archivo) => (await apiPlataformaPld.post('/OperacionesCliente/AgregarArchivo', archivo)).data,
}