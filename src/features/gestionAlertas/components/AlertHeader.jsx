import { Bell } from "lucide-react";

export default function AlertHeader() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gestión de Alertas
                    </h1>
                    <p className="text-sm text-gray-500">
                        Configuración, Tipos de Alertas y Notificaciones
                    </p>
                </div>
            </div>
        </div>
    )
}
