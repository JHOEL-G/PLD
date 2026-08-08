import { Plus } from "lucide-react";
import { List } from "lucide-react";

export default function ListasTab({ data, onAgregar, onVerDetalle }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex-1 mr-4">
                    <div className="flex items-start space-x-3">
                        <List className="w-5 h-5 text-indigo-700 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-indigo-900">Coincidencias en Listas</h3>
                            <p className="text-sm text-indigo-700">
                                Clientes que han presentado coincidencias en listas PEP, listas negras internacionales
                                o listas propias de la institución.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onAgregar}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                </button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo de Lista</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Coincidencia</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha Detección</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estatus</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${item.tipo === 'PEP'
                                            ? 'bg-orange-100 text-orange-800'
                                            : item.tipo === 'OFAC'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-purple-100 text-purple-800'
                                            }`}
                                    >
                                        {item.tipo}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.nombre}</td>
                                <td className="px-4 py-3 text-sm font-bold text-gray-900">{item.coincidencia}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{item.fechaDeteccion}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.estatus === 'Verificado'
                                            ? 'bg-green-100 text-green-800'
                                            : item.estatus === 'En Revisión'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {item.estatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => onVerDetalle && onVerDetalle(item)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Ver Detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
