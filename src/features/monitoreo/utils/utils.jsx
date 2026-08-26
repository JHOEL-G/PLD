import { XCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";

export const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
        case 'pendiente':
            return 'bg-yellow-100 text-yellow-800';
        case 'en revisión':
            return 'bg-blue-100 text-blue-800';
        case 'resuelta':
            return 'bg-green-100 text-green-800';
        case 'verificado':
            return 'bg-blue-100 text-blue-800';
        case 'bloqueado':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
        case 'verificado':
            return <CheckCircle className="w-3 h-3 inline mr-1" />;
        case 'bloqueado':
            return <XCircle className="w-3 h-3 inline mr-1" />;
        default:
            return null;
    }
};

export const checkExpedienteStatus = (expiration, currentStatus) => {
    const today = new Date();
    const expirationDate = new Date(expiration);

    if (expirationDate < today && currentStatus === 'Completo') {
        return 'Vencido';
    }
    return currentStatus;
};