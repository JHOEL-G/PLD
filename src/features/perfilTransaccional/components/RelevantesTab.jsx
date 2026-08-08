import { FileText } from "lucide-react";

export default function RelevantesTab({ data }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1 mr-4">
                    <div className="flex items-start space-x-3">
                        <FileText className="w-5 h-5 text-blue-700 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-blue-900">Operaciones Relevantes</h3>
                            <p className="text-sm text-blue-700">
                                Operaciones superiores a los umbrales establecidos que requieren reporte ante la UIF
                                conforme a las disposiciones aplicables.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID Operación</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cliente</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo de Operación</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Monto</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Criticidad</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.id}</td>
                                <td className="px-4 py-3">
                                    <div className="text-sm font-medium text-gray-900">{item.cliente}</div>
                                    <div className="text-xs text-gray-500">{item.clienteId}</div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{item.tipo}</td>
                                <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.monto}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{item.fecha}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.criticidad === 'Alta'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {item.criticidad}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.estatus === 'Reportada'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-orange-100 text-orange-800'
                                            }`}
                                    >
                                        {item.estatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
