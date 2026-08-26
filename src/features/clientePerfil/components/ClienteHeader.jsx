import { User, Download, Edit, CheckCircle2 } from 'lucide-react';

export default function ClienteHeader({ cliente, onExportar, onEditar }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Perfil del Cliente</h1>
                        <p className="text-sm text-gray-500">Información Completa, Expediente, Transacciones y EBR</p>
                    </div>
                </div>
                <button
                    onClick={onExportar}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                    <Download size={18} />
                    Exportar Perfil
                </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {cliente.avatar}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{cliente.nombre}</h2>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-600">ID: {cliente.id}</span>
                            <span className="text-sm text-gray-600">RFC: {cliente.rfc}</span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                <CheckCircle2 size={12} />
                                Riesgo: {cliente.riesgo}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                <CheckCircle2 size={12} />
                                Activo
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onEditar}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 hover:border-purple-600 hover:text-purple-600 font-medium rounded-lg transition-all"
                >
                    <Edit size={16} />
                    Editar
                </button>
            </div>
        </div>
    )
}
