import { Settings } from "lucide-react";
import { alertTypesConfig } from "../constants/mockData";
import AlertTypeToggle from "./AlertTypeToggle";

export default function AlertTiposConfig({ onGuardar }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Configuración de Tipos de Alertas
                </h3>
                <p className="text-sm text-gray-600">
                    Configure qué tipos de alertas deben generarse automáticamente
                </p>
            </div>

            <div className="space-y-4">
                {alertTypesConfig.map((tipo) => (
                    <AlertTypeToggle
                        key={tipo.id}
                        title={tipo.title}
                        description={tipo.description}
                    />
                ))}
            </div>

            <div className="mt-8 flex justify-start">
                <button
                    onClick={onGuardar}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                    <Settings className="w-4 h-4" />
                    Guardar Configuración
                </button>
            </div>
        </div>
    )
}
