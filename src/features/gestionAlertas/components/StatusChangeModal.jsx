import {
    Edit3,
    X,
    Clock,
    FileSearch,
    CheckCircle,
    XCircle,
} from "lucide-react";

const STATUS_OPTIONS = [
    {
        value: "Pendiente",
        label: "Pendiente",
        sublabel: "Requiere revisión",
        icon: Clock,
        activeColor: "border-red-500 bg-red-50",
        iconColor: "text-red-600",
    },
    {
        value: "En Revisión",
        label: "En Revisión",
        sublabel: "En proceso",
        icon: FileSearch,
        activeColor: "border-yellow-500 bg-yellow-50",
        iconColor: "text-yellow-600",
    },
    {
        value: "Verificado",
        label: "Verificado",
        sublabel: "Cliente validado",
        icon: CheckCircle,
        activeColor: "border-blue-500 bg-blue-50",
        iconColor: "text-blue-600",
    },
    {
        value: "Bloqueado",
        label: "Bloqueado",
        sublabel: "Acceso suspendido",
        icon: XCircle,
        activeColor: "border-gray-500 bg-gray-50",
        iconColor: "text-gray-600",
    },
    {
        value: "Resuelta",
        label: "Resuelta",
        sublabel: "Alerta cerrada",
        icon: CheckCircle,
        activeColor: "border-green-500 bg-green-50",
        iconColor: "text-green-600",
    },
];

export default function StatusChangeModal({ alert, newStatus, statusNotes, onSelectStatus, onNotesChange, onCancel, onConfirm, }) {
    if (!alert) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Edit3 className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Cambiar Status de Alerta
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {alert.id} - {alert.cliente}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-2">
                            {alert.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{alert.description}</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-gray-500">Prioridad: </span>
                                <span
                                    className={`${alert.priorityColor} text-white text-xs font-bold px-2 py-1 rounded`}
                                >
                                    {alert.priority}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">Status Actual: </span>
                                <span
                                    className={`${alert.statusColor} text-xs font-medium px-2 py-1 rounded`}
                                >
                                    {alert.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Nuevo Status <span className="text-red-600">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {STATUS_OPTIONS.map(
                                ({ value, label, sublabel, icon: Icon, activeColor, iconColor }) => (
                                    <button
                                        key={value}
                                        onClick={() => onSelectStatus(value)}
                                        className={`p-4 border-2 rounded-lg transition-all ${newStatus === value
                                            ? activeColor
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={`w-5 h-5 ${iconColor}`} />
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">{label}</p>
                                                <p className="text-xs text-gray-500">{sublabel}</p>
                                            </div>
                                        </div>
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notas del Cambio (Opcional)
                        </label>
                        <textarea
                            value={statusNotes}
                            onChange={(e) => onNotesChange(e.target.value)}
                            placeholder="Ingrese cualquier observación relevante sobre este cambio de status..."
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    {newStatus === "Verificado" && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-blue-900 mb-1">
                                        Cliente Verificado
                                    </p>
                                    <p className="text-sm text-blue-800">
                                        Esta acción marcará al cliente como verificado y
                                        permitirá sus operaciones normalmente.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {newStatus === "Bloqueado" && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-red-900 mb-1">
                                        Cliente Bloqueado
                                    </p>
                                    <p className="text-sm text-red-800">
                                        Esta acción bloqueará las operaciones del cliente hasta
                                        nueva revisión. Se notificará al área correspondiente.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={!newStatus}
                            className={`flex-1 px-4 py-3 font-medium rounded-lg transition-colors ${newStatus
                                ? "bg-orange-600 hover:bg-orange-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Confirmar Cambio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
