import { CheckCircle2, Download, FileText, Clock } from "lucide-react";

export default function NoResultsScreen({ historyData, onViewPDF, onOpenNuevoRegistro, onImportarExcel, }) {
    const firstRecord = historyData[0];

    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border-l-4 border-green-500">
                <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="text-green-600" size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sin Coincidencias</h3>
                    <p className="text-gray-600 mb-4">
                        No se encontraron coincidencias en las listas consultadas
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle2 size={16} className="text-green-600" />
                        <span className="text-sm font-medium text-green-700">
                            Cliente verificado correctamente
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Historial Reciente</h3>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 text-purple-600 font-semibold rounded-lg hover:border-purple-600 hover:bg-gray-50 transition-all">
                            <Download size={18} />
                            Exportar
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                            onClick={onOpenNuevoRegistro}
                        >
                            <FileText className="w-4 h-4" />
                            Crear Nuevo Registro
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                            onClick={onImportarExcel}
                        >
                            <FileText className="w-4 h-4" />
                            Importar Excel
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha y Hora</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre Consultado</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Listas</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Resultado</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usuario</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {firstRecord && (
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock size={14} className="text-gray-400" />
                                            {firstRecord.fecha}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="font-semibold text-gray-900">{firstRecord.nombre}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{firstRecord.listas}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                            <CheckCircle2 size={14} />
                                            Sin coincidencias
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {firstRecord.usuario}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => onViewPDF(firstRecord)}
                                            className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline"
                                        >
                                            Ver Constancia
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
