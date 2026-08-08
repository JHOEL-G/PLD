export const alerts = [
    {
        id: "PLD-2025-00123",
        jud: "JU+ 2025-00783",
        cliente: "Juan Pérez López 9787",
        ubicacion: "Umbrict Transaccional",
        monto: 580000,
        tipoCuenta: "Monto",
        fecha: "24/11/2025",
        dias: 4,
        status: "critical",
        statusLabel: "CRÍTICA",
        priority: "red",
    },
    {
        id: "PLD-2025-00124",
        cliente: "Juan Pérez López 9787",
        ubicacion: "Umbrict Transaccional",
        monto: 1200000,
        tipoCuenta: "Monto",
        fecha: "24/11/2025",
        dias: 5,
        status: "revision",
        statusLabel: "En Revisión",
        priority: "orange",
    },
    {
        id: "PLD-2025-00125",
        jud: "JU+ 2025-45678",
        cliente: "EMPRESA X S.A.",
        clasificacion: "B. ALTA",
        monto: 250000,
        tipoCuenta: "Fecha Creación",
        fecha: "23/11/2025",
        dias: 5,
        status: "pending",
        statusLabel: "Pendiente",
        priority: "orange",
    },
    {
        id: "PLD-2025-00126",
        cliente: "EMPRESA Coincidida Listas Negras",
        operacion: "Operación en Efectivo",
        monto: 95000,
        tipoCuenta: "Fecha Creación",
        fecha: "23/11/2025",
        dias: 3,
        status: "revision",
        statusLabel: "En Revisión",
        priority: "yellow",
    },
    {
        id: "PLD-2025-00127",
        clasificacion: "CRÍTICA",
        cliente: "Carlos Ruiz Alto Riesgo",
        monto: 350000,
        tipoCuenta: "Fecha Creación",
        fecha: "20/11/2025",
        dias: 8,
        status: "escalated",
        statusLabel: "Escalada a Reporte",
        priority: "red",
    },
];

export const getPriorityColor = (priority) => {
    switch (priority) {
        case "red":
            return "border-l-red-500";
        case "orange":
            return "border-l-orange-500";
        case "yellow":
            return "border-l-yellow-500";
        default:
            return "border-l-gray-300";
    }
};