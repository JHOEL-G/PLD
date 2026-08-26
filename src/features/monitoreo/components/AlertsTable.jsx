import { Edit3 } from 'lucide-react';
import { getStatusBadgeClass, getStatusIcon } from '../utils/utils';

export default function AlertsTable({ alerts, onCambiarStatus, onVer }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equivalente MXN</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {alerts.map((alert) => (
                            <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.client}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{alert.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.equivalent}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(alert.status)}`}>
                                        {getStatusIcon(alert.status)}
                                        {alert.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onCambiarStatus(alert)}
                                            className="text-orange-600 hover:text-orange-800 font-medium flex items-center space-x-1"
                                        >
                                            <Edit3 className="w-3 h-3" />
                                            <span>Cambiar</span>
                                        </button>
                                        <span className="text-gray-300">|</span>
                                        <button onClick={() => onVer && onVer(alert)} className="text-blue-600 hover:text-blue-800 font-medium">
                                            Ver
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
