import { Search } from "lucide-react";
import { Activity } from "react";

export default function InusualesTab({ data, onInvestigar }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex-1 mr-4">
                    <div className="flex items-start space-x-3">
                        <Activity className="w-5 h-5 text-orange-700 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-orange-900">Operaciones Inusuales</h3>
                            <p className="text-sm text-orange-700">
                                Operaciones que presentan patrones fuera del perfil transaccional esperado del cliente
                                o que muestran indicios de estructuración.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {data.map(item => (
                    <div key={item.id} className="bg-white rounded-lg border-l-4 border-orange-500 shadow-sm p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Activity className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-sm font-medium text-gray-500">{item.id}</span>
                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                            {item.tipo}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.titulo}</h3>
                                    <p className="text-sm text-gray-600 mb-1">Cliente: {item.cliente}</p>
                                    <div className="bg-orange-50 rounded p-3 mb-3">
                                        <p className="text-sm text-gray-700">{item.descripcion}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Monto Total:</span>
                                            <div className="font-semibold text-gray-900">{item.montoTotal}</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Fecha Detección:</span>
                                            <div className="font-semibold text-gray-900">{item.fechaDeteccion}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => onInvestigar && onInvestigar(item)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2 ml-4"
                            >
                                <Search className="w-4 h-4" />
                                <span>Investigar</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
