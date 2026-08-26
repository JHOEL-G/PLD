import { AlertTriangle, Mail } from 'lucide-react';

export default function DenunciasTab({ denuncias, onAbrirBuzon, onVerDetalle }) {
    return (
        <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-red-900 mb-1">Registro de Denuncias</h4>
                            <p className="text-sm text-red-800">Denuncias internas sobre operaciones sospechosas, fraudes potenciales o actividades inusuales detectadas.</p>
                        </div>
                    </div>
                    <button
                        onClick={onAbrirBuzon}
                        className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap"
                    >
                        <Mail className="w-4 h-4" />
                        <span>Buzón Anónimo</span>
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {denuncias.map((denuncia) => (
                    <div key={denuncia.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-sm font-semibold text-gray-600">{denuncia.id}</span>
                                        <span
                                            className={`px-2 py-1 text-xs font-bold rounded ${denuncia.status === 'BAJA'
                                                ? 'bg-yellow-500 text-white'
                                                : denuncia.status === 'MEDIA'
                                                    ? 'bg-orange-500 text-white'
                                                    : denuncia.status === 'ALTA'
                                                        ? 'bg-orange-600 text-white'
                                                        : 'bg-red-600 text-white'
                                                }`}
                                        >
                                            {denuncia.status}
                                        </span>
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded ${denuncia.phase === 'Investigación'
                                                ? 'bg-orange-100 text-orange-800'
                                                : 'bg-purple-100 text-purple-800'
                                                }`}
                                        >
                                            {denuncia.phase}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{denuncia.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{denuncia.description}</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500">Cliente:</p>
                                            <p className="font-medium text-gray-900">{denuncia.client}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Fecha de Denuncia:</p>
                                            <p className="font-medium text-gray-900">{denuncia.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => onVerDetalle && onVerDetalle(denuncia)}
                                className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Ver Detalle
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
