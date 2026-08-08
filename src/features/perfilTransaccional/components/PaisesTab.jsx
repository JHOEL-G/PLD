import { MapPin } from "lucide-react";

export default function PaisesTab({ data }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex-1 mr-4">
                    <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-red-700 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-red-900">Países de Alto Riesgo</h3>
                            <p className="text-sm text-red-700">
                                Operaciones realizadas con países o jurisdicciones consideradas de alto riesgo por
                                organismos internacionales (GAFI, OFAC).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {data.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">{item.pais}</h3>
                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-600 text-white">
                                        Nivel {item.nivel}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <span className="text-sm text-gray-500">Operaciones</span>
                                        <div className="text-2xl font-bold text-gray-900">{item.operaciones}</div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Monto Total</span>
                                        <div className="text-2xl font-bold text-gray-900">{item.montoTotal}</div>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-700">Clientes Involucrados:</span>
                                    <ul className="mt-2 space-y-1">
                                        {item.clientes.map((cliente, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                                {cliente}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
