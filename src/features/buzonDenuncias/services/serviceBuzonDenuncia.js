import { apiPlataformaPld } from "../../../api/apiPlataformaPld";

export const serviceBuzonDenuncia = {
    getObtener: async (idDenuncias) => (await apiPlataformaPld.get(`/BuzonDenuncia/Obtener/${idDenuncias}`)).data,
    getListar: async () => (await apiPlataformaPld.get('/BuzonDenuncia/Listar')).data,
    insertAgregar: async (buzonDenuncia) => (await apiPlataformaPld.post('/BuzonDenuncia/Agregar', buzonDenuncia)).data,
    insertAgregarArchivo: async (archivoBuzon) => (await apiPlataformaPld.post('/BuzonDenuncia/AgregarArchivo', archivoBuzon)).data,
}