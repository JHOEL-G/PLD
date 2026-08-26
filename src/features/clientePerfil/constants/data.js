export const clienteData = {
    nombre: "Juan Pérez García",
    id: "C001",
    rfc: "PEGJ850101ABC",
    riesgo: "Bajo",
    activo: true,
    avatar: "JP",
    tipoPersona: "Persona Física",
    fechaAlta: "2024-01-15",
    actividadEconomica: "Servicios Profesionales",
    nivelRiesgo: "Bajo",
};

export const documentosInicial = [
    { id: 1, nombre: "Identificación Oficial", archivo: "INE_JuanPerez.pdf", fecha: "2024-01-15", estado: "Vigente" },
    { id: 2, nombre: "Comprobante Domicilio", archivo: "CFE_Octubre2024.pdf", fecha: "2024-10-15", estado: "Vigente" },
    { id: 3, nombre: "RFC", archivo: "ConstanciaRFC.pdf", fecha: "2024-01-15", estado: "Vigente" },
];

export const transaccionesInicial = [
    { id: "T001", tipo: "Compraventa Inmueble", monto: 2500000, fecha: "2024-11-20", estatus: "Completada" },
    { id: "T002", tipo: "Compra Vehículo", monto: 450000, fecha: "2024-10-15", estatus: "Completada" },
    { id: "T003", tipo: "Servicio Profesional", monto: 85000, fecha: "2024-09-10", estatus: "Completada" },
];

export const factoresRiesgo = [
    { factor: "Actividad económica", nivel: "Bajo" },
    { factor: "Volumen transaccional", nivel: "Bajo" },
    { factor: "Origen de recursos", nivel: "Verificado" },
];