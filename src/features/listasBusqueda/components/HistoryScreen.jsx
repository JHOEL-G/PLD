import { Download, Plus, Clock, CheckCircle2, AlertTriangle, Eye } from "lucide-react";
import { formatFecha } from "../../../utils/getFormant";

const ResultadoBadge = ({ nombreResultado }) => {
    const texto = (nombreResultado || "").toLowerCase();

    if (texto.includes("sin coincidencia")) {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                <CheckCircle2 size={14} />
                {nombreResultado}
            </span>
        );
    }
    if (texto.includes("pep")) {
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                <AlertTriangle size={14} />
                {nombreResultado}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
            <AlertTriangle size={14} />
            {nombreResultado}
        </span>
    );
};

export default function HistoryScreen({ onOpenCreateModal, historyData, onViewPDF, isLoading, isError }) {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Historial Completo</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Registro completo de búsquedas realizadas
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 text-purple-600 font-semibold rounded-lg hover:border-purple-600 hover:bg-gray-50 transition-all">
                            <Download size={18} />
                            Exportar
                        </button>
                        <button
                            onClick={onOpenCreateModal}
                            className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-purple-200"
                        >
                            <Plus size={18} />
                            Nueva Columna
                        </button>
                    </div>
                </div>

                {isLoading && (
                    <p className="text-sm text-gray-500 py-6 text-center">Cargando historial...</p>
                )}

                {isError && (
                    <p className="text-sm text-red-600 py-6 text-center">
                        Ocurrió un error al cargar el historial.
                    </p>
                )}

                {!isLoading && !isError && (
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha y Hora</th>
                                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre Consultado</th>
                                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Listas Consultadas</th>
                                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Resultado</th>
                                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usuario</th>
                                    <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {historyData.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                                            No hay registros en el historial.
                                        </td>
                                    </tr>
                                )}
                                {historyData.map((item) => (
                                    <tr key={item.idCoincidencia} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock size={14} className="text-gray-400" />
                                                {formatFecha(item.fechaCreacion)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="font-semibold text-gray-900">{item.nombreConsultado}</span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">{item.listasConsultadas}</span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <ResultadoBadge nombreResultado={item.nombreResultado} />
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {item.usuario}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => onViewPDF(item)}
                                                className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1"
                                            >
                                                <Eye size={14} />
                                                Ver Constancia
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
