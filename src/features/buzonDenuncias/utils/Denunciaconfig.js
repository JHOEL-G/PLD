import { Clock, Loader, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export const statusConfig = {
    'Pendiente': { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
    'Investigando': { label: 'Investigando', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Loader },
    'Reportada': { label: 'Reportada', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: AlertCircle },
    'Verificada': { label: 'Verificada', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
    'Rechazada': { label: 'Rechazada', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle }
};
export const statusFallback = { label: '', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: AlertCircle };

export const prioridadConfig = {
    'Crítica': { label: 'Crítica', color: 'bg-red-700 text-white' },
    'Alta': { label: 'Alta', color: 'bg-red-600 text-white' },
    'Media': { label: 'Media', color: 'bg-orange-500 text-white' },
    'Baja': { label: 'Baja', color: 'bg-gray-500 text-white' }
};
export const prioridadFallback = { label: '', color: 'bg-gray-400 text-white' };

export function getStatusConfig(estado) {
    return statusConfig[estado] ?? { ...statusFallback, label: estado };
}

export function getPrioridadConfig(prioridad) {
    return prioridadConfig[prioridad] ?? { ...prioridadFallback, label: prioridad };
}