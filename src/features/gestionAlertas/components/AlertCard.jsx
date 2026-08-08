import { AlertTriangle, Edit3, Eye, CheckCircle, XCircle } from "lucide-react";

function getStatusIcon(status) {
    switch (status) {
        case "Verificado":
            return <CheckCircle className="w-4 h-4" />;
        case "Bloqueado":
            return <XCircle className="w-4 h-4" />;
        default:
            return null;
    }
}

export default function AlertCard() {
    return (
        <div
            className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 ${alert.borderColor}`}
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-50 rounded-lg p-3">
                            <AlertTriangle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-600">
                                    {alert.id}
                                </span>
                                <span
                                    className={`${alert.priorityColor} text-white text-xs font-bold px-2 py-1 rounded`}
                                >
                                    {alert.priority}
                                </span>
                                <span
                                    className={`${alert.statusColor} text-xs font-medium px-2 py-1 rounded flex items-center gap-1`}
                                >
                                    {getStatusIcon(alert.status)}
                                    {alert.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">
                                {alert.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {alert.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onChangeStatus(alert)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <Edit3 className="w-4 h-4" />
                            Cambiar Status
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Ver Detalle
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Cliente:</p>
                        <p className="text-sm font-medium text-gray-900">
                            {alert.cliente}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">ID:</p>
                        <p className="text-sm font-medium text-gray-900">
                            {alert.clienteId}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Monto:</p>
                        <p className="text-sm font-semibold text-gray-900">
                            {alert.monto}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Fecha:</p>
                        <p className="text-sm font-medium text-gray-900">
                            {alert.fecha}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
