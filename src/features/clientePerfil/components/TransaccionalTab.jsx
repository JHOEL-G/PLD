import { Plus, CheckCircle2 } from 'lucide-react';

export default function TransaccionalTab({ transacciones, onAgregarTransaccion }) {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Historial Transaccional</h3>

                <div className="flex justify-end">
                    <button
                        onClick={onAgregarTransaccion}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 whitespace-nowrap mb-7"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                    </button>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID Transacción</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo de Operación</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monto</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estatus</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {transacciones.map((trans) => (
                                <tr key={trans.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-gray-900">{trans.id}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{trans.tipo}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-gray-900">${trans.monto.toLocaleString()}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{trans.fecha}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                            <CheckCircle2 size={14} />
                                            {trans.estatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
