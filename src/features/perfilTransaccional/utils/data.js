import { TableConfig } from 'lucide-react';
import { Shield, AlertTriangle, Activity, MapPin, List } from 'lucide-react';

export const tabs = [
    { id: 'configuracion', label: 'Configuracion', icon: TableConfig },
    { id: 'relevantes', label: 'Relevantes', icon: Shield },
    { id: 'vulnerables', label: 'Vulnerables', icon: AlertTriangle },
    { id: 'inusuales', label: 'Inusuales', icon: Activity },
    { id: 'paises', label: 'Países', icon: MapPin },
    { id: 'listas', label: 'Listas', icon: List }
];

export const relevantesInicial = [
    {
        id: 'OP-001',
        cliente: 'Juan Pérez García',
        clienteId: 'C001',
        tipo: 'Compraventa Inmueble',
        monto: '$2,500,000 MXN',
        fecha: '2024-11-24',
        criticidad: 'Alta',
        estatus: 'Reportada'
    },
    {
        id: 'OP-002',
        cliente: 'Empresa XYZ SA',
        clienteId: 'C002',
        tipo: 'Venta de Vehículo',
        monto: '$850,000 MXN',
        fecha: '2024-11-23',
        criticidad: 'Media',
        estatus: 'Pendiente'
    }
];

export const vulnerablesInicial = [
    {
        id: 'OV-001',
        titulo: 'Comercio de Joyas',
        empresa: 'Joyería del Centro SA',
        montoTotal: '$3,200,000 MXN',
        operaciones: 15,
        fechaReciente: '2024-11-24',
        riesgo: 'Alto'
    },
    {
        id: 'OV-002',
        titulo: 'Compraventa de Vehículos',
        empresa: 'AutoMéxico SA',
        montoTotal: '$5,800,000 MXN',
        operaciones: 8,
        fechaReciente: '2024-11-23',
        riesgo: 'Medio'
    },
    {
        id: 'OV-003',
        titulo: 'Servicios de Blindaje',
        empresa: 'Blindajes Pro',
        montoTotal: '$1,500,000 MXN',
        operaciones: 5,
        fechaReciente: '2024-11-22',
        riesgo: 'Alto'
    }
];

export const inusualesInicial = [
    {
        id: 'OI-001',
        titulo: 'Múltiples Depósitos',
        tipo: 'Estructuración',
        cliente: 'Carlos Ramírez',
        descripcion: '10 depósitos por $9,900 MXN c/u en 2 días',
        montoTotal: '$99,000 MXN',
        fechaDeteccion: '2024-11-24'
    },
    {
        id: 'OI-002',
        titulo: 'Cambio de Patrón',
        tipo: 'Perfil Inusual',
        cliente: 'Ana Martínez',
        descripcion: 'Incremento súbito del 400% en volumen mensual',
        montoTotal: '$2,000,000 MXN',
        fechaDeteccion: '2024-11-23'
    },
    {
        id: 'OI-003',
        titulo: 'País de Riesgo',
        tipo: 'País Alto Riesgo',
        cliente: 'Importadora ABC',
        descripcion: 'Transferencia desde Irán',
        montoTotal: '$500,000 USD',
        fechaDeteccion: '2024-11-22'
    }
];

export const paisesInicial = [
    {
        pais: 'Irán',
        nivel: 'Alto',
        operaciones: 3,
        montoTotal: '$1,500,000 USD',
        clientes: ['Importadora ABC', 'Comercial Global']
    },
    {
        pais: 'Corea del Norte',
        nivel: 'Alto',
        operaciones: 1,
        montoTotal: '$200,000 USD',
        clientes: ['Tech Solutions']
    },
    {
        pais: 'Siria',
        nivel: 'Alto',
        operaciones: 2,
        montoTotal: '$450,000 USD',
        clientes: ['Export SA', 'Trading Inc']
    }
];

export const listasInicial = [
    {
        tipo: 'PEP',
        nombre: 'María González López',
        coincidencia: '95%',
        fechaDeteccion: '2024-11-24',
        estatus: 'Verificado'
    },
    {
        tipo: 'OFAC',
        nombre: 'International Corp SA',
        coincidencia: '88%',
        fechaDeteccion: '2024-11-23',
        estatus: 'En Revisión'
    },
    {
        tipo: 'Lista Propia',
        nombre: 'José Hernández',
        coincidencia: '100%',
        fechaDeteccion: '2024-11-22',
        estatus: 'Bloqueado'
    }
];