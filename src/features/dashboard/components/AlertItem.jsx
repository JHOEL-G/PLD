import { getPriorityColor } from "../constants/alertsData";

export default function AlertItem({ alert, onSelect }) {
    const statusBadgeClass =
        alert.status === "critical"
            ? "bg-red-600"
            : alert.status === "revision"
                ? "bg-blue-500"
                : "bg-gray-400";

    return (
        <div
            className={`flex items-center p-4 border-l-4 hover:bg-gray-50 transition-colors ${getPriorityColor(
                alert.priority
            )}`}
        >
            <div className="flex-1 flex justify-between items-start">
                <div className="space-y-1">
                    {alert.clasificacion && (
                        <div className="text-xs font-bold text-red-600 uppercase">
                            {alert.clasificacion}
                        </div>
                    )}
                    <button
                        onClick={() => onSelect(alert)}
                        className="text-sm text-blue-600 font-bold hover:underline"
                    >
                        ID: {alert.id}
                    </button>
                    <div className="text-sm text-gray-800 font-medium">
                        Cliente: {alert.cliente}
                    </div>
                    <div className="text-xs text-gray-500">
                        {alert.ubicacion || alert.operacion}
                    </div>
                </div>

                <div className="text-right space-y-1">
                    <div className="text-xs text-gray-500 uppercase">
                        {alert.tipoCuenta === "Monto" ? "Monto de Operación" : "Fecha Registro"}
                    </div>
                    <div className="font-bold text-gray-900">
                        ${alert.monto.toLocaleString()} MXN
                    </div>
                    <div className="text-xs font-medium text-gray-600">
                        {alert.dias} días activa
                    </div>
                    <div>
                        <span
                            className={`px-2 py-1 rounded text-[10px] font-bold text-white uppercase ${statusBadgeClass}`}
                        >
                            {alert.statusLabel}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
