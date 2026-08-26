import { Shield } from "lucide-react";

export default function EBRTab({ nivelRiesgo, factoresRiesgo }) {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Evaluación Basada en Riesgo (EBR)</h3>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-8 h-8 text-green-600" />
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">
                                Nivel de Riesgo: {nivelRiesgo.toUpperCase()}
                            </h4>
                            <p className="text-sm text-gray-600">
                                El cliente presenta un perfil de bajo riesgo basado en los factores evaluados.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Factores de Riesgo</h4>
                    <div className="space-y-3">
                        {factoresRiesgo.map((factor, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-700">{factor.factor}</span>
                                </div>
                                <span className="text-sm text-gray-600">{factor.nivel}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Última Evaluación</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Fecha:</span> 15/01/2024</p>
                        <p><span className="font-medium">Evaluador:</span> Admin</p>
                        <p><span className="font-medium">Próxima revisión:</span> 15/01/2025</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
