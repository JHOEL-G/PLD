import { Home, AlertTriangle, Shield, FileText } from "lucide-react";

export const LISTAS_CONFIG = [
    { id: "personasPoliticamenteExpuestas", label: "Personas Políticamente Expuestas" },
    { id: "lpbNacional", label: "LPB Nacional" },
    { id: "lpbInternacionalPersonas", label: "LPB Internacional Personas" },
    { id: "lpbInternacionalEntidades", label: "LPB Internacional Entidades" },
    { id: "listaOfac", label: "Lista OFAC" },
    { id: "listaPgr", label: "Lista PGR" },
    { id: "lista69Bis", label: "Lista 69 BIS" },
    { id: "pepsExtranjeros", label: "PEPS Extranjeros" },
    { id: "pepsYEmpresasOtroRiesgo", label: "PEPS y Empresas Otro Riesgo" },
    { id: "pepsNac", label: "PEPS Nac" },
    { id: "bloqueada", label: "Bloqueada" },
    { id: "listaVenc", label: "Lista VENC" },
    { id: "listaNuevaStori", label: "Lista Nueva Stori" },
    { id: "listaPpe", label: "Lista PPE" },
    { id: "listaPepint", label: "Lista PEPINT" },
];

export const LIST_STATS = [
    {
        icon: Home,
        label: "Lista PEP",
        description: "Personas Políticamente Expuestas",
        count: 1250,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
    },
    {
        icon: AlertTriangle,
        label: "Listas Negras",
        description: "OFAC, ONU, UE, Interpol",
        count: 8420,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
    },
    {
        icon: Shield,
        label: "Listas Propias",
        description: "Registro interno de la entidad",
        count: 342,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
    },
    {
        icon: FileText,
        label: "Consultas Hoy",
        description: "Total de búsquedas realizadas",
        count: 47,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
    },
];

export const INITIAL_HISTORY = [
    {
        id: 1,
        fecha: "2024-11-24 10:30",
        nombre: "Juan Pérez García",
        listas: "PEP, Negras",
        resultado: "sin",
        usuario: "Admin",
    },
    {
        id: 2,
        fecha: "2024-11-24 09:15",
        nombre: "María González López",
        listas: "PEP, Negras, Propias",
        resultado: "pep",
        usuario: "Admin",
    },
    {
        id: 3,
        fecha: "2024-11-23 16:45",
        nombre: "Empresa XYZ SA",
        listas: "Negras, Propias",
        resultado: "sin",
        usuario: "User01",
    },
    {
        id: 4,
        fecha: "2024-11-23 14:20",
        nombre: "Carlos Ramírez",
        listas: "Todas",
        resultado: "propia",
        usuario: "Admin",
    },
];

export const EMPTY_PLD_FORM = {
    nombreCompleto: "",
    rfcCurp: "",
    fechaNacimiento: "",
    alias: "",
    fechaListado: "",
    acuerdo: "",
    nombreDocumento: "",
};

export const EMPTY_COINCIDENCE = {
    nombreConsultado: "",
    listasConsultadas: "",
    usuario: "",
    resultado: "sin",
};