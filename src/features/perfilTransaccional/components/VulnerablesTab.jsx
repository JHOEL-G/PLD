import { Eye } from "lucide-react";
import { AlertTriangle } from "lucide-react";

export default function VulnerablesTab({ data, onAnalizar }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex-1 mr-4">
                    <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-purple-700 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-purple-900">Actividades Vulnerables</h3>
                            <p className="text-sm text-purple-700">
                                Operaciones realizadas en sectores considerados como actividades vulnerables según la
                                normativa vigente (joyas, vehículos, inmuebles, etc.).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {data.map(item => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                <div
                                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.riesgo === 'Alto' ? 'bg-red-100' : 'bg-yellow-100'
                                        }`}
                                >
                                    <AlertTriangle
                                        className={`w-6 h-6 ${item.riesgo === 'Alto' ? 'text-red-600' : 'text-yellow-600'
                                            }`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-sm font-medium text-gray-500">{item.id}</span>
                                        <span
                                            className={`px-2 py-0.5 rounded text-xs font-medium ${item.riesgo === 'Alto'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            Riesgo {item.riesgo}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.titulo}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{item.empresa}</p>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Monto Total:</span>
                                            <div className="font-semibold text-gray-900">{item.montoTotal}</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Operaciones:</span>
                                            <div className="font-semibold text-gray-900">{item.operaciones}</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Última Fecha:</span>
                                            <div className="font-semibold text-gray-900">{item.fechaReciente}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => onAnalizar && onAnalizar(item)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                            >
                                <Eye className="w-4 h-4" />
                                <span>Analizar</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
