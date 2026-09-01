export const LISTAS_CONFIG = [
    { id: 'personasPoliticamenteExpuestas', label: 'Personas Políticamente Expuestas' },
    { id: 'lpbNacional', label: 'LPB Nacional' },
    { id: 'lpbInternacionalPersonas', label: 'LPB Internacional Personas' },
    { id: 'lpbInternacionalEntidades', label: 'LPB Internacional Entidades' },
    { id: 'listaOfac', label: 'Lista OFAC' },
    { id: 'listaPgr', label: 'Lista PGR' },
    { id: 'lista69Bis', label: 'Lista 69 BIS' },
    { id: 'pepsExtranjeros', label: 'PEPS Extranjeros' },
    { id: 'pepsYEmpresasOtroRiesgo', label: 'PEPS y Empresas Otro Riesgo' },
    { id: 'pepsNac', label: 'PEPS Nac' },
    { id: 'bloqueada', label: 'Bloqueada' },
    { id: 'listaVenc', label: 'Lista VENC' },
    { id: 'listaNuevaStori', label: 'Lista Nueva Stori' },
    { id: 'listaPpe', label: 'Lista PPE' },
    { id: 'listaPepint', label: 'Lista PEPINT' },
];

export const NAV_ITEMS = [
    { id: 'registro', label: 'Registro PLD' },
    { id: 'listas', label: 'Listas PLD' },
];

export const INITIAL_FORM_DATA = {
    nombreCompleto: '',
    rfcCurp: '',
    fechaNacimiento: '',
    alias: '',
    fechaListado: '',
    acuerdo: '',
    nombreDocumento: '',
};