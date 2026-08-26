import { FileText } from "lucide-react";

export default function ExpedientesTab({ expedientes }) {
    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Expedientes Digitales</h4>
                        <p className="text-sm text-blue-800">Seguimiento del estado de expedientes de clientes, documentación requerida y fechas de vencimiento.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Expediente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documentos</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actualización</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimiento</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {expedientes.map((exp) => {
                                const today = new Date();
                                const expirationDate = new Date(exp.expiration);
                                const isExpired = expirationDate < today && exp.status !== 'Incompleto';
                                const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
                                const isExpiringSoon = daysUntilExpiration <= 30 && daysUntilExpiration > 0;

                                return (
                                    <tr key={exp.id} className={`hover:bg-gray-50 transition-colors ${isExpired ? 'bg-red-50' : ''}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exp.client}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exp.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exp.docs}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exp.lastUpdate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex flex-col">
                                                <span
                                                    className={`${isExpired ? 'text-red-600 font-semibold' : isExpiringSoon ? 'text-orange-600 font-semibold' : 'text-gray-600'
                                                        }`}
                                                >
                                                    {exp.expiration}
                                                </span>
                                                {isExpiringSoon && !isExpired && (
                                                    <span className="text-xs text-orange-600 mt-1">Vence en {daysUntilExpiration} días</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isExpired
                                                    ? 'bg-red-100 text-red-800'
                                                    : exp.status === 'Completo'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {isExpired ? 'Vencido' : exp.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Leyenda de Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completo</span>
                        <span className="text-xs text-gray-600">Expediente vigente</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Incompleto</span>
                        <span className="text-xs text-gray-600">Falta documentación</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Vencido</span>
                        <span className="text-xs text-gray-600">Requiere actualización</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-orange-600 font-semibold">⚠</span>
                        <span className="text-xs text-gray-600">Vence en menos de 30 días</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
